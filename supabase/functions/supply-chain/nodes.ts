import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { SupplyChainNode, corsHeaders } from './types.ts';

export async function handleNodes(req: Request, supabaseClient: ReturnType<typeof createClient>, user_id: string) {
  const url = new URL(req.url);
  const nodeId = url.pathname.split('/').pop();

  switch (req.method) {
    case 'GET': {
      const { data, error } = await supabaseClient
        .from('supply_chain_nodes')
        .select('*')
        .eq('user_id', user_id);

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case 'POST': {
      const body: SupplyChainNode = await req.json();
      const { data, error } = await supabaseClient
        .from('supply_chain_nodes')
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
      if (!nodeId) throw new Error('Node ID is required');
      const body: Partial<SupplyChainNode> = await req.json();
      const { data, error } = await supabaseClient
        .from('supply_chain_nodes')
        .update(body)
        .eq('id', nodeId)
        .eq('user_id', user_id)
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    case 'DELETE': {
      if (!nodeId) throw new Error('Node ID is required');
      const { error } = await supabaseClient
        .from('supply_chain_nodes')
        .delete()
        .eq('id', nodeId)
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