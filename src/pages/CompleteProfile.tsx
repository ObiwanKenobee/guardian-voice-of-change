
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import OrganizationFields from "@/components/auth/OrganizationFields";
import { toast } from "sonner";
import { getRoleDashboardPath } from "@/utils/roleBasedRouting";

const CompleteProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    email: string;
    fullName: string;
    role: string;
    industry: string;
    organization: string;
  }>({
    email: "",
    fullName: "",
    role: "",
    industry: "",
    organization: "",
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          setError("You must be logged in to complete your profile");
          navigate('/sign-in', { replace: true });
          return;
        }
        
        // Set the basic user info we have
        setUserInfo(prev => ({
          ...prev,
          email: session.user.email || "",
          fullName: session.user.user_metadata?.full_name || "",
        }));
        
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to load user data");
      }
    };
    
    fetchUserData();
  }, [navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!userInfo.role || !userInfo.industry || !userInfo.organization) {
        throw new Error("Please complete all required fields");
      }
      
      // Update the user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: userInfo.fullName,
          role: userInfo.role,
          industry: userInfo.industry,
          organization: userInfo.organization
        }
      });
      
      if (updateError) throw updateError;
      
      // Get the appropriate dashboard path
      const dashboardPath = getRoleDashboardPath(userInfo.role, userInfo.industry);
      
      toast.success("Profile completed successfully!", {
        description: "Redirecting to your personalized dashboard...",
      });
      
      // Redirect to the appropriate dashboard
      navigate(dashboardPath, { 
        replace: true,
        state: { showOnboarding: true }
      });
      
    } catch (err: any) {
      console.error("Error completing profile:", err);
      setError(err.message || "Failed to update your profile");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x p-4">
      <Link 
        to="/" 
        className="fixed top-4 left-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>
            Please provide some additional information to tailor your experience
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Signed in as:</p>
              <p className="text-sm text-muted-foreground">{userInfo.email}</p>
              <p className="text-sm text-muted-foreground">{userInfo.fullName}</p>
            </div>
            
            <OrganizationFields
              organization={userInfo.organization}
              industry={userInfo.industry}
              role={userInfo.role}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing Profile...
                </>
              ) : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
