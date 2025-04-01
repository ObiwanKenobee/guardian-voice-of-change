
import { createClient } from '@supabase/supabase-js';

// Define the Supabase project URL and anon key
// For local development, these would come from .env file
// For production, they would be set in the hosting environment
const supabaseUrl = 'https://jklewwlnrlzomkaetjjo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbGV3d2xucmx6b21rYWV0ampvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTIxNDEsImV4cCI6MjA1MTk4ODE0MX0.8VjOmAuOnX3L6qYBWm5sUSxxu2jA-V-79g60LeFs5dE';

// Validate that we have the required values
if (!supabaseUrl) {
  throw new Error('Supabase URL is required');
}

if (!supabaseAnonKey) {
  throw new Error('Supabase Anon Key is required');
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
