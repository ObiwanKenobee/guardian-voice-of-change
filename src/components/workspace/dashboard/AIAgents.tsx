import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Bot, Shield, Leaf, Scale, Users, BarChart3, AlertTriangle, Heart,
  ArrowLeft
} from "lucide-react";

const agents = [
  {
    icon: <Bot className="h-5 w-5 text-primary" />,
    title: "ESG Reporting",
    description: "AI-powered ESG report generation",
    action: "Generate Reports",
    route: "/workspace/esg-reporting"
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Compliance Monitoring",
    description: "Automated compliance checks and alerts",
    action: "Check Compliance",
    route: "/workspace/compliance"
  },
  {
    icon: <Leaf className="h-5 w-5 text-primary" />,
    title: "Sustainability Insights",
    description: "Insights on sustainability practices",
    action: "View Insights",
    route: "/workspace/sustainability"
  },
  {
    icon: <Scale className="h-5 w-5 text-primary" />,
    title: "Risk Assessment",
    description: "AI-driven risk assessment tools",
    action: "Assess Risks",
    route: "/workspace/risk-assessment"
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Stakeholder Engagement",
    description: "Engage with stakeholders effectively",
    action: "Engage Now",
    route: "/workspace/stakeholder-engagement"
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
    title: "Performance Analytics",
    description: "Analyze performance metrics",
    action: "View Analytics",
    route: "/workspace/performance-analytics"
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-primary" />,
    title: "Alerts & Notifications",
    description: "Stay updated with compliance alerts",
    action: "View Alerts",
    route: "/workspace/alerts"
  },
  {
    icon: <Heart className="h-5 w-5 text-primary" />,
    title: "Human Rights Compliance",
    description: "Monitor human rights compliance",
    action: "Run Audit",
    route: "/workspace/human-rights-compliance"
  }
];

export const AIAgents = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/workspace/dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">AI Agents</h2>
        </div>
        <Button variant="outline">View All Agents</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                {agent.icon}
                {agent.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {agent.description}
              </p>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate(agent.route)}
              >
                {agent.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
