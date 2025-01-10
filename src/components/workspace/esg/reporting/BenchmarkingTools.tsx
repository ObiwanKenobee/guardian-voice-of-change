import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart } from "lucide-react";

export const BenchmarkingTools = () => {
  const { data: benchmarks, isLoading } = useQuery({
    queryKey: ['esg-benchmarks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('esg_benchmarks')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5" />
          Industry Benchmarking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              Loading benchmarks...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average_value" fill="#6366F1" name="Industry Average" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};