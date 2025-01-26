import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, Menu, X, Globe, LineChart, Users } from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopNav } from "./navigation/DesktopNav";
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
    <div className={`border-b sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-background/80 backdrop-blur-lg' : 'bg-background'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-base sm:text-lg font-bold gradient-text">Guardian-IO</span>
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
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>150+ Countries</span>
              </div>
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground">
                <LineChart className="h-4 w-4" />
                <span>Real-time Analytics</span>
              </div>
              <div className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>500+ Partners</span>
              </div>
            </>
          )}

          {isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground transition-colors text-sm sm:text-base"
                onClick={() => navigate('/workspace')}
              >
                Go to Workspace
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 transition-colors text-sm sm:text-base"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground transition-colors hidden sm:inline-flex text-sm sm:text-base"
                onClick={() => navigate('/partner')}
              >
                Partner With Us
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 transition-colors text-sm sm:text-base"
                onClick={() => navigate('/sign-in')}
              >
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </Button>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
        />
      </div>
    </div>
  );
};