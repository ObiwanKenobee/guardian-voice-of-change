
import { supabase } from "@/integrations/supabase/client";

export interface Referral {
  id: string;
  user_id: string;
  referral_code: string;
  referral_url: string;
  referred_user_id?: string;
  status: 'pending' | 'completed' | 'expired';
  reward_claimed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Reward {
  id: string;
  user_id: string;
  reward_type: 'premium_features' | 'community_access' | 'partner_status';
  description: string;
  earned_at: string;
  is_redeemed: boolean;
  redeemed_at?: string;
}

const REFERRAL_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/referrals`;

export const referralService = {
  // Generate a new referral code
  generateReferral: async (): Promise<Referral> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Authentication required');

    const response = await fetch(`${REFERRAL_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate referral');
    }

    const { data } = await response.json();
    return data;
  },

  // Get all referrals for the current user
  getUserReferrals: async (): Promise<Referral[]> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Authentication required');

    const response = await fetch(REFERRAL_URL, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch referrals');
    }

    const { data } = await response.json();
    return data;
  },

  // Submit a referral (used when someone clicks a referral link)
  submitReferral: async (referralCode: string, email: string): Promise<Referral> => {
    const response = await fetch(REFERRAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        referral_code: referralCode,
        referred_email: email
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit referral');
    }

    const { data } = await response.json();
    return data;
  },

  // Get user's rewards
  getUserRewards: async (): Promise<Reward[]> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Authentication required');

    const { data, error } = await supabase
      .from('user_rewards')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) throw error;
    return data || [];
  }
};
