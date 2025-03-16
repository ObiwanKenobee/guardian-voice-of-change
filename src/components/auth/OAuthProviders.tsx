
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { getRoleDashboardPath } from "@/utils/roleBasedRouting";
import { toast } from "sonner";

interface OAuthProvidersProps {
  action: "sign-in" | "sign-up";
  setError: (error: string | null) => void;
}

export const OAuthProviders = ({ action, setError }: OAuthProvidersProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState(false);
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  const navigate = useNavigate();

  const handleOAuthLogin = async (provider: 'google' | 'azure' | 'linkedin') => {
    // Set the appropriate loading state
    if (provider === 'google') setIsGoogleLoading(true);
    if (provider === 'azure') setIsMicrosoftLoading(true);
    if (provider === 'linkedin') setIsLinkedInLoading(true);
    
    try {
      setError(null);
      
      // Get the current URL to use as redirect
      const redirectTo = `${window.location.origin}/auth/callback`;
      
      // Sign in with the selected provider
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          queryParams: {
            // Pass a parameter to indicate this is a sign-up if needed
            prompt: action === 'sign-up' ? 'select_account' : undefined
          }
        }
      });
      
      if (error) throw error;
      
      // If successful, the user will be redirected to the OAuth provider
      console.log("OAuth sign-in initiated:", data);
      
    } catch (error: any) {
      console.error(`${provider} sign-in error:`, error);
      setError(error.message || `Failed to sign in with ${provider}`);
      toast.error(`Authentication Error`, {
        description: `Failed to sign in with ${provider}: ${error.message}`,
      });
    } finally {
      // Reset loading state
      if (provider === 'google') setIsGoogleLoading(false);
      if (provider === 'azure') setIsMicrosoftLoading(false);
      if (provider === 'linkedin') setIsLinkedInLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <Button 
        variant="outline" 
        onClick={() => handleOAuthLogin('google')}
        disabled={isGoogleLoading}
        className="relative"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        {action === 'sign-up' ? 'Sign up with Google' : 'Sign in with Google'}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => handleOAuthLogin('azure')}
        disabled={isMicrosoftLoading}
        className="relative"
      >
        {isMicrosoftLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path d="M11.4 24H0V12.6h11.4V24Z" fill="#F25022"/>
            <path d="M24 24H12.6V12.6H24V24Z" fill="#00A4EF"/>
            <path d="M11.4 11.4H0V0h11.4v11.4Z" fill="#7FBA00"/>
            <path d="M24 11.4H12.6V0H24v11.4Z" fill="#FFB900"/>
          </svg>
        )}
        {action === 'sign-up' ? 'Sign up with Microsoft' : 'Sign in with Microsoft'}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => handleOAuthLogin('linkedin')}
        disabled={isLinkedInLoading}
        className="relative"
      >
        {isLinkedInLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              fill="#0077B5"
            />
          </svg>
        )}
        {action === 'sign-up' ? 'Sign up with LinkedIn' : 'Sign in with LinkedIn'}
      </Button>
    </div>
  );
};
