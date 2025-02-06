
import { motion } from "framer-motion";
import { ArrowRight, Twitter, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Join the Future of Ethical & Sustainable Supply Chains
          </h2>
          <p className="text-lg text-muted-foreground">
            Transform your supply chain with Guardian-IO's AI-powered sustainability solutions.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate('/sign-up')}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="flex justify-center gap-6 pt-8">
            <a
              href="https://twitter.com/nature_org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow The Nature Conservancy on Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/nature_org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow The Nature Conservancy on Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.nature.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Visit The Nature Conservancy website"
            >
              <Globe className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
