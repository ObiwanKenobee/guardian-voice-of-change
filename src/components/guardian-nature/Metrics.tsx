
import { motion } from "framer-motion";

const metrics = [
  { value: "2.5M", label: "Tons of Carbon Reduced" },
  { value: "500K", label: "Acres of Forest Protected" },
  { value: "1000+", label: "Ethical Trade Partnerships" }
];

export const Metrics = () => {
  return (
    <section className="py-20 bg-primary/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Live Impact Metrics
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-8 bg-white/50 rounded-lg backdrop-blur-sm shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
              <div className="text-muted-foreground">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
