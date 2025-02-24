
import { motion } from "framer-motion";
import { Leaf, UserCheck, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImpactMetric } from "@/hooks/use-ethical-sourcing";

interface ImpactMetricsGridProps {
  metrics: ImpactMetric[];
}

export function ImpactMetricsGrid({ metrics }: ImpactMetricsGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric_name}</CardTitle>
              <div className="text-primary">
                {metric.category === 'environmental' && <Leaf className="h-5 w-5" />}
                {metric.category === 'social' && <UserCheck className="h-5 w-5" />}
                {metric.category === 'governance' && <Shield className="h-5 w-5" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.metric_value}</div>
              {metric.change_percentage && (
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={metric.change_percentage > 0 ? "text-green-500" : "text-red-500"}>
                    {metric.change_percentage > 0 ? "+" : ""}{metric.change_percentage}%
                  </span>
                  {metric.comparison_period && ` vs ${metric.comparison_period}`}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
