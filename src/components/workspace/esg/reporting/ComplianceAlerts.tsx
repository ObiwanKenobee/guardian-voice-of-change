import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ComplianceAlert } from "./compliance/ComplianceAlert";

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
              <ComplianceAlert
                key={check.id}
                framework={check.framework}
                requirement={check.requirement}
                status={check.status}
                nextCheckAt={check.next_check_at}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};