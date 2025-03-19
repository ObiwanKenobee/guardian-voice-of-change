
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WelcomeHeader } from "./dashboard/WelcomeHeader";
import { GlobalOverview } from "./dashboard/GlobalOverview";
import { QuickActions } from "./dashboard/QuickActions";
import { AIAgents } from "./dashboard/AIAgents";
import { FeatureCards } from "./dashboard/FeatureCards";
import { CallToAction } from "./dashboard/CallToAction";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface DashboardPreferences {
  widgets: string[];
  layout: any;
}

export const DashboardGrid = () => {
  const { data: preferences, isLoading } = useQuery({
    queryKey: ["dashboard-preferences"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('dashboard_preferences')
          .select('*')
          .single();
        
        return data as DashboardPreferences;
      }
      return null;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-foreground/70 animate-pulse">Loading your harmonious dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <WelcomeHeader />
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlobalOverview />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <QuickActions />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <AIAgents />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <FeatureCards />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <CallToAction />
      </motion.div>
    </div>
  );
};
