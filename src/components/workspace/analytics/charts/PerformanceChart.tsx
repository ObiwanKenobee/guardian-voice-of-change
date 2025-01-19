import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const performanceData = [
  { month: "Jan", performance: 65, target: 60 },
  { month: "Feb", performance: 68, target: 65 },
  { month: "Mar", performance: 75, target: 70 },
  { month: "Apr", performance: 78, target: 75 },
  { month: "May", performance: 82, target: 80 },
  { month: "Jun", performance: 85, target: 85 },
];

const chartConfig = {
  performance: {
    label: "Performance",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6"
    }
  },
  target: {
    label: "Target",
    theme: {
      light: "#9333ea",
      dark: "#a855f7"
    }
  }
};

export const PerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="performance" fill={`var(--color-performance)`} />
                <Bar dataKey="target" fill={`var(--color-target)`} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};