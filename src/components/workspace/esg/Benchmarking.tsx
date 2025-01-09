import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart2 } from "lucide-react";

interface Benchmark {
  industry: string;
  metric_name: string;
  average_value: number;
  unit: string;
}

const chartConfig = {
  benchmark: {
    label: "Industry Average",
    theme: {
      light: "#6366F1",
      dark: "#818CF8"
    }
  }
};

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

    if (data) {
      setBenchmarks(data);
    }
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
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">Industry:</span>
                            <span>{payload[0].payload.industry}</span>
                            <span className="font-medium">Average:</span>
                            <span>{payload[0].value} {payload[0].payload.unit}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="average_value" 
                  fill="var(--color-benchmark)" 
                  name="Industry Average"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};