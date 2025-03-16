
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getRoleDashboardPath } from '@/utils/roleBasedRouting';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  userRole: string | null;
  userIndustry: string | null;
  dashboardPath: string;
  loading: boolean;
  requiresMFA: boolean;
  updateUserMetadata: (metadata: Record<string, any>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  userRole: null,
  userIndustry: null,
  dashboardPath: '/workspace/dashboard',
  loading: true,
  requiresMFA: false,
  signOut: async () => {},
  updateUserMetadata: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userIndustry, setUserIndustry] = useState<string | null>(null);
  const [dashboardPath, setDashboardPath] = useState('/workspace/dashboard');
  const [loading, setLoading] = useState(true);
  const [requiresMFA, setRequiresMFA] = useState(false);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Get user metadata for role and industry
        if (session?.user) {
          const role = session.user.user_metadata.role || null;
          const industry = session.user.user_metadata.industry || null;
          
          setUserRole(role);
          setUserIndustry(industry);
          
          // Set dashboard path based on role and industry
          setDashboardPath(getRoleDashboardPath(role, industry));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Update role and industry when auth state changes
      if (session?.user) {
        const role = session.user.user_metadata.role || null;
        const industry = session.user.user_metadata.industry || null;
        
        setUserRole(role);
        setUserIndustry(industry);
        
        // Set dashboard path based on role and industry
        setDashboardPath(getRoleDashboardPath(role, industry));
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to update user metadata
  const updateUserMetadata = async (metadata: Record<string, any>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: metadata
      });
      
      if (error) throw error;
      
      // Update local state
      if (metadata.role) setUserRole(metadata.role);
      if (metadata.industry) setUserIndustry(metadata.industry);
      
      // Update dashboard path if role or industry changed
      if (metadata.role || metadata.industry) {
        const newRole = metadata.role || userRole;
        const newIndustry = metadata.industry || userIndustry;
        setDashboardPath(getRoleDashboardPath(newRole, newIndustry));
      }
      
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating user metadata:", error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      userRole, 
      userIndustry, 
      dashboardPath, 
      loading,
      requiresMFA,
      signOut,
      updateUserMetadata
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
