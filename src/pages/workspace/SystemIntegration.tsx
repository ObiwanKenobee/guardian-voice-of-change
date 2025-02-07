import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Settings2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationsList } from "@/components/workspace/integration/IntegrationsList";
import { IntegrationLogs } from "@/components/workspace/integration/IntegrationLogs";
import { NewIntegrationDialog } from "@/components/workspace/integration/NewIntegrationDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function SystemIntegration() {
  const { toast } = useToast();

  const { data: integrations, isLoading: isLoadingIntegrations } = useQuery({
    queryKey: ['system-integrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching integrations",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Integration</h1>
          <p className="text-muted-foreground">
            Manage your enterprise system integrations and connections
          </p>
        </div>
        <NewIntegrationDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Integrations
            </CardTitle>
            <Settings2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations?.filter(i => i.status === 'active').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Systems currently connected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Integration Health
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations?.filter(i => i.status === 'error').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Systems with errors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Systems
            </CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Connected enterprise systems
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <IntegrationsList integrations={integrations || []} isLoading={isLoadingIntegrations} />
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <IntegrationLogs />
        </TabsContent>
      </Tabs>
    </div>
  );
}