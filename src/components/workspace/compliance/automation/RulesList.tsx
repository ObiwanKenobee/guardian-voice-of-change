import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Rule {
  id: string;
  name: string;
  framework: string;
  rule_type: string;
  frequency: string;
  status: string;
  last_run_at: string | null;
  next_run_at: string | null;
}

export function RulesList() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from("compliance_automation_rules")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch automation rules.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <div>Loading rules...</div>;
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <Card key={rule.id} className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{rule.name}</h3>
                <Badge variant="outline" className={getStatusColor(rule.status)}>
                  {rule.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Framework: {rule.framework}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {rule.frequency}
                </span>
                {rule.last_run_at && (
                  <span>
                    Last run: {new Date(rule.last_run_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <Badge variant="secondary">{rule.rule_type}</Badge>
          </div>
        </Card>
      ))}
      {rules.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No automation rules found. Create one to get started.
        </div>
      )}
    </div>
  );
}