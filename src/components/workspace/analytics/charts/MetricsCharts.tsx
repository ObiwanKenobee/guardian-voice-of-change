import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartTooltip } from "@/components/ui/chart";

const performanceData = [
  { month: "Jan", performance: 65, target: 60 },
  { month: "Feb", performance: 68, target: 65 },
  { month: "Mar", performance: 75, target: 70 },
  { month: "Apr", performance: 78, target: 75 },
  { month: "May", performance: 82, target: 80 },
  { month: "Jun", performance: 85, target: 85 },
];

export const MetricsCharts = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Wildlife Monitoring</CardTitle>
          <CardDescription>Species activity and protection metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <Line type="monotone" dataKey="performance" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Compliance</CardTitle>
          <CardDescription>Track compliance and certification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <Line type="monotone" dataKey="target" stroke="#9333ea" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};