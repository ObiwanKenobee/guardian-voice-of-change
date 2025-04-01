
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Globe, TrendingUp, AlertCircle } from "lucide-react";

interface ESGMetric {
  timestamp: string;
  metric_value: number;
  metric_name: string;
  metric_type: string;
  unit: string;
}

export const RealTimeMonitoring = () => {
  const [metrics, setMetrics] = useState<ESGMetric[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initial fetch
    fetchESGMetrics();

    // Set up real-time subscription with secure options
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'esg_metrics'
        },
        (payload) => {
          setMetrics(current => [...current, payload.new as ESGMetric]);
          toast({
            title: "New ESG Metric Received",
            description: `${payload.new.metric_name}: ${payload.new.metric_value} ${payload.new.unit}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchESGMetrics = async () => {
    const { data, error } = await supabase
      .from('esg_metrics')
      .select('*')
      .order('timestamp', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching ESG metrics",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setMetrics(data);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Real-Time ESG Monitoring</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                environmental: { color: "#10B981" },
                social: { color: "#3B82F6" },
                governance: { color: "#8B5CF6" },
              }}
            >
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <ChartTooltip />
                <Line 
                  type="monotone" 
                  dataKey="metric_value" 
                  stroke="var(--color-environmental)" 
                  name="Environmental"
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
