import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Building2, ArrowRight, ChevronRight } from "lucide-react";
import { Globe as GlobeComponent } from "@/components/workspace/Globe";

interface TagProps {
  text: string;
  description: string;
}

const Tag = ({ text, description }: TagProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${Math.random() * 60 + 20}%`,
        top: `${Math.random() * 60 + 20}%`
      }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <span className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white shadow-glow">
          {text}
        </span>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-50 w-48 p-2 mt-2 text-sm bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white shadow-lg"
          >
            {description}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const DynamicHeader = () => {
  const navigate = useNavigate();
  const tags = [
    {
      text: "Real-Time ESG Compliance",
      description: "Monitor and ensure ESG compliance across your supply chain in real-time"
    },
    {
      text: "Blockchain-Verified",
      description: "100% transparent and immutable transaction records"
    },
    {
      text: "AI-Powered Insights",
      description: "Predictive analytics for smarter decision-making"
    }
  ];

  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
      
      {/* Circuit Board Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/circuit-pattern.svg')] bg-repeat" />
      
      {/* Content Container */}
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight gradient-text animate-gradient-x"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Revolutionizing Supply Chain Ethics. Globally. Seamlessly.
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Empower your enterprise with Guardian-IO: Blockchain transparency, real-time ESG compliance, and predictive analytics tailored for your success.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white group"
                onClick={() => navigate('/platform-features')}
              >
                Explore Solutions <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="hover:bg-primary/5"
                onClick={() => navigate('/partner')}
              >
                View Pricing <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Globe Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] hidden lg:block"
          >
            <div className="absolute inset-0">
              <GlobeComponent />
            </div>
            
            {/* Interactive Tags */}
            {tags.map((tag, index) => (
              <Tag key={index} {...tag} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};