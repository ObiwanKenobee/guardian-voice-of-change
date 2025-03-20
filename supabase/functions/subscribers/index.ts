
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Subscriber type
interface Subscriber {
  id?: string;
  email: string;
  created_at?: string;
  metadata?: Record<string, any>;
  status?: "active" | "unsubscribed" | "bounced";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request URL and parse it
    const url = new URL(req.url);
    const subscriberId = url.searchParams.get("id");

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Authenticate the request if it's not a GET request to list all subscribers
    // or a POST to create a new subscriber (which we'll leave open for the public signup form)
    if (!(req.method === 'GET' && !subscriberId) && req.method !== 'POST') {
      const authHeader = req.headers.get('Authorization')!;
      if (!authHeader) {
        throw new Error('Missing Authorization header');
      }
      
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
      
      if (userError || !user) {
        throw new Error('Unauthorized');
      }
    }

    // Handle various HTTP methods
    switch (req.method) {
      case 'GET': {
        // Get a single subscriber or list all
        if (subscriberId) {
          const { data, error } = await supabaseClient
            .from('subscribers')
            .select('*')
            .eq('id', subscriberId)
            .single();

          if (error) throw error;
          return new Response(JSON.stringify({ data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        } else {
          // List all subscribers (paginated)
          const page = parseInt(url.searchParams.get("page") || "1");
          const pageSize = parseInt(url.searchParams.get("pageSize") || "50");
          const offset = (page - 1) * pageSize;
          
          const { data, error, count } = await supabaseClient
            .from('subscribers')
            .select('*', { count: 'exact' })
            .range(offset, offset + pageSize - 1);

          if (error) throw error;
          return new Response(JSON.stringify({ data, count }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        }
      }
      
      case 'POST': {
        // Create a new subscriber
        const body: Subscriber = await req.json();
        
        // Basic validation
        if (!body.email) {
          return new Response(JSON.stringify({ error: 'Email is required' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          });
        }
        
        // Check if subscriber already exists
        const { data: existingSubscriber } = await supabaseClient
          .from('subscribers')
          .select('id, email')
          .eq('email', body.email)
          .maybeSingle();
          
        if (existingSubscriber) {
          return new Response(JSON.stringify({ 
            message: 'You are already subscribed',
            data: existingSubscriber 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        }
        
        // Insert new subscriber
        const { data, error } = await supabaseClient
          .from('subscribers')
          .insert({
            email: body.email,
            metadata: body.metadata || {},
            status: 'active'
          })
          .select()
          .single();

        if (error) throw error;
        
        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 201,
        });
      }
      
      case 'PUT': {
        // Update an existing subscriber
        if (!subscriberId) {
          return new Response(JSON.stringify({ error: 'Subscriber ID is required' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          });
        }
        
        const body: Partial<Subscriber> = await req.json();
        const { data, error } = await supabaseClient
          .from('subscribers')
          .update(body)
          .eq('id', subscriberId)
          .select()
          .single();

        if (error) throw error;
        
        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }
      
      case 'DELETE': {
        // Delete a subscriber
        if (!subscriberId) {
          return new Response(JSON.stringify({ error: 'Subscriber ID is required' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          });
        }
        
        const { error } = await supabaseClient
          .from('subscribers')
          .delete()
          .eq('id', subscriberId);

        if (error) throw error;
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }
      
      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 405,
        });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: error.message === 'Unauthorized' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
