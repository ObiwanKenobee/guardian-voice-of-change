import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jklewwlnrlzomkaetjjo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbGV3d2xucmx6b21rYWV0ampvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODg0NzAsImV4cCI6MjAyMzA2NDQ3MH0.GyfnAGGtpzub1-4Gr3QZHFrYY6TGBQqQl6yJ6C_P3ZE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
});