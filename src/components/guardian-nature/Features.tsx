
import { Brain, Leaf, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI-Powered ESG Compliance",
    description: "Track environmental & ethical risks in supply chains with advanced AI monitoring."
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Sustainable Sourcing Insights",
    description: "Real-time data on deforestation, carbon footprint, & biodiversity impact."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Blockchain-Powered Transparency",
    description: "Immutable verification for eco-friendly & fair labor practices."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How We Help
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm border-primary/10">
                <CardContent className="p-6 space-y-4">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
