// supabaseClient.js — ESM module (no <script> tags here)
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 🔧 TODO: paste your Supabase URL & Anon Key
const SUPABASE_URL = "https://eqaobpwkuqkvxxelzjlv.supabase.co"; // <-- change me
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxYW9icHdrdXFrdnh4ZWx6amx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwODM3ODIsImV4cCI6MjA3MDY1OTc4Mn0.TPsbZRzErT5VNuyQzQEqP6MFue-kuWAfJwFhDKI4Udg"; // <-- change me

// Create and expose a singleton client on window
window.sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase client initialised", { url: SUPABASE_URL });
