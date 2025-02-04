
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Loader2 } from "lucide-react";

export const CarbonAnalytics = () => {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['carbon-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('carbon_footprint_data')
        .select('*')
        .order('timestamp', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const processedData = analyticsData?.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    emissions: item.emission_value.toString(),
    scope: item.emission_scope
  }));

  // Calculate total emissions and convert to string
  const totalEmissions = analyticsData
    ? analyticsData.reduce((sum, item) => sum + Number(item.emission_value), 0).toFixed(2).toString()
    : "0";

  // Calculate average emissions and convert to string
  const averageEmissions = analyticsData && analyticsData.length > 0
    ? (analyticsData.reduce((sum, item) => sum + Number(item.emission_value), 0) / analyticsData.length).toFixed(2).toString()
    : "0";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalEmissions} tCO₂e
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Monthly Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageEmissions} tCO₂e
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emissions Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processedData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#2563eb" 
                  fill="#3b82f6" 
                  name="Emissions (tCO₂e)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
