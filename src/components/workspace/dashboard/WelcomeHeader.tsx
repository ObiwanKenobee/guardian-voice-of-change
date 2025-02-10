
import { motion } from "framer-motion";
import { Globe, ShieldCheck, LineChart, Users, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const WelcomeHeader = () => {
  const features = [
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "ESG Integration",
      description: "Real-time sustainability monitoring and compliance automation"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      title: "Supply Chain Transparency",
      description: "Blockchain-backed ethical sourcing verification"
    },
    {
      icon: <LineChart className="h-5 w-5 text-primary" />,
      title: "Risk Management",
      description: "AI-powered risk detection and compliance monitoring"
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Stakeholder Oversight",
      description: "Unified governance and stakeholder management"
    },
    {
      icon: <Brain className="h-5 w-5 text-primary" />,
      title: "Performance Analytics",
      description: "AI-driven insights and optimization"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          🚀 Guardian-IO | AI-Powered ESG & Ethical Supply Chain Dashboard
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl max-w-3xl">
          Real-time intelligence, automated compliance, and ethical supply chain transparency—all in one place.
        </p>
      </div>

      <motion.div 
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-muted/50 rounded-lg p-4 border">
        <p className="text-sm text-muted-foreground">
          Welcome to your central hub for supply chain risk management, ESG compliance, and AI-driven analytics. 
          Monitor, track, and optimize operations with our integrated suite of tools designed for Fortune 500 companies, 
          global enterprises, and sustainability-focused organizations.
        </p>
      </div>
    </motion.div>
  );
};
