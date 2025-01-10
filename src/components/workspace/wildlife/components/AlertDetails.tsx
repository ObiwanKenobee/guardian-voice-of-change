import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AlertDetailsProps {
  alertId: string;
  onClose: () => void;
}

export const AlertDetails = ({ alertId, onClose }: AlertDetailsProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: alert, isLoading } = useQuery({
    queryKey: ['wildlife-alert', alertId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wildlife_alerts')
        .select('*')
        .eq('id', alertId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('wildlife_alerts')
        .update({ status: newStatus })
        .eq('id', alertId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Alert status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating alert:', error);
      toast({
        title: "Error",
        description: "Failed to update alert status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!alert) {
    return <div>Alert not found</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">{alert.title}</CardTitle>
          <CardDescription>{new Date(alert.created_at).toLocaleString()}</CardDescription>
        </div>
        <Badge variant={alert.status === 'active' ? 'destructive' : 'default'}>
          {alert.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 text-muted-foreground" />
          <span>Location: {JSON.stringify(alert.location)}</span>
          <span className="text-muted-foreground">•</span>
          <AlertTriangle className={`h-4 w-4 ${
            alert.risk_level === 'high' ? 'text-destructive' : 
            alert.risk_level === 'medium' ? 'text-yellow-500' : 'text-green-500'
          }`} />
          <span>{alert.risk_level.charAt(0).toUpperCase() + alert.risk_level.slice(1)} Risk</span>
        </div>

        <p className="text-muted-foreground">{alert.description}</p>

        <div className="flex gap-2 justify-end">
          {alert.status === 'active' && (
            <Button 
              variant="outline" 
              onClick={() => handleStatusUpdate('resolved')}
              disabled={isUpdating}
            >
              Mark as Resolved
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </div>
      </CardContent>
    </Card>
  );
};