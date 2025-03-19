
import { Link } from "react-router-dom";
import { Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <Link to="/" className="mb-4 inline-block">
        <motion.div 
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative flex items-center justify-center h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-md overflow-hidden">
            <Shield className="h-6 w-6 text-white z-10" />
            <motion.div
              className="absolute inset-0 bg-white opacity-20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          
          <div className="flex items-center">
            <span className="utopia-gradient-text text-2xl font-bold">Guardian</span>
            <Sparkles className="h-4 w-4 text-secondary mx-0.5" />
            <span className="utopia-gradient-text text-2xl font-bold">IO</span>
          </div>
        </motion.div>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold utopia-gradient-text">{title}</h1>
        <p className="text-foreground/70 mt-2 max-w-md mx-auto">{description}</p>
      </motion.div>
    </div>
  );
};
