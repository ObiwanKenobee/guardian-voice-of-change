import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  config: any;
  created_at: string;
}

interface IntegrationsListProps {
  integrations: Integration[];
  isLoading: boolean;
}

export const IntegrationsList = ({ integrations, isLoading }: IntegrationsListProps) => {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState<string | null>(null);

  const handleRefresh = async (integrationId: string) => {
    setRefreshing(integrationId);
    
    // Simulate refresh
    setTimeout(async () => {
      const { error } = await supabase
        .from('system_integrations')
        .update({ status: 'active' })
        .eq('id', integrationId);

      if (error) {
        toast({
          title: "Error refreshing integration",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Integration refreshed",
          description: "Connection status updated successfully",
        });
      }
      
      setRefreshing(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Systems</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{integration.name}</h4>
                  <Badge variant={
                    integration.status === 'active' ? 'default' :
                    integration.status === 'error' ? 'destructive' :
                    'secondary'
                  }>
                    {integration.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Type: {integration.type}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRefresh(integration.id)}
                  disabled={refreshing === integration.id}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing === integration.id ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          ))}

          {integrations.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No integrations found. Click the "New Integration" button to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};