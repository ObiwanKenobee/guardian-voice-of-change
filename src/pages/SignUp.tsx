import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/workspace');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            organization: formData.companyName,
            role: formData.role
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Guardian IO. Let's get started with your journey.",
        });
        navigate('/workspace');
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold gradient-text">
              Welcome to Guardian IO: Transforming Supply Chains for a Better World
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join our movement to revolutionize global supply chains. With Guardian IO, you'll gain the tools, insights, and partnerships to create meaningful impact.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="companyName">Organization Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your organization name"
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                  disabled={loading}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supply-chain">Supply Chain Manager</SelectItem>
                    <SelectItem value="esg">ESG Officer</SelectItem>
                    <SelectItem value="csr">CSR Leader</SelectItem>
                    <SelectItem value="sustainability">Sustainability Lead</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full text-lg h-12" disabled={loading}>
              {loading ? "Creating Account..." : "Join the Movement 🚀"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-primary hover:text-primary/90">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;