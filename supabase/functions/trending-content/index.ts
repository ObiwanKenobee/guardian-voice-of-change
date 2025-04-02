
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

    // Verify authentication for protected routes
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (!error) {
        user_id = user?.id
      }
    }

    // GET /trending-content - Get all trending content
    if (method === 'GET' && !path) {
      const { data, error } = await supabase
        .from('trending_content')
        .select('*')
        .order('published_at', { ascending: false })

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // GET /trending-content/:id - Get a specific content
    if (method === 'GET' && path && path !== 'trending' && path !== 'interaction') {
      const { data: content, error } = await supabase
        .from('trending_content')
        .select('*')
        .eq('id', path)
        .single()

      if (error) throw error

      // If user is authenticated, check if they have interacted with this content
      let interactions = null
      if (user_id) {
        const { data: userInteractions, error: interactionError } = await supabase
          .from('user_content_interactions')
          .select('interaction_type')
          .eq('user_id', user_id)
          .eq('content_id', path)

        if (!interactionError) {
          interactions = userInteractions
        }
      }

      // Record a view
      if (user_id) {
        // Check if user already viewed this content
        const { data: existingView } = await supabase
          .from('user_content_interactions')
          .select('*')
          .eq('user_id', user_id)
          .eq('content_id', path)
          .eq('interaction_type', 'view')
          .single()

        // If not viewed yet, record the view
        if (!existingView) {
          await supabase
            .from('user_content_interactions')
            .insert([{
              user_id,
              content_id: path,
              interaction_type: 'view'
            }])
        }
      }

      return new Response(JSON.stringify({ 
        data: content, 
        interactions: interactions || [] 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // GET /trending-content/trending - Get trending content only
    if (method === 'GET' && path === 'trending') {
      const { data, error } = await supabase
        .from('trending_content')
        .select('*')
        .eq('trending', true)
        .order('published_at', { ascending: false })

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // POST /trending-content - Create new content
    if (method === 'POST' && !path) {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { title, description, image_url, category } = await req.json()
      
      if (!title || !category) {
        return new Response(JSON.stringify({ error: 'Title and category are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { data, error } = await supabase
        .from('trending_content')
        .insert([{ 
          title, 
          description, 
          image_url, 
          category,
          author_id: user_id
        }])
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // POST /trending-content/interaction - Record user interaction (like, save, share)
    if (method === 'POST' && path === 'interaction') {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { content_id, interaction_type } = await req.json()
      
      if (!content_id || !interaction_type) {
        return new Response(JSON.stringify({ error: 'Content ID and interaction type are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Check if interaction already exists
      const { data: existingInteraction, error: checkError } = await supabase
        .from('user_content_interactions')
        .select('*')
        .eq('user_id', user_id)
        .eq('content_id', content_id)
        .eq('interaction_type', interaction_type)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      // If interaction exists, remove it (toggle behavior for likes/saves)
      if (existingInteraction) {
        const { error: deleteError } = await supabase
          .from('user_content_interactions')
          .delete()
          .eq('id', existingInteraction.id)

        if (deleteError) throw deleteError

        return new Response(JSON.stringify({ 
          message: `${interaction_type} removed`,
          action: 'removed'
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      } else {
        // Create new interaction
        const { data, error } = await supabase
          .from('user_content_interactions')
          .insert([{
            user_id,
            content_id,
            interaction_type
          }])
          .select()
          .single()

        if (error) throw error

        return new Response(JSON.stringify({ 
          data,
          message: `${interaction_type} recorded`,
          action: 'added'
        }), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

    // PUT /trending-content/:id - Update content
    if (method === 'PUT' && path) {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const updates = await req.json()
      
      // Ensure user owns this content
      const { data: content, error: contentError } = await supabase
        .from('trending_content')
        .select('*')
        .eq('id', path)
        .eq('author_id', user_id)
        .single()

      if (contentError) {
        return new Response(JSON.stringify({ error: 'Content not found or you do not have permission' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const { data, error } = await supabase
        .from('trending_content')
        .update(updates)
        .eq('id', path)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // DELETE /trending-content/:id - Delete content
    if (method === 'DELETE' && path) {
      if (!user_id) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Ensure user owns this content
      const { data: content, error: contentError } = await supabase
        .from('trending_content')
        .select('*')
        .eq('id', path)
        .eq('author_id', user_id)
        .single()

      if (contentError) {
        return new Response(JSON.stringify({ error: 'Content not found or you do not have permission' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Delete related interactions first
      await supabase
        .from('user_content_interactions')
        .delete()
        .eq('content_id', path)

      // Delete the content
      const { error } = await supabase
        .from('trending_content')
        .delete()
        .eq('id', path)

      if (error) throw error

      return new Response(JSON.stringify({ message: 'Content deleted successfully' }), {
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
