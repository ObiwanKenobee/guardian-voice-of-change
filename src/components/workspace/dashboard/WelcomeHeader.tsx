
import { motion } from "framer-motion";
import { Globe, ShieldCheck, LineChart, Users, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const WelcomeHeader = () => {
  const features = [
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "Global Harmony Metrics",
      description: "Real-time impact monitoring across interconnected ecosystems"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      title: "Ethical Synergy",
      description: "Blockchain-verified regenerative practices"
    },
    {
      icon: <LineChart className="h-5 w-5 text-primary" />,
      title: "Prosperity Tracking",
      description: "AI-enhanced wellbeing and flourishing indicators"
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Community Vitality",
      description: "Unified stakeholder thriving metrics"
    },
    {
      icon: <Brain className="h-5 w-5 text-primary" />,
      title: "Wisdom Analytics",
      description: "Nature-inspired intelligence for optimal decisions"
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
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl gradient-text">
          🌍 Guardian-IO | Harmonious World Dashboard
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl max-w-3xl">
          Welcome to your center for positive impact, where every insight nurtures the flourishing of life and community.
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
            <Card className="h-full glass-card">
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

      <div className="bg-gradient-nature rounded-lg p-4 border border-green-100">
        <p className="text-sm text-muted-foreground">
          Your dashboard reflects our collective journey towards a regenerative future. 
          Here you'll find tools for fostering positive impact, building harmonious supply chains, 
          and nurturing thriving communities worldwide.
        </p>
      </div>
    </motion.div>
  );
};
