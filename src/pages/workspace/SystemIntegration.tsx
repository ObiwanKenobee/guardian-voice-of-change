
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationsList } from "@/components/workspace/integration/IntegrationsList";
import { NewIntegrationDialog } from "@/components/workspace/integration/NewIntegrationDialog";
import { IntegrationLogs } from "@/components/workspace/integration/IntegrationLogs";
import { AnalyticsConnections } from "@/components/workspace/analytics/AnalyticsConnections";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SystemIntegration = () => {
  const [activeTab, setActiveTab] = useState("systems");

  const { data: integrations, isLoading } = useQuery({
    queryKey: ['system-integrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_integrations')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">System Integration</h1>
        <p className="text-muted-foreground">
          Connect Guardian-IO with your existing enterprise systems and third-party services
        </p>
      </div>

      <div className="flex justify-end">
        <NewIntegrationDialog />
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="systems">Connected Systems</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Connections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="systems">
          <IntegrationsList 
            integrations={integrations || []} 
            isLoading={isLoading} 
          />
        </TabsContent>
        
        <TabsContent value="logs">
          <IntegrationLogs />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsConnections />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemIntegration;
