import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Globe } from "./Globe";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertTriangle, 
  BarChart3, 
  Shield, 
  Search, 
  ClipboardList, 
  Bell, 
  Brain, 
  Newspaper,
  Leaf,
  Users,
  FileText,
  Map
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DashboardPreferences {
  widgets: string[];
  layout: any;
}

const features = [
  {
    icon: <Search className="h-5 w-5 text-primary" />,
    title: "Transparency Toolkit",
    description: "Access real-time supply chain visibility and risk assessments"
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Ethical Sourcing Guide",
    description: "Access best practices and compliance guides"
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Collaboration Hub",
    description: "Connect with ethical partners and join discussions"
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
    title: "ESG Reporting",
    description: "Generate ESG-compliant reports and monitor SDG progress"
  },
  {
    icon: <Leaf className="h-5 w-5 text-primary" />,
    title: "Wildlife Protection",
    description: "Combat wildlife trafficking and protect biodiversity"
  }
];

const utilities = [
  {
    icon: <Search className="h-4 w-4" />,
    title: "Search",
    description: "Quick access to tools and reports"
  },
  {
    icon: <ClipboardList className="h-4 w-4" />,
    title: "Task Manager",
    description: "Track compliance and deadlines"
  },
  {
    icon: <Bell className="h-4 w-4" />,
    title: "Notifications",
    description: "Stay updated on risks and updates"
  },
  {
    icon: <Brain className="h-4 w-4" />,
    title: "AI Advisor",
    description: "Get personalized guidance"
  },
  {
    icon: <Newspaper className="h-4 w-4" />,
    title: "News & Insights",
    description: "Latest industry updates"
  }
];

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">
          Guardian-IO Dashboard: Powering Ethical and Scalable Supply Chains 🌍⛓️
        </h1>
        <p className="text-xl text-muted-foreground">
          Welcome, Changemaker! 🌟 Let's revolutionize global supply chains together. Navigate through transparency, 
          collaboration, and cutting-edge tools to drive ethical practices and meet SDGs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Global Supply Chain Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Globe />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Essential tools and utilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {utilities.map((utility, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto py-4"
                  >
                    {utility.icon}
                    <div className="text-left">
                      <div className="font-medium">{utility.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {utility.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <h3 className="text-2xl font-bold mb-2">Ready to join the movement?</h3>
            <p className="text-muted-foreground mb-4">
              Let's shape the future of ethical business together.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};