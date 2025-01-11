import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Package, HandshakeIcon, BarChart3, Users, PawPrint, 
  ShieldAlert, UserCheck, ArrowLeft, ListChecks, Zap,
  Globe, LineChart, Network, Building2, BookOpen
} from "lucide-react";

const agents = [
  {
    icon: <Package className="h-5 w-5 text-primary" />,
    title: "Supply Chain Transparency",
    description: "Real-time visibility into supply chain activities",
    role: "Provides real-time visibility into supply chain activities to ensure ethical practices, reduce risks, and improve decision-making.",
    features: [
      "Data Aggregation from suppliers and transport systems",
      "Risk Mapping for high-risk regions",
      "Dynamic Monitoring of compliance metrics"
    ],
    innovations: [
      "Predictive analytics for disruption forecasting",
      "IoT integration for live tracking"
    ],
    action: "View Supply Chain",
    route: "/workspace/supply-chain"
  },
  {
    icon: <HandshakeIcon className="h-5 w-5 text-primary" />,
    title: "Ethical Sourcing Advisor",
    description: "Guidance for ethical sourcing and supplier management",
    role: "Acts as a consultant and compliance assistant for ethical sourcing and supplier management.",
    features: [
      "Guidance Tools for labor rights",
      "Supplier Matchmaking",
      "Legal Alerts for regulation updates"
    ],
    innovations: [
      "Blockchain tracking for ethical credentials",
      "Automated supplier scorecards"
    ],
    action: "Get Advice",
    route: "/workspace/ethical-sourcing"
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
    title: "ESG Reporting & Compliance",
    description: "AI-powered ESG report generation",
    role: "Automates the creation of ESG-compliant reports and ensures compliance with international standards.",
    features: [
      "Automated Report Generation",
      "Benchmarking Tools",
      "Compliance Alerts & Notifications"
    ],
    innovations: [
      "Real-time SDG progress dashboards",
      "AI-driven scenario analysis"
    ],
    action: "Generate Reports",
    route: "/workspace/esg-reporting"
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Collaboration & Community",
    description: "Facilitate stakeholder engagement",
    role: "Facilitates stakeholder engagement and collaborative problem-solving across supply chain networks.",
    features: [
      "Stakeholder Matching",
      "Virtual Roundtables",
      "Community Insights Analysis"
    ],
    innovations: [
      "AI-enabled conflict resolution",
      "Sentiment analysis tools"
    ],
    action: "Collaborate",
    route: "/workspace/collaboration"
  },
  {
    icon: <PawPrint className="h-5 w-5 text-primary" />,
    title: "Wildlife Protection",
    description: "Combat wildlife trafficking and protect biodiversity",
    role: "Focuses on combating wildlife crime and promoting biodiversity protection within supply chains.",
    features: [
      "Wildlife Trafficking Monitoring",
      "Biodiversity Impact Assessment",
      "Partnership Finder"
    ],
    innovations: [
      "AI-powered risk heatmaps",
      "Predictive impact modeling"
    ],
    action: "Monitor Wildlife",
    route: "/workspace/wildlife"
  },
  {
    icon: <ShieldAlert className="h-5 w-5 text-primary" />,
    title: "Risk Mitigation",
    description: "Identify and mitigate supply chain risks",
    role: "Identifies and mitigates risks associated with human rights violations, modern slavery, and environmental harm.",
    features: [
      "Risk Scoring System",
      "Scenario Planning",
      "Crisis Alert System"
    ],
    innovations: [
      "AI-driven supplier recommendations",
      "Satellite imagery integration"
    ],
    action: "Assess Risks",
    route: "/workspace/risk-mitigation"
  },
  {
    icon: <UserCheck className="h-5 w-5 text-primary" />,
    title: "Human Rights Compliance",
    description: "Ensure human rights standards compliance",
    role: "Ensures adherence to human rights standards throughout the supply chain.",
    features: [
      "Virtual Auditing Tools",
      "Compliance Heatmaps",
      "Training Module System"
    ],
    innovations: [
      "Real-time compliance monitoring",
      "AI-assisted impact assessments"
    ],
    action: "Check Compliance",
    route: "/workspace/human-rights"
  }
];

export const AIAgents = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/workspace/dashboard')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">AI Agents</h2>
        </div>
        <Button 
          variant="outline" 
          className="hidden sm:inline-flex"
          onClick={() => navigate('/workspace/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {agent.icon}
                <CardTitle className="text-lg">{agent.title}</CardTitle>
              </div>
              <CardDescription className="text-sm text-muted-foreground">
                {agent.role}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {agent.features.map((feature, idx) => (
                    <li key={idx} className="text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Innovations:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {agent.innovations.map((innovation, idx) => (
                    <li key={idx} className="text-muted-foreground">{innovation}</li>
                  ))}
                </ul>
              </div>
              <Button 
                variant="secondary" 
                className="w-full mt-4"
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