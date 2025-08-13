// supabaseClient.js — ESM module (no <script> tags here)
// Usage: <script type="module" src="./supabaseClient.js"></script>
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 🔧 Paste your Supabase URL & Anon Key
const SUPABASE_URL = "https://qdyuvqyyndbtbmdztvvi.supabase.co"; // <-- change me
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeXV2cXl5bmRidGJtZHp0dnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTY3OTYsImV4cCI6MjA3MDU3Mjc5Nn0.wl_mKYDP9rciloh2BruvNx9ZOsncQe9OnNNFpXAdAlM"; // <-- change me

// Expose a singleton client
window.sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase client initialised", { url: SUPABASE_URL });
