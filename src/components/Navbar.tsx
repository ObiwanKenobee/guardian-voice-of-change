
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  LogIn, 
  Menu, 
  X, 
  Globe, 
  LineChart, 
  Users, 
  Leaf, 
  Sparkles,
  Lightbulb
} from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import DesktopNav from "./navigation/DesktopNav";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate('/');
    }
  };

  return (
    <div 
      className={`border-b sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-md' 
          : 'bg-gradient-to-r from-green-50/90 via-blue-50/90 to-background/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex h-16 sm:h-20 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse group-hover:animate-none transition-all"></div>
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/70 bg-clip-text text-transparent transition-all group-hover:from-primary/90 group-hover:to-primary">
              Guardian-IO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopNav />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4 sm:gap-6">
          {!isAuthenticated && (
            <>
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-background/50 hover:bg-background/80 transition-colors group">
                <Globe className="h-4 w-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
                <span>150+ Countries</span>
              </div>
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-background/50 hover:bg-background/80 transition-colors group">
                <LineChart className="h-4 w-4 text-green-500 group-hover:text-green-600 transition-colors" />
                <span>Real-time Analytics</span>
              </div>
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-background/50 hover:bg-background/80 transition-colors group">
                <Users className="h-4 w-4 text-purple-500 group-hover:text-purple-600 transition-colors" />
                <span>500+ Partners</span>
              </div>
            </>
          )}

          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground transition-colors text-sm sm:text-base shadow-sm hover:shadow"
                onClick={() => navigate('/workspace')}
              >
                Go to Workspace
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 transition-colors text-sm sm:text-base shadow-sm hover:shadow"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors hidden sm:inline-flex text-sm sm:text-base shadow-sm hover:shadow relative overflow-hidden group"
                onClick={() => navigate('/partner')}
              >
                <Leaf className="mr-2 h-4 w-4 text-green-500 group-hover:text-primary transition-colors" />
                <span>Partner With Us</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-colors text-sm sm:text-base shadow-sm hover:shadow-md group"
                onClick={() => navigate('/sign-in')}
              >
                <LogIn className="mr-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /> 
                <span>Sign In</span>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
        />
      </div>
      
      {/* Header Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-green-300 via-blue-300 to-purple-300"></div>
    </div>
  );
};
