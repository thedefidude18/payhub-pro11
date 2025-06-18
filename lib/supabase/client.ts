import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://cydauexhnnllspakewba.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5ZGF1ZXhobm5sbHNwYWtld2JhIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NTAwODAyOTYsImV4cCI6MjA2NTY1NjI5Nn0.7xnyTVQs0m_yZocCp5pV_k6mh1j3pfqs0Fe58_h1ao0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
