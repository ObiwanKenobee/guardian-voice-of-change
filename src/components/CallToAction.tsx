
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="utopia-card p-8 sm:p-12 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <Globe className="h-8 w-8 text-primary" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 utopia-gradient-text">
            Join the Movement for Change
          </h2>
          
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Together, we can create transparent supply chains and protect our world's most vulnerable ecosystems and communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/partner">
              <Button size="lg" className="utopia-button group text-lg w-full sm:w-auto">
                Partner With Us 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/platform-features">
              <Button size="lg" variant="outline" className="utopia-button-outline text-lg w-full sm:w-auto">
                Discover Platform Features
                <Sparkles className="ml-2 h-4 w-4 text-secondary" />
              </Button>
            </Link>
          </div>
          
          {/* Animated accent */}
          <motion.div 
            className="absolute -bottom-2 -right-2 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute -top-2 -left-2 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};
