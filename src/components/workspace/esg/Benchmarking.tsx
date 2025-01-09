import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart2 } from "lucide-react";

interface Benchmark {
  industry: string;
  metric_name: string;
  average_value: number;
  unit: string;
}

export const Benchmarking = () => {
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchBenchmarks();
  }, []);

  const fetchBenchmarks = async () => {
    const { data, error } = await supabase
      .from('esg_benchmarks')
      .select('*');

    if (error) {
      toast({
        title: "Error fetching benchmarks",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setBenchmarks(data);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          <CardTitle>Industry Benchmarks</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              benchmark: { color: "#6366F1" },
            }}
          >
            <BarChart data={benchmarks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis />
              <ChartTooltip />
              <Bar 
                dataKey="average_value" 
                fill="var(--color-benchmark)" 
                name="Industry Average"
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};