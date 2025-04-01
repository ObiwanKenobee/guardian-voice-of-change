
import { createClient } from '@supabase/supabase-js';

// Get the environment variables or use fallback defaults
// We need to ensure these are not empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the URL and key are defined before creating the client
if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is not defined in your environment variables');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is not defined in your environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    // Force secure WebSocket connections
    headers: {
      'X-Client-Info': 'guardian-io'
    }
  }
});

// Add the missing auth functions
export const signUpUser = async (
  email: string, 
  password: string, 
  metadata: Record<string, any> = {}
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
  
  if (error) throw error;
  return data;
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) throw error;
  return data;
};
