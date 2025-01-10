import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Bot, Shield, Leaf, Scale, Users, BarChart3, AlertTriangle, Heart
} from "lucide-react";

const agents = [
  {
    icon: <Bot className="h-5 w-5 text-primary" />,
    title: "Supply Chain Transparency",
    description: "Real-time visibility and risk mapping",
    action: "View Insights",
    route: "/workspace/supply-chain-transparency"
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Ethical Sourcing Advisor",
    description: "Guidance on ethical sourcing practices",
    action: "Get Recommendations",
    route: "/workspace/ethical-sourcing-advisor"
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
    title: "ESG Reporting",
    description: "Automated ESG compliance reporting",
    action: "Generate Report",
    route: "/workspace/esg-reporting"
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Collaboration Hub",
    description: "Stakeholder engagement platform",
    action: "Join Discussion",
    route: "/workspace/collaboration"
  },
  {
    icon: <Leaf className="h-5 w-5 text-primary" />,
    title: "Wildlife Protection",
    description: "Monitor and prevent trafficking",
    action: "View Alerts",
    route: "/workspace/wildlife-protection"
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-primary" />,
    title: "Risk Mitigation",
    description: "AI-powered risk assessment",
    action: "Assess Risks",
    route: "/workspace/risk-mitigation"
  },
  {
    icon: <Heart className="h-5 w-5 text-primary" />,
    title: "Human Rights Compliance",
    description: "Human rights monitoring and auditing",
    action: "Run Audit",
    route: "/workspace/human-rights-compliance"
  },
  {
    icon: <Scale className="h-5 w-5 text-primary" />,
    title: "Compliance Monitor",
    description: "Real-time compliance tracking",
    action: "Check Status",
    route: "/workspace/compliance"
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
        <h2 className="text-2xl font-bold tracking-tight">AI Agents</h2>
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