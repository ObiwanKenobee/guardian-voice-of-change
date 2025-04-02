
import { supabase } from "@/integrations/supabase/client";

export interface TrendingContent {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  category: string;
  likes: number;
  views: number;
  comments: number;
  trending: boolean;
  author_id?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ContentInteraction {
  interaction_type: 'like' | 'save' | 'share' | 'view';
}

const CONTENT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trending-content`;

export const contentService = {
  // Get all trending content
  getAllContent: async (): Promise<TrendingContent[]> => {
    const response = await fetch(CONTENT_URL);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch content');
    }

    const { data } = await response.json();
    return data;
  },

  // Get only trending items
  getTrendingContent: async (): Promise<TrendingContent[]> => {
    const response = await fetch(`${CONTENT_URL}/trending`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch trending content');
    }

    const { data } = await response.json();
    return data;
  },

  // Get a specific content item with user interactions
  getContentById: async (id: string): Promise<{
    content: TrendingContent;
    interactions: ContentInteraction[];
  }> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    
    if (session) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    
    const response = await fetch(`${CONTENT_URL}/${id}`, { headers });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch content');
    }

    const { data, interactions } = await response.json();
    return { content: data, interactions };
  },

  // Record an interaction (like, save, share)
  recordInteraction: async (
    contentId: string, 
    interactionType: 'like' | 'save' | 'share'
  ): Promise<{ action: 'added' | 'removed' }> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Authentication required');

    const response = await fetch(`${CONTENT_URL}/interaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        content_id: contentId,
        interaction_type: interactionType
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to record ${interactionType}`);
    }

    const { action } = await response.json();
    return { action };
  },

  // Create new content (for authenticated users)
  createContent: async (content: Omit<TrendingContent, 'id' | 'likes' | 'views' | 'comments' | 'trending' | 'author_id' | 'published_at' | 'created_at' | 'updated_at'>): Promise<TrendingContent> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Authentication required');

    const response = await fetch(CONTENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(content)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create content');
    }

    const { data } = await response.json();
    return data;
  }
};
