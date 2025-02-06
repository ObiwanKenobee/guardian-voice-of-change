
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80 backdrop-blur-sm" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Protecting People & Planet: Ethical Supply Chains for a Sustainable Future
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join Guardian-IO and The Nature Conservancy in revolutionizing supply chain sustainability through AI-driven transparency and ecological impact tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/sign-up')}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="backdrop-blur-sm hover:bg-white/10 transition-all"
              onClick={() => navigate('/contact')}
            >
              Request Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
