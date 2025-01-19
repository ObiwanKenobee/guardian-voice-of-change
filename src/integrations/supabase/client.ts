import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jklewwlnrlzomkaetjjo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbGV3d2xucmx6b21rYWV0ampvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTIxNDEsImV4cCI6MjA1MTk4ODE0MX0.8VjOmAuOnX3L6qYBWm5sUSxxu2jA-V-79g60LeFs5dE";

// Initialize the Supabase client without any trailing slashes
export const supabase = createClient<Database>(
  SUPABASE_URL.replace(/\/$/, ''),
  SUPABASE_PUBLISHABLE_KEY
);

// Auth helper functions
export const signUpUser = async (email: string, password: string, metadata: any) => {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: metadata,
      emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/sign-in` : undefined,
    },
  });
  
  if (error) throw error;
  return data;
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  
  if (error) throw error;
  return data;
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined,
  });
  
  if (error) throw error;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};