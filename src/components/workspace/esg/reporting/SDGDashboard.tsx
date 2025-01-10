import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Globe2, Users2 } from "lucide-react";

export const SDGDashboard = () => {
  const sdgProgress = [
    {
      goal: "SDG 8: Decent Work and Economic Growth",
      progress: 75,
      metrics: [
        { label: "Employment Rate", value: "92%" },
        { label: "Wage Growth", value: "+5.2%" },
        { label: "Training Hours", value: "40hrs/employee" }
      ]
    },
    {
      goal: "SDG 16: Peace, Justice and Strong Institutions",
      progress: 68,
      metrics: [
        { label: "Policy Compliance", value: "98%" },
        { label: "Incident Reports", value: "-15%" },
        { label: "Governance Score", value: "A+" }
      ]
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sdgProgress.map((sdg) => (
        <Card key={sdg.goal}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {sdg.goal.includes("8") ? (
                <Users2 className="h-5 w-5" />
              ) : (
                <Globe2 className="h-5 w-5" />
              )}
              {sdg.goal}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{sdg.progress}%</span>
              </div>
              <Progress value={sdg.progress} />
            </div>
            <div className="grid gap-4">
              {sdg.metrics.map((metric) => (
                <div key={metric.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};