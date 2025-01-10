import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe2, Users2 } from "lucide-react";

interface SDGMetric {
  label: string;
  value: string;
}

interface SDGMetricCardProps {
  goal: string;
  progress: number;
  metrics: SDGMetric[];
}

export const SDGMetricCard = ({ goal, progress, metrics }: SDGMetricCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {goal.includes("8") ? (
            <Users2 className="h-5 w-5" />
          ) : (
            <Globe2 className="h-5 w-5" />
          )}
          {goal}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <div className="grid gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};