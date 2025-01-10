import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WelcomeHeader } from "./dashboard/WelcomeHeader";
import { GlobalOverview } from "./dashboard/GlobalOverview";
import { QuickActions } from "./dashboard/QuickActions";
import { AIAgents } from "./dashboard/AIAgents";
import { FeatureCards } from "./dashboard/FeatureCards";
import { CallToAction } from "./dashboard/CallToAction";

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[200px] bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <WelcomeHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <GlobalOverview />
        </div>
        <QuickActions />
      </div>

      <AIAgents />
      <FeatureCards />
      <CallToAction />
    </div>
  );
};