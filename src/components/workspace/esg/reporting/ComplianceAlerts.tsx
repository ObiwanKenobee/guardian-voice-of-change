import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ComplianceAlerts = () => {
  const { data: checks, isLoading } = useQuery({
    queryKey: ['compliance-checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('esg_compliance_checks')
        .select('*')
        .order('next_check_at', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Compliance Alerts & Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div>Loading compliance checks...</div>
          ) : (
            checks?.map((check) => (
              <div
                key={check.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium">{check.framework}</div>
                  <div className="text-sm text-muted-foreground">
                    {check.requirement}
                  </div>
                  {check.next_check_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(check.next_check_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <Badge variant={check.status === 'compliant' ? 'default' : 'destructive'}>
                  {check.status}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};