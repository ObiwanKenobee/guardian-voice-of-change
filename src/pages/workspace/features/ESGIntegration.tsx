import { motion } from "framer-motion";
import { Globe, LineChart, Shield, Database, Leaf, Link2, Users, BarChart3, Zap } from "lucide-react";
import { RealTimeMonitoring } from "@/components/workspace/esg/RealTimeMonitoring";
import { ComplianceChecks } from "@/components/workspace/esg/ComplianceChecks";
import { Benchmarking } from "@/components/workspace/esg/Benchmarking";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Real-Time ESG Data Monitoring",
    description: "Live tracking of carbon emissions, resource consumption, and ethical sourcing across global operations.",
    badge: "Enterprise"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Automated ESG Compliance",
    description: "Seamless adherence to global sustainability frameworks (GRI, SASB, TCFD, CDP, SEC Climate Disclosure).",
    badge: "Premium"
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "Supply Chain Sustainability",
    description: "Blockchain-verified tracking of sustainable supply chain practices and supplier audits.",
    badge: "New"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Stakeholder Engagement",
    description: "Interactive dashboards for real-time ESG impact visualization and industry comparisons.",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Enterprise Integration",
    description: "Seamless connectivity with SAP, Oracle, Microsoft Dynamics, and enterprise ERP systems.",
    badge: "Fortune 500"
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Sustainability Intelligence",
    description: "IoT-powered smart monitoring for emissions tracking and environmental impact reduction.",
  }
];

const ESGIntegration = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <FeatureLayout
        icon={Globe}
        title="Global ESG Integration"
        description="Empowering Fortune 500 companies with AI-driven ESG integration, real-time compliance tracking, and sustainability performance benchmarking."
      >
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Driving Sustainability & Compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your ESG strategy with real-time monitoring, automated compliance, and AI-powered insights.
            </p>
          </div>

          {/* Real-Time Monitoring Dashboard */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>ESG Performance Dashboard</CardTitle>
                </div>
                <Badge variant="outline" className="bg-primary/10">Live Data</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <RealTimeMonitoring />
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-primary">{feature.icon}</div>
                      {feature.badge && (
                        <Badge variant="outline" className="bg-primary/10">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Compliance and Benchmarking Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Compliance Monitoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ComplianceChecks />
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle>Industry Benchmarking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Benchmarking />
              </CardContent>
            </Card>
          </div>
        </div>
      </FeatureLayout>
    </motion.div>
  );
};

export default ESGIntegration;