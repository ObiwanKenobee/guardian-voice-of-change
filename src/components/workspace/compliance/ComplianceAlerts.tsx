import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const ComplianceAlerts = () => {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['compliance-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_automation_rules')
        .select('*')
        .eq('rule_type', 'regional')
        .eq('status', 'non_compliant')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading alerts...</div>;
  }

  return (
    <div className="space-y-4">
      {alerts?.map((alert) => (
        <Card key={alert.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            {alert.status === 'non_compliant' ? (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            ) : (
              <CheckCircle className="h-5 w-5 text-success" />
            )}
            <div>
              <CardTitle className="text-base">{alert.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Framework: {alert.framework}
              </p>
            </div>
            <Badge 
              variant="destructive" 
              className="ml-auto"
            >
              Action Required
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {alert.description || 'No description provided'}
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Last checked: {new Date(alert.last_run_at || alert.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {alerts?.length === 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>No compliance alerts at this time</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};