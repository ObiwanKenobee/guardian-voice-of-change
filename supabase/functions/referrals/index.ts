
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.15'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { method, url } = req
    const urlObj = new URL(url)
    const path = urlObj.pathname.split('/').pop()
    const authHeader = req.headers.get('Authorization')
    let user_id = null

    // Verify authentication
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (error) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
      
      user_id = user?.id
    }

    // GET /referrals - Get all user's referrals
    if (method === 'GET' && !path) {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('user_id', user_id)

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // GET /referrals/:id - Get a specific referral
    if (method === 'GET' && path && path !== 'generate') {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('id', path)
        .eq('user_id', user_id)
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // POST /referrals/generate - Generate a new referral
    if (method === 'POST' && path === 'generate') {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Generate a unique referral code
      const referral_code = 'GUARDIAN-' + Math.random().toString(36).substring(2, 8).toUpperCase()
      const origin = urlObj.origin
      const referral_url = `${origin}?ref=${referral_code}`

      // Create the referral
      const { data, error } = await supabase
        .from('referrals')
        .insert([{ 
          user_id, 
          referral_code, 
          referral_url 
        }])
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // POST /referrals - Record a referral
    if (method === 'POST' && !path) {
      const { referral_code, referred_email } = await req.json()
      
      if (!referral_code) {
        return new Response(JSON.stringify({ error: 'Referral code is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Find the referral
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referral_code', referral_code)
        .single()

      if (referralError) throw referralError

      // Update the referral with the referred email (in a real app, this would be the user ID after they sign up)
      const { data, error } = await supabase
        .from('referrals')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', referral.id)
        .select()
        .single()

      if (error) throw error

      // Insert a reward for the referrer
      const { error: rewardError } = await supabase
        .from('user_rewards')
        .insert([{
          user_id: referral.user_id,
          reward_type: 'premium_features',
          description: 'Reward for successful referral'
        }])

      if (rewardError) throw rewardError

      return new Response(JSON.stringify({ data, message: 'Referral recorded successfully' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // PUT /referrals/:id - Update a referral
    if (method === 'PUT' && path) {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { status, reward_claimed } = await req.json()
      
      const { data, error } = await supabase
        .from('referrals')
        .update({ 
          status, 
          reward_claimed,
          updated_at: new Date().toISOString()
        })
        .eq('id', path)
        .eq('user_id', user_id)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // DELETE /referrals/:id - Delete a referral
    if (method === 'DELETE' && path) {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { data, error } = await supabase
        .from('referrals')
        .delete()
        .eq('id', path)
        .eq('user_id', user_id)

      if (error) throw error

      return new Response(JSON.stringify({ message: 'Referral deleted successfully' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
