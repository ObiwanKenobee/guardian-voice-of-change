import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart } from "lucide-react";

export const RealTimeMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5" />
          Real-time Risk Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Risk Level</span>
              <span className="font-medium text-red-600">High</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Satellite Coverage</span>
              <span className="font-medium text-green-600">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Detection Accuracy</span>
              <span className="font-medium text-green-600">95%</span>
            </div>
            <Progress value={95} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Alert Response Time</span>
              <span className="font-medium text-yellow-600">Medium</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};