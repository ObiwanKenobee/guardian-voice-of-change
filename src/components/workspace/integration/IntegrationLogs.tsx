import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const IntegrationLogs = () => {
  const { toast } = useToast();

  const { data: logs, isLoading } = useQuery({
    queryKey: ['integration-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('integration_logs')
        .select(`
          *,
          system_integrations (
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        toast({
          title: "Error fetching logs",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Clock className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs?.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {log.status === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : log.status === 'error' ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                  <h4 className="font-medium">
                    {log.system_integrations?.name} - {log.event_type}
                  </h4>
                  <Badge variant={
                    log.status === 'success' ? 'default' :
                    log.status === 'error' ? 'destructive' :
                    'secondary'
                  }>
                    {log.status}
                  </Badge>
                </div>
                {log.message && (
                  <p className="text-sm text-muted-foreground">
                    {log.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(log.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {!logs?.length && (
            <div className="text-center py-6 text-muted-foreground">
              No integration logs found.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};