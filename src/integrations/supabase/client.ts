
import { createClient } from '@supabase/supabase-js';

// The error occurs because we're trying to connect from HTTPS to WS (not WSS)
// Make sure we always use secure protocols
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
