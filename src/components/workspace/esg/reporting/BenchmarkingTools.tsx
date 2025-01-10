import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BenchmarkChart } from "./benchmarking/BenchmarkChart";

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
          <BenchmarkChart data={benchmarks} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
};