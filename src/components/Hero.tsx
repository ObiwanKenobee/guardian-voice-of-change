import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto px-6 py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">
            Protecting Our World's Most Vulnerable
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground">
            Join Guardian-IO in the fight against wildlife trafficking and modern slavery through innovative supply chain solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};