
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-primary"
      >
        <Leaf className="h-12 w-12" />
      </motion.div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  );
};
