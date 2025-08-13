
// supabase-client.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://qdyuvqyyndbtbmdztvvi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXV2cXl5bmRidGJtZHp0dnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTY3OTYsImV4cCI6MjA3MDU3Mjc5Nn0.wl_mKYDP9rciloh2BruvNx9ZOsncQe9OnNNFpXAdAlM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/*
Run once (Supabase SQL Editor) to create tables:

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  block text not null,
  name text not null,
  ranges jsonb not null default '[]'::jsonb,
  capacity int,
  active boolean default true,
  unique(block, name)
);
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references rooms(id) on delete cascade,
  "from" date not null,
  "to"   date not null,
  guest_name text,
  guest_phone text,
  created_at timestamptz default now()
);
create table if not exists blackouts (
  block text primary key,
  ranges jsonb not null default '[]'::jsonb
);
*/

async function fetchRooms() {
  const { data, error } = await supabase
    .from('rooms')
    .select('id, block, name, ranges')
    .order('block', { ascending: true })
    .order('name', { ascending: true });
  if (error) throw error;
  return (data || []).map(r => ({ id: r.id, block: r.block, name: r.name, ranges: r.ranges || [] }));
}

async function upsertRooms(rooms) {
  const payload = rooms.map(r => ({
    id: r.id || undefined,
    block: r.block,
    name: r.name,
    ranges: r.ranges || []
  }));
  const { error } = await supabase.from('rooms').upsert(payload).select();
  if (error) throw error;
}

async function deleteRoomById(id) {
  const { error } = await supabase.from('rooms').delete().eq('id', id);
  if (error) throw error;
}

async function fetchBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, room_id, from, to, guest_name, guest_phone, rooms(id, block, name)')
    .order('from', { ascending: true });
  if (error) throw error;
  return (data || []).map(b => ({
    id: b.id,
    from: b.from,
    to: b.to,
    roomId: b.room_id,
    block: b.rooms?.block || '',
    roomName: b.rooms?.name || '',
    guestName: b.guest_name || '',
    guestPhone: b.guest_phone || ''
  }));
}

async function insertBooking(entry) {
  const { error } = await supabase.from('bookings').insert({
    room_id: entry.roomId,
    from: entry.from,
    to: entry.to,
    guest_name: entry.guestName || null,
    guest_phone: entry.guestPhone || null
  });
  if (error) throw error;
}

async function deleteBooking(id) {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) throw error;
}

async function fetchBlackouts() {
  const { data, error } = await supabase.from('blackouts').select('block, ranges');
  if (error) throw error;
  const out = {};
  (data || []).forEach(r => { out[r.block] = r.ranges || []; });
  return out;
}

async function saveBlackouts(map) {
  const rows = Object.entries(map).map(([block, ranges]) => ({ block, ranges: ranges || [] }));
  if (!rows.length) return;
  const { error } = await supabase.from('blackouts').upsert(rows);
  if (error) throw error;
}

async function clearAll(){
  // Danger: deletes everything
  await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('rooms').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('blackouts').delete().neq('block', '__none__');
}

export const db = {
  fetchRooms,
  upsertRooms,
  deleteRoomById,
  fetchBookings,
  insertBooking,
  deleteBooking,
  fetchBlackouts,
  saveBlackouts,
  clearAll
};

// Expose for non-module scripts
window.db = db;
