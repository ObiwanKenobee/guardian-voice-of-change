
import { useState } from "react";
import { BarChart3, Zap, Link, RefreshCw, Settings, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  type: string;
  icon: any;
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastSync: string;
}

export const XApiIntegrationList = () => {
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState<string | null>(null);
  
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "TURBO-X Compliance API",
      type: "ESG Optimization",
      icon: Zap,
      status: 'active',
      lastSync: new Date().toISOString()
    },
    {
      id: "2",
      name: "FUSION-X Command Center",
      type: "Dashboard Integration",
      icon: BarChart3,
      status: 'active',
      lastSync: new Date().toISOString()
    },
    {
      id: "3",
      name: "ULTRA-LINK Blockchain API",
      type: "Supply Chain Network",
      icon: Link,
      status: 'pending',
      lastSync: new Date().toISOString()
    }
  ]);

  const handleRefresh = async (integrationId: string) => {
    setRefreshing(integrationId);
    
    // Simulate refresh
    setTimeout(() => {
      setIntegrations(integrations.map(i => 
        i.id === integrationId 
          ? {...i, status: 'active', lastSync: new Date().toISOString()} 
          : i
      ));
      
      toast({
        title: "Integration refreshed",
        description: "Connection status updated successfully",
      });
      
      setRefreshing(null);
    }, 2000);
  };

  const statusMap = {
    'active': { label: 'Active', variant: 'default' },
    'inactive': { label: 'Inactive', variant: 'secondary' },
    'error': { label: 'Error', variant: 'destructive' },
    'pending': { label: 'Pending', variant: 'outline' }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>X-API Integrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => {
            const IconComponent = integration.icon;
            return (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      <Badge variant={statusMap[integration.status].variant as any}>
                        {statusMap[integration.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-muted-foreground">
                        {integration.type}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        Last sync: {new Date(integration.lastSync).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
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
            );
          })}

          {integrations.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <AlertCircle className="mx-auto h-8 w-8 mb-2" />
              <p>No active X-API integrations</p>
              <p className="text-sm">Connect to X-API services from the Innovations tab</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
