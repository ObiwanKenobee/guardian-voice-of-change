
import React from "react";
import { motion } from "framer-motion";
import { 
  Leaf, 
  BarChart2, 
  MessageSquare,
  RefreshCw, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Users,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  index 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:border-green-300 transition-all hover:shadow-md"
    >
      <div className="bg-green-50 p-3 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white/50 to-green-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4"
          >
            A Radical New Model
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            A Radical New Model for Business & Nature
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
           this partnership isn't about doing sustainability better—it's about reinventing it.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Leaf className="h-6 w-6 text-green-600" />}
            title="Nature-Embedded Commerce"
            description="Supply chains designed from the ground up to support biodiversity and ecosystem regeneration."
            index={1}
          />
          <FeatureCard
            icon={<Database className="h-6 w-6 text-green-600" />}
            title="Data-Driven Impact"
            description="AI-powered analytics tracking real-world environmental and social impact across global operations."
            index={2}
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-green-600" />}
            title="Policy & Advocacy Leadership"
            description="Influencing global regulations and standards to scale corporate responsibility."
            index={3}
          />
          <FeatureCard
            icon={<RefreshCw className="h-6 w-6 text-green-600" />}
            title="Circular Resource Management"
            description="Zero-waste approaches that transform byproducts into valuable resources."
            index={4}
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6 text-green-600" />}
            title="Global Restoration Network"
            description="Connecting businesses directly with conservation projects in their sourcing regions."
            index={5}
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-green-600" />}
            title="Community Empowerment"
            description="Creating economic opportunities that preserve traditional knowledge and practices."
            index={6}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Be Part of the Regenerative Future
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Business leaders, changemakers, and conscious consumers—your role is vital in this transformation.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg group">
            Get Involved Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
