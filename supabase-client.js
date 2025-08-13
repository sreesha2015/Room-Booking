
// supabase-client.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// TODO: Replace with your actual project values from Supabase → Project Settings → API
const SUPABASE_URL = 'https://qdyuvqyyndbtbmdztvvi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXV2cXl5bmRidGJtZHp0dnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTY3OTYsImV4cCI6MjA3MDU3Mjc5Nn0.wl_mKYDP9rciloh2BruvNx9ZOsncQe9OnNNFpXAdAlM';

if (SUPABASE_URL.includes('YOUR-PROJECT-REF')) {
  console.warn('⚠️ SUPABASE_URL not set. Edit supabase-client.js and paste your real URL and anon key.');
}
if (SUPABASE_ANON_KEY.includes('YOUR-ANON-KEY')) {
  console.warn('⚠️ SUPABASE_ANON_KEY not set. Edit supabase-client.js and paste your real anon key.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function listRooms() {
  // Simple query to test connectivity + table existence
  const { data, error } = await supabase
    .from('rooms')
    .select('id,name,block,capacity,active')
    .order('name');
  if (error) throw error;
  return data;
}
