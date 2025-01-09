import { Database, Server, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface SystemConnection {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
}

const initialConnections: SystemConnection[] = [
  {
    id: "1",
    name: "SAP ERP",
    type: "SAP",
    status: "connected",
    lastSync: "2024-03-21 14:30:00"
  },
  {
    id: "2",
    name: "Oracle Cloud ERP",
    type: "Oracle",
    status: "disconnected",
    lastSync: "2024-03-20 09:15:00"
  },
  {
    id: "3",
    name: "Custom Warehouse System",
    type: "Custom",
    status: "connected",
    lastSync: "2024-03-21 13:45:00"
  }
];

const EnterpriseData = () => {
  const [connections, setConnections] = useState<SystemConnection[]>(initialConnections);
  const { toast } = useToast();

  const handleSync = (connectionId: string) => {
    toast({
      title: "Sync Started",
      description: "Synchronizing data from enterprise system...",
    });
    
    // Simulate sync process
    setTimeout(() => {
      setConnections(prev => prev.map(conn => {
        if (conn.id === connectionId) {
          return {
            ...conn,
            lastSync: new Date().toISOString().replace('T', ' ').split('.')[0],
            status: "connected"
          };
        }
        return conn;
      }));
      
      toast({
        title: "Sync Complete",
        description: "Data has been successfully synchronized",
      });
    }, 2000);
  };

  const handleConnect = (connectionId: string) => {
    toast({
      title: "Connecting...",
      description: "Establishing connection to enterprise system",
    });
    
    // Simulate connection process
    setTimeout(() => {
      setConnections(prev => prev.map(conn => {
        if (conn.id === connectionId) {
          return {
            ...conn,
            status: "connected"
          };
        }
        return conn;
      }));
      
      toast({
        title: "Connected",
        description: "Successfully connected to enterprise system",
      });
    }, 1500);
  };

  return (
    <FeatureLayout
      icon={Database}
      title="Enterprise Data Integration"
      description="Seamlessly integrate with existing enterprise systems like SAP, Oracle, or custom ERP solutions."
    >
      <div className="grid gap-6">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Systems</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{connections.length}</div>
              <p className="text-xs text-muted-foreground">Enterprise systems connected</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {connections.filter(c => c.status === "connected").length}
              </div>
              <p className="text-xs text-muted-foreground">Systems currently online</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((connections.filter(c => c.status === "connected").length / connections.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Overall sync health</p>
            </CardContent>
          </Card>
        </div>

        {/* Systems List */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Systems</CardTitle>
            <CardDescription>
              Manage your enterprise system integrations and data synchronization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{connection.name}</h4>
                      <Badge variant={connection.status === "connected" ? "default" : "destructive"}>
                        {connection.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last synced: {connection.lastSync}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {connection.status === "disconnected" ? (
                      <Button
                        variant="outline"
                        onClick={() => handleConnect(connection.id)}
                      >
                        Connect
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => handleSync(connection.id)}
                      >
                        Sync Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </FeatureLayout>
  );
};

export default EnterpriseData;