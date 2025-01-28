import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    name: "Microsoft Dynamics",
    type: "Microsoft",
    status: "connected",
    lastSync: "2024-03-21 13:45:00"
  }
];

export const EnterpriseSystemsList = () => {
  const [connections, setConnections] = useState<SystemConnection[]>(initialConnections);
  const { toast } = useToast();

  const handleSync = (connectionId: string) => {
    toast({
      title: "Sync Started",
      description: "Synchronizing data from enterprise system...",
    });
    
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
    <Card>
      <CardHeader>
        <CardTitle>Connected Systems</CardTitle>
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
  );
};