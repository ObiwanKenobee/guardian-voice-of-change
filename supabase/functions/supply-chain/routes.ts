import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { SupplyChainRoute, corsHeaders } from './types.ts';

export async function handleRoutes(req: Request, supabaseClient: ReturnType<typeof createClient>, user_id: string) {
  const url = new URL(req.url);
  const routeId = url.pathname.split('/').pop();

  switch (req.method) {
    case 'GET': {
      const { data, error } = await supabaseClient
        .from('supply_chain_routes')
        .select(`
          *,
          origin:supply_chain_nodes!origin_id(*),
          destination:supply_chain_nodes!destination_id(*)
        `)
        .eq('user_id', user_id);

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case 'POST': {
      const body: SupplyChainRoute = await req.json();
      const { data, error } = await supabaseClient
        .from('supply_chain_routes')
        .insert({
          ...body,
          user_id,
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case 'PUT': {
      if (!routeId) throw new Error('Route ID is required');
      const body: Partial<SupplyChainRoute> = await req.json();
      const { data, error } = await supabaseClient
        .from('supply_chain_routes')
        .update(body)
        .eq('id', routeId)
        .eq('user_id', user_id)
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case 'DELETE': {
      if (!routeId) throw new Error('Route ID is required');
      const { error } = await supabaseClient
        .from('supply_chain_routes')
        .delete()
        .eq('id', routeId)
        .eq('user_id', user_id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    default:
      throw new Error('Method not allowed');
  }
}