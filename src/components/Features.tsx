import { motion } from "framer-motion";
import { Shield, Leaf, Users, Globe, LineChart, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Supply Chain Transparency",
    description: "Real-time tracking and verification of ethical sourcing practices.",
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Wildlife Protection",
    description: "Advanced monitoring systems to prevent wildlife trafficking.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Human Rights",
    description: "Ensuring fair labor practices and preventing modern slavery.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Global Impact",
    description: "Creating positive change across international supply chains.",
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Impact Metrics",
    description: "Measurable results in protecting wildlife and human rights.",
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Educational Resources",
    description: "Comprehensive guides and training for ethical practices.",
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Our Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and strategies to combat wildlife trafficking and modern slavery
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};