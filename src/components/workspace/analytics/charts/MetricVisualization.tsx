import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricDataFromDB {
  id: string;
  metric_id: string;
  metric_name: string;
  metric_type: string;
  metric_value: number;
  timestamp: string;
  user_id: string;
}

interface MetricData {
  timestamp: string;
  value: number;
}

interface MetricVisualizationProps {
  metric: {
    id: string;
    name: string;
    visualization_type: string;
  };
}

type QueryFnData = MetricData[];
type QueryError = Error;

export const MetricVisualization = ({ metric }: MetricVisualizationProps) => {
  const fetchMetricData = async (): Promise<QueryFnData> => {
    const { data: dbData, error } = await supabase
      .from("analytics_metrics")
      .select("*")
      .eq("metric_id", metric.id)
      .order("timestamp", { ascending: true });

    if (error) throw error;

    return (dbData as MetricDataFromDB[]).map((item) => ({
      timestamp: item.timestamp,
      value: item.metric_value
    }));
  };

  const { data, isLoading, isError } = useQuery<QueryFnData, QueryError>({
    queryKey: ["metric-data", metric.id],
    queryFn: fetchMetricData
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Alert>
        <AlertDescription>
          Failed to load visualization data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const renderVisualization = () => {
    if (!data) return null;

    switch (metric.visualization_type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="timestamp"
                cx="50%"
                cy="50%"
                fill="#3b82f6"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" fill="#3b82f6" />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="timestamp" />
              <Radar dataKey="value" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <Alert>
            <AlertDescription>
              Unsupported visualization type: {metric.visualization_type}
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{metric.name}</CardTitle>
      </CardHeader>
      <CardContent>{renderVisualization()}</CardContent>
    </Card>
  );
};