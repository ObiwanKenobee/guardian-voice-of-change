import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SupplyChainNode {
  name: string;
  location_type: string;
  latitude: number;
  longitude: number;
  status?: string;
  metadata?: Record<string, any>;
}

interface SupplyChainRoute {
  origin_id: string;
  destination_id: string;
  route_type: string;
  status?: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Get auth user
    const authHeader = req.headers.get('Authorization')!;
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // Handle different endpoints
    switch (true) {
      // Nodes CRUD operations
      case req.method === 'GET' && path === 'nodes': {
        const { data, error } = await supabaseClient
          .from('supply_chain_nodes')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case req.method === 'POST' && path === 'nodes': {
        const body: SupplyChainNode = await req.json();
        const { data, error } = await supabaseClient
          .from('supply_chain_nodes')
          .insert({
            ...body,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case req.method === 'PUT' && path?.startsWith('nodes/'): {
        const nodeId = path.split('/')[1];
        const body: Partial<SupplyChainNode> = await req.json();
        const { data, error } = await supabaseClient
          .from('supply_chain_nodes')
          .update(body)
          .eq('id', nodeId)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case req.method === 'DELETE' && path?.startsWith('nodes/'): {
        const nodeId = path.split('/')[1];
        const { error } = await supabaseClient
          .from('supply_chain_nodes')
          .delete()
          .eq('id', nodeId)
          .eq('user_id', user.id);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Routes CRUD operations
      case req.method === 'GET' && path === 'routes': {
        const { data, error } = await supabaseClient
          .from('supply_chain_routes')
          .select(`
            *,
            origin:supply_chain_nodes!origin_id(*),
            destination:supply_chain_nodes!destination_id(*)
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case req.method === 'POST' && path === 'routes': {
        const body: SupplyChainRoute = await req.json();
        const { data, error } = await supabaseClient
          .from('supply_chain_routes')
          .insert({
            ...body,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case req.method === 'PUT' && path?.startsWith('routes/'): {
        const routeId = path.split('/')[1];
        const body: Partial<SupplyChainRoute> = await req.json();
        const { data, error } = await supabaseClient
          .from('supply_chain_routes')
          .update(body)
          .eq('id', routeId)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case req.method === 'DELETE' && path?.startsWith('routes/'): {
        const routeId = path.split('/')[1];
        const { error } = await supabaseClient
          .from('supply_chain_routes')
          .delete()
          .eq('id', routeId)
          .eq('user_id', user.id);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Not Found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});