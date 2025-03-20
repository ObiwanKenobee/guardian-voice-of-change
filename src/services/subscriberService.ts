
import { supabase } from '@/integrations/supabase/client';

/**
 * Subscriber interface
 */
export interface Subscriber {
  id?: string;
  email: string;
  created_at?: string;
  metadata?: Record<string, any>;
  status?: "active" | "unsubscribed" | "bounced";
}

/**
 * Add a new subscriber to the newsletter
 */
export const addSubscriber = async (email: string, metadata: Record<string, any> = {}) => {
  try {
    const { data, error } = await supabase.functions.invoke('subscribers', {
      method: 'POST',
      body: { email, metadata }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw error;
  }
};

/**
 * Get all subscribers (admin only)
 */
export const getSubscribers = async (page: number = 1, pageSize: number = 50) => {
  try {
    const { data, error } = await supabase.functions.invoke('subscribers', {
      method: 'GET',
      body: { page, pageSize }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw error;
  }
};

/**
 * Get a single subscriber by ID (admin only)
 */
export const getSubscriber = async (id: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('subscribers', {
      method: 'GET',
      body: { id }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching subscriber:', error);
    throw error;
  }
};

/**
 * Update a subscriber (admin only)
 */
export const updateSubscriber = async (id: string, updates: Partial<Subscriber>) => {
  try {
    const { data, error } = await supabase.functions.invoke('subscribers', {
      method: 'PUT',
      body: { id, ...updates }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating subscriber:', error);
    throw error;
  }
};

/**
 * Delete a subscriber (admin only)
 */
export const deleteSubscriber = async (id: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('subscribers', {
      method: 'DELETE',
      body: { id }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    throw error;
  }
};
