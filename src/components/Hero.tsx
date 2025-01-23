import { ArrowRight, Globe2, Shield, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FloatingTag = ({ text, description, delay }: { text: string; description: string; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute transform cursor-pointer"
      style={{
        left: `${30 + Math.random() * 40}%`,
        top: `${30 + Math.random() * 40}%`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-1 text-sm">
          {text}
        </div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-50 w-48 p-2 mt-2 text-sm bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg"
          >
            {description}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const GlobeAnimation = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="absolute inset-0 flex items-center justify-center opacity-20"
    >
      <Globe2 className="w-96 h-96 text-primary" />
    </motion.div>
  );
};

export const Hero = () => {
  const navigate = useNavigate();
  const tags = [
    {
      text: "Real-Time ESG Compliance",
      description: "99.99% uptime SLA with continuous monitoring",
      delay: 0.8
    },
    {
      text: "Blockchain Verification",
      description: "Over $50B+ in verified transactions",
      delay: 1.0
    },
    {
      text: "AI-Powered Analytics",
      description: "Predictive insights with 95% accuracy",
      delay: 1.2
    }
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-5" />
      </div>

      {/* Animated Globe */}
      <GlobeAnimation />

      {/* Floating Tags */}
      {tags.map((tag, index) => (
        <FloatingTag key={index} {...tag} />
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 gradient-text leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Revolutionizing Supply Chain Ethics.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
              Globally. Seamlessly.
            </span>
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Empower your enterprise with Guardian-IO: Blockchain transparency, real-time ESG compliance, and predictive analytics tailored for your success.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white group transition-all duration-300 w-full sm:w-auto text-base sm:text-lg relative overflow-hidden"
              onClick={() => navigate('/sign-up')}
            >
              <span className="relative z-10 flex items-center">
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="hover:bg-primary/5 transition-colors w-full sm:w-auto text-base sm:text-lg border-primary/20"
              onClick={() => navigate('/pricing')}
            >
              View Pricing
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
};