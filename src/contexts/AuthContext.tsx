
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getRoleDashboardPath } from '@/utils/roleBasedRouting';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  userRole: string | null;
  userIndustry: string | null;
  dashboardPath: string;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  userRole: null,
  userIndustry: null,
  dashboardPath: '/workspace/dashboard',
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userIndustry, setUserIndustry] = useState<string | null>(null);
  const [dashboardPath, setDashboardPath] = useState('/workspace/dashboard');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
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
    });

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
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      userRole, 
      userIndustry, 
      dashboardPath, 
      signOut 
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
