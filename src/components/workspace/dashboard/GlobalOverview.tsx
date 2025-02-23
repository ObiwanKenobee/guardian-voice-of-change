
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Sprout, Heart, Globe, ShieldCheck, 
  TrendingUp, Users, Leaf, Scale
} from "lucide-react";
import { motion } from "framer-motion";

export const GlobalOverview = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Regenerative Impact",
      value: "92%",
      change: "+4%",
      icon: <Sprout className="h-4 w-4 text-emerald-500" />,
      description: "Ecosystem health score"
    },
    {
      title: "Community Wellbeing",
      value: "4.8",
      change: "+0.3",
      icon: <Heart className="h-4 w-4 text-pink-500" />,
      description: "Average flourishing index"
    },
    {
      title: "Global Harmony",
      value: "95%",
      change: "+2%",
      icon: <Globe className="h-4 w-4 text-blue-500" />,
      description: "Cross-border cooperation"
    },
    {
      title: "Ethics Score",
      value: "98",
      change: "+3",
      icon: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
      description: "Ethical practice rating"
    }
  ];

  const impactAreas = [
    {
      title: "Biodiversity Enhancement",
      value: "+28%",
      icon: <Leaf className="h-5 w-5 text-green-500" />
    },
    {
      title: "Social Equity",
      value: "94%",
      icon: <Scale className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Stakeholder Engagement",
      value: "8.9/10",
      icon: <Users className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Innovation Impact",
      value: "+42%",
      icon: <TrendingUp className="h-5 w-5 text-cyan-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
                <div className="text-sm text-emerald-600 mt-2">
                  {metric.change} from last period
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gradient-nature border-green-100">
        <CardHeader>
          <CardTitle className="text-lg">Harmonious Impact Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-green-50">
                {area.icon}
                <div>
                  <div className="text-sm font-medium">{area.title}</div>
                  <div className="text-2xl font-bold">{area.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => navigate('/workspace/analytics')}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              View Detailed Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
