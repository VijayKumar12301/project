import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseService= process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseFile = createClient(supabaseUrl, supabaseService);