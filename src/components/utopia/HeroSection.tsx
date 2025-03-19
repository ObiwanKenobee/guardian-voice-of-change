
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Globe, Leaf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [showScrollHint, setShowScrollHint] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/5 to-secondary/10"
            style={{
              width: `${Math.random() * (i % 2 === 0 ? 300 : 200) + 100}px`,
              height: `${Math.random() * (i % 2 === 0 ? 300 : 200) + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: -1,
            }}
            animate={{
              y: [Math.random() * 30, Math.random() * -30, Math.random() * 30],
              x: [Math.random() * 30, Math.random() * -30, Math.random() * 30],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl mx-auto space-y-8"
        >
          <motion.div 
            className="flex items-center justify-center gap-2 text-base text-primary bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full w-fit mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-5 w-5 text-secondary" />
            <span>Creating a harmonious future together</span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight utopia-gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Harmony Between <br className="hidden sm:inline" />
            Business & Nature
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-foreground/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Join the movement towards a regenerative economy that nurtures 
            our planet while fostering prosperity
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              className="utopia-button group w-full sm:w-auto text-lg"
              onClick={() => navigate('/sign-up')}
            >
              Begin Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="utopia-button-outline w-full sm:w-auto text-lg"
              onClick={() => navigate('/guardian-nature')}
            >
              Our Guardian Vision
            </Button>
          </motion.div>

          {/* Value proposition cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {[
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Protection",
                description: "Safeguarding vulnerable ecosystems"
              },
              {
                icon: <Globe className="h-8 w-8 text-primary" />,
                title: "Connection",
                description: "Building transparent global networks"
              },
              {
                icon: <Leaf className="h-8 w-8 text-primary" />,
                title: "Regeneration",
                description: "Restoring natural balance through business"
              },
              {
                icon: <Heart className="h-8 w-8 text-primary" />,
                title: "Compassion",
                description: "Supporting communities with empathy"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="utopia-card p-6 hover:translate-y-[-5px] transition-all"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <div className="utopia-icon-bg inline-flex rounded-2xl mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-foreground/70">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Scroll indicator */}
          {showScrollHint && (
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <span className="text-sm text-foreground/60 mb-2">Discover More</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="h-6 w-6 text-primary transform rotate-90" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
