import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, BookOpen, UserCheck, ChartBar } from "lucide-react";

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

export const GovernanceOverview = () => {
  return (
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
  );
};