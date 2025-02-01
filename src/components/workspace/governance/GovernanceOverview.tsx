import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, BookOpen, UserCheck, ChartBar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const metrics = [
  {
    title: "Policy Compliance",
    value: "94%",
    description: "Overall compliance rate",
    icon: Shield,
  },
  {
    title: "Active Policies",
    value: "28",
    description: "Corporate policies in effect",
    icon: BookOpen,
  },
  {
    title: "Board Reviews",
    value: "12",
    description: "Completed this quarter",
    icon: UserCheck,
  },
  {
    title: "Governance Score",
    value: "A+",
    description: "Current ESG rating",
    icon: ChartBar,
  },
];

const complianceTrend = [
  { month: 'Jan', score: 92 },
  { month: 'Feb', score: 93 },
  { month: 'Mar', score: 95 },
  { month: 'Apr', score: 94 },
  { month: 'May', score: 96 },
  { month: 'Jun', score: 94 },
];

export const GovernanceOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};