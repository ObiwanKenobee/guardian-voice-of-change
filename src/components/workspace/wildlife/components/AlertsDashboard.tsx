import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Map, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertDetails } from "./AlertDetails";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const AlertsDashboard = () => {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: alerts, isLoading } = useQuery({
    queryKey: ['wildlife-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wildlife_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'investigating':
        return <Badge variant="secondary">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>;
      default:
        return null;
    }
  };

  const handleExportData = async () => {
    try {
      // In a real application, you would format this data appropriately
      const exportData = JSON.stringify(alerts, null, 2);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wildlife-alerts.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Wildlife alerts data has been exported",
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export wildlife alerts data",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const activeAlerts = alerts?.filter(alert => alert.status === 'active') || [];
  const highPriorityAlerts = activeAlerts.filter(alert => alert.risk_level === 'high');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {highPriorityAlerts.length} high priority
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45m</div>
            <p className="text-xs text-muted-foreground">Average this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleExportData}>
          Export Data
        </Button>
      </div>

      <div className="grid gap-4">
        {alerts?.map((alert) => (
          <Card key={alert.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedAlertId(alert.id)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">{alert.title}</CardTitle>
                <CardDescription>{new Date(alert.created_at).toLocaleString()}</CardDescription>
              </div>
              {getStatusBadge(alert.status)}
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span>{JSON.stringify(alert.location)}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className={getPriorityColor(alert.risk_level)}>
                    {alert.risk_level.charAt(0).toUpperCase() + alert.risk_level.slice(1)} Risk
                  </span>
                </div>
                <p className="text-muted-foreground">{alert.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedAlertId} onOpenChange={() => setSelectedAlertId(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedAlertId && (
            <AlertDetails 
              alertId={selectedAlertId} 
              onClose={() => setSelectedAlertId(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};