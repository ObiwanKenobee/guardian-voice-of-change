import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartTooltip } from "@/components/ui/chart";

const sensorData = [
  { date: "2024-01-01", uptime: 98, alerts: 5 },
  { date: "2024-01-02", uptime: 99, alerts: 3 },
  { date: "2024-01-03", uptime: 97, alerts: 7 },
  { date: "2024-01-04", uptime: 100, alerts: 2 },
  { date: "2024-01-05", uptime: 96, alerts: 8 },
];

export const SensorChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensor Network Performance</CardTitle>
        <CardDescription>Monitor IoT sensor network metrics in real-time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sensorData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip />
              <Area type="monotone" dataKey="uptime" stroke="#2563eb" fill="#3b82f6" />
              <Area type="monotone" dataKey="alerts" stroke="#9333ea" fill="#a855f7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};