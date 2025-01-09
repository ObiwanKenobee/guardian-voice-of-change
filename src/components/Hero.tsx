import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 gradient-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Protecting Our World's Most Vulnerable
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Join Guardian-IO in the fight against wildlife trafficking and modern slavery through innovative supply chain solutions.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white group transition-all duration-300 w-full sm:w-auto"
              onClick={() => window.location.href = '/sign-up'}
            >
              Get Started 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="hover:bg-primary/5 transition-colors w-full sm:w-auto"
              onClick={() => window.location.href = '/partner'}
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};