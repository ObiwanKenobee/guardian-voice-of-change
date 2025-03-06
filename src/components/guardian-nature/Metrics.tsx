
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Globe, Users, Recycle } from "lucide-react";
import CountUp from "react-countup";

const MetricCard = ({ 
  icon, 
  title, 
  value, 
  unit, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: number; 
  unit: string; 
  description: string; 
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-green-100"
    >
      <div className="bg-green-50 p-3 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <div className="flex items-baseline mb-3">
        <span className="text-3xl md:text-4xl font-bold text-green-700">
          <CountUp end={value} duration={2.5} separator="," />
        </span>
        <span className="ml-1 text-lg text-green-600">{unit}</span>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export const Metrics = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4"
          >
            Transforming Business into a Force for Nature
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Measurable Impact at Scale
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg mb-8"
          >
            This isn't just sustainability. It's a revolution in how businesses interact with our planet.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon={<Leaf className="h-6 w-6 text-green-600" />}
            title="Regenerative Supply Chains"
            value={87}
            unit="%"
            description="of our partners actively contribute to environmental restoration"
            delay={0.1}
          />
          <MetricCard
            icon={<Globe className="h-6 w-6 text-green-600" />}
            title="Global Restoration at Scale"
            value={12}
            unit="M+"
            description="hectares of land restored through conservation efforts"
            delay={0.2}
          />
          <MetricCard
            icon={<Users className="h-6 w-6 text-green-600" />}
            title="People-First Approach"
            value={3.2}
            unit="M+"
            description="lives improved via fair-trade and ethical sourcing practices"
            delay={0.3}
          />
          <MetricCard
            icon={<Recycle className="h-6 w-6 text-green-600" />}
            title="Carbon-Negative Leadership"
            value={500}
            unit="+"
            description="companies actively removing carbon from our environment"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};
