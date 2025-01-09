import { motion } from "framer-motion";

export const WelcomeHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h1 className="text-4xl font-bold gradient-text">
        Guardian-IO Dashboard: Powering Ethical and Scalable Supply Chains 🌍⛓️
      </h1>
      <p className="text-xl text-muted-foreground">
        Welcome, Changemaker! 🌟 Let's revolutionize global supply chains together. Navigate through transparency, 
        collaboration, and cutting-edge tools to drive ethical practices and meet SDGs.
      </p>
    </motion.div>
  );
};