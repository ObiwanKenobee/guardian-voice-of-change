
import { Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HeaderBranding = () => {
  return (
    <Link
      to="/workspace"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity group"
    >
      <motion.div 
        className="relative flex items-center justify-center h-9 w-9 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-md overflow-hidden"
        whileHover={{ 
          boxShadow: "0 0 15px rgba(0, 255, 200, 0.3)",
          rotate: 5
        }}
        transition={{ duration: 0.3 }}
      >
        <Shield className="h-5 w-5 text-white z-10" />
        <motion.div
          className="absolute inset-0 bg-white opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
      
      <div className="flex items-center">
        <span className="utopia-gradient-text text-lg font-bold">Guardian</span>
        <Sparkles className="h-3 w-3 text-secondary mx-0.5" />
        <span className="utopia-gradient-text text-lg font-bold">IO</span>
      </div>
    </Link>
  );
};
