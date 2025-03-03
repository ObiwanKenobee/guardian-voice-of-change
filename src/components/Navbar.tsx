
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
  Lightbulb,
  BarChart2,
  MapPin,
  Zap,
  Heart
} from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import DesktopNav from "./navigation/DesktopNav";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMode, setExpandedMode] = useState(false);
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
      // Automatically collapse expanded mode when scrolling
      if (window.scrollY > 100 && expandedMode) {
        setExpandedMode(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [expandedMode]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate('/');
    }
  };

  const toggleExpandedMode = () => {
    setExpandedMode(!expandedMode);
  };

  // Fade-in animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const renderExpandedFeatures = () => {
    return (
      <motion.div 
        className={`absolute left-0 right-0 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-lg shadow-lg border-b z-10 transition-all duration-500 overflow-hidden ${expandedMode ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
        initial="hidden"
        animate={expandedMode ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto py-6 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Core Solutions</span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Supply Chain Transparency", icon: <BarChart2 className="h-4 w-4 text-blue-500" /> },
                { label: "ESG Reporting", icon: <LineChart className="h-4 w-4 text-green-500" /> },
                { label: "Compliance Management", icon: <Shield className="h-4 w-4 text-purple-500" /> },
                { label: "Impact Analytics", icon: <Zap className="h-4 w-4 text-amber-500" /> }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to="/platform-features" 
                    className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors py-1 group"
                  >
                    {item.icon}
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <span>Sustainability</span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Carbon Footprint Tracking", icon: <Globe className="h-4 w-4 text-green-500" /> },
                { label: "Biodiversity Initiatives", icon: <Heart className="h-4 w-4 text-pink-500" /> },
                { label: "Renewable Energy Programs", icon: <Zap className="h-4 w-4 text-yellow-500" /> },
                { label: "Water Conservation", icon: <Lightbulb className="h-4 w-4 text-blue-500" /> }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to="/innovations" 
                    className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors py-1 group"
                  >
                    {item.icon}
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Community</span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Partner Network", icon: <Users className="h-4 w-4 text-indigo-500" /> },
                { label: "Global Forums", icon: <Globe className="h-4 w-4 text-cyan-500" /> },
                { label: "Knowledge Hub", icon: <Lightbulb className="h-4 w-4 text-amber-500" /> },
                { label: "Impact Stories", icon: <Heart className="h-4 w-4 text-red-500" /> }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to="/partner" 
                    className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors py-1 group"
                  >
                    {item.icon}
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <span>Global Impact</span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Regional Initiatives", icon: <MapPin className="h-4 w-4 text-red-500" /> },
                { label: "Impact Metrics", icon: <BarChart2 className="h-4 w-4 text-violet-500" /> },
                { label: "Success Stories", icon: <Sparkles className="h-4 w-4 text-amber-500" /> },
                { label: "Join Our Movement", icon: <Heart className="h-4 w-4 text-rose-500" /> }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to="/resources" 
                    className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors py-1 group"
                  >
                    {item.icon}
                    <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="container mx-auto pb-6 px-4 sm:px-6">
          <motion.div 
            variants={itemVariants}
            className="flex justify-center items-center gap-4 pt-4 border-t border-border/30"
          >
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={() => {
                setExpandedMode(false);
                navigate("/platform-features");
              }}
            >
              View All Features
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={() => {
                setExpandedMode(false);
                navigate("/contact");
              }}
            >
              Contact Us
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={() => {
                setExpandedMode(false);
                navigate("/resources");
              }}
            >
              Resources
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      <div 
        className={`border-b sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl shadow-md' 
            : expandedMode 
              ? 'bg-gradient-to-r from-green-50/90 via-blue-50/90 to-background/90 backdrop-blur-sm'
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
            
            {/* Expand Toggle Button - only visible on larger screens */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={toggleExpandedMode}
            >
              <span>Explore</span>
              {expandedMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              )}
            </Button>
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

      {/* Expanded Features Menu */}
      {renderExpandedFeatures()}
    </div>
  );
};
