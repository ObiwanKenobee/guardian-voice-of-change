import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

interface ComplianceCheck {
  id: string;
  framework: string;
  requirement: string;
  status: 'compliant' | 'non_compliant' | 'pending';
  last_checked_at: string;
  next_check_at: string | null;
  details: any;
}

export const ComplianceChecks = () => {
  const [checks, setChecks] = useState<ComplianceCheck[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchComplianceChecks();
  }, []);

  const fetchComplianceChecks = async () => {
    const { data, error } = await supabase
      .from('esg_compliance_checks')
      .select('*')
      .order('last_checked_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching compliance checks",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Type assertion to ensure the data matches our ComplianceCheck interface
    const typedData = (data || []).map(check => ({
      ...check,
      status: check.status as ComplianceCheck['status']
    }));

    setChecks(typedData);
  };

  const getStatusColor = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-500';
      case 'non_compliant':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Compliance Checks</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checks.map((check) => (
            <div
              key={check.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="font-medium">{check.framework}</div>
                <div className="text-sm text-muted-foreground">
                  {check.requirement}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Last checked: {new Date(check.last_checked_at).toLocaleDateString()}
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(check.status)}>
                {check.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};