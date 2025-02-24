
import { motion } from "framer-motion";
import { HandHeart } from "lucide-react";

export function EthicalSourcingHero() {
  return (
    <div className="text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-block p-3 rounded-full bg-primary/10"
      >
        <HandHeart className="h-12 w-12 text-primary" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold"
      >
        Ethical Sourcing Command Center
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-muted-foreground max-w-3xl mx-auto"
      >
        Transform your supply chain with AI-driven insights, real-time monitoring,
        and automated compliance verification
      </motion.p>
    </div>
  );
}
