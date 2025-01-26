import { motion } from "framer-motion";
import { 
  Globe, LineChart, ShieldCheck, Fingerprint,
  ArrowRight, Lock, Database, 
  MapPin as Map, ClipboardCheck, AlertTriangle,
  Users, Building2, TrendingUp, Cloud
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Preview features shown to all users
const previewFeatures = [
  {
    icon: <Globe className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Global ESG Integration",
    description: "Unite Fortune 500 supply chains with seamless ESG data integration and real-time monitoring.",
    badge: "Enterprise Ready"
  },
  {
    icon: <LineChart className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Advanced Analytics",
    description: "Uncover predictive insights and track performance using AI-powered analytics.",
    badge: "New"
  },
  {
    icon: <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Enhanced Due Diligence",
    description: "Automate multi-jurisdictional compliance verification and risk monitoring.",
    badge: "Popular"
  },
  {
    icon: <Fingerprint className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Biometric Security",
    description: "World ID technology provides state-of-the-art biometric verification.",
    badge: "Premium"
  }
];

// Full feature set only shown to authenticated users
const fullFeatures = [
  {
    icon: <Database className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Enterprise Data Integration",
    description: "Integrate seamlessly with existing enterprise systems like SAP, Oracle, or custom ERP solutions.",
  },
  {
    icon: <Map className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Supply Chain Mapping",
    description: "Visualize your supply chain with real-time tracking and blockchain verification for transparency.",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Compliance Automation",
    description: "Monitor and report compliance across multiple regulatory frameworks—all fully automated.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Risk Management",
    description: "Stay ahead with predictive analytics and early warning systems for comprehensive risk assessment.",
  },
  {
    icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Stakeholder Management",
    description: "Simplify relationships with suppliers, regulators, and stakeholders using integrated collaboration tools.",
  },
  {
    icon: <Building2 className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Corporate Governance",
    description: "Elevate board-level reporting and decision-making with strategic governance tools.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Performance Analytics",
    description: "Benchmark performance against industry standards with detailed metrics and actionable insights.",
  },
  {
    icon: <Cloud className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Cloud Infrastructure",
    description: "Enterprise-grade cloud infrastructure ensures global coverage with 99.99% uptime SLA.",
  },
];

export const Features = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthenticatedAction = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to access all features");
      navigate('/sign-in');
    } else {
      navigate('/workspace');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Enterprise Solutions</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive enterprise solutions for ESG compliance, risk management, and sustainable supply chain operations
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(isAuthenticated ? fullFeatures : previewFeatures).map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative p-6 rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {feature.badge && (
                  <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {feature.badge}
                  </span>
                )}
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group"
                  onClick={() => navigate('/platform-features')}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {!isAuthenticated && (
          <motion.div 
            className="mt-12 p-8 rounded-lg bg-card border shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-6 flex-col sm:flex-row">
              <div className="flex items-center gap-2 text-primary">
                <Lock className="h-5 w-5" />
                <span className="font-semibold">
                  Unlock {fullFeatures.length - previewFeatures.length}+ Additional Enterprise Features
                </span>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 group"
                onClick={handleAuthenticatedAction}
              >
                Sign In to Access All Features
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}

        {isAuthenticated && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 group w-full sm:w-auto"
              onClick={() => navigate('/workspace')}
            >
              Go to Workspace
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};