import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe } from "./Globe";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardPreferences {
  widgets: string[];
  layout: any;
}

export const DashboardGrid = () => {
  const [preferences, setPreferences] = useState<DashboardPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('dashboard_preferences')
          .select('*')
          .single();
        
        setPreferences(data);
      }
      setLoading(false);
    };

    fetchPreferences();
  }, []);

  const riskAlerts = [
    {
      title: "Labor Violation Detected",
      location: "Region B",
      severity: "high",
    },
    {
      title: "Compliance Deadline Approaching",
      location: "Modern Slavery Act",
      severity: "medium",
    }
  ];

  const performanceMetrics = [
    {
      title: "Carbon Footprint",
      value: "-15%",
      trend: "positive",
    },
    {
      title: "Labor Standards",
      value: "+22%",
      trend: "positive",
    },
    {
      title: "SDG Progress",
      value: "78%",
      trend: "neutral",
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-[200px]" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Welcome to Your Command Center for Ethical and Scalable Supply Chains
        </h1>
        <p className="text-muted-foreground text-lg">
          Guardian-IO Workspace combines real-time insights, powerful analytics, and collaboration tools 
          to drive transparency, compliance, and impact across your supply chain ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Real-Time Supply Chain Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Globe />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      alert.severity === 'high' 
                        ? 'bg-destructive/10 border-destructive/20' 
                        : 'bg-warning/10 border-warning/20'
                    }`}
                  >
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <span className="font-medium">{metric.title}</span>
                    <span className={`font-bold ${
                      metric.trend === 'positive' ? 'text-green-600' : 
                      metric.trend === 'negative' ? 'text-red-600' : 
                      'text-blue-600'
                    }`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};