import { motion } from "framer-motion";
import { Globe, LineChart, Shield, Database, BarChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ESGIntegration = () => {
  const { toast } = useToast();

  const handleWaitlistSignup = () => {
    toast({
      title: "Thanks for your interest!",
      description: "We'll notify you when the ESG Integration Dashboard launches.",
    });
  };

  const features = [
    {
      icon: LineChart,
      title: "Real-Time ESG Monitoring",
      description: "Track key metrics such as carbon emissions, labor rights, and waste management with interactive, customizable dashboards."
    },
    {
      icon: Shield,
      title: "Automated Compliance Checks",
      description: "Stay ahead with pre-configured tools for GRI, SDGs, and Modern Slavery Act frameworks. Receive instant alerts and updates."
    },
    {
      icon: Database,
      title: "Unified Data Integration",
      description: "Consolidate data from multiple sources including suppliers, partners, and IoT devices with AI-powered analytics."
    },
    {
      icon: BarChart,
      title: "Benchmarking & Reporting Tools",
      description: "Compare performance against industry peers and SDG targets while generating ESG-compliant reports."
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-primary">
          <Globe className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Global ESG Integration</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Unite Fortune 500 Supply Chains with Seamless ESG Data Integration
          </h2>
          <p className="text-xl text-muted-foreground">
            Transforming compliance into competitive advantage.
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            Real-time Monitoring. Automated Compliance. Unlimited Impact.
          </h3>
          <p className="text-muted-foreground">
            Unlock the power of Environmental, Social, and Governance (ESG) data to build resilient, sustainable, and ethical supply chains.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Introducing the ESG Integration Dashboard</CardTitle>
            <CardDescription>
              A state-of-the-art platform that enables Fortune 500 companies to effortlessly integrate ESG metrics across global supply chains.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Guardian-IO for ESG Integration?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>Trusted by Fortune 500 companies</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>Backed by cutting-edge AI and machine learning technologies</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>Designed for actionable insights and measurable impact</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Stay Ahead of the Curve!</CardTitle>
            <CardDescription className="text-center">
              Be the first to experience the Global ESG Integration Dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={handleWaitlistSignup}
            >
              Join the Waitlist Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ESGIntegration;