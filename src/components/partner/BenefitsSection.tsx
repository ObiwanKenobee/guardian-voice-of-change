
import { Handshake, Leaf, Globe, Shield, Users, Medal } from "lucide-react";
import { motion } from "framer-motion";

export const BenefitsSection = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Handshake className="h-12 w-12 text-primary" />
        </motion.div>
      </div>
      <h2 className="mt-6 text-3xl font-bold utopia-gradient-text">
        Let's Regenerate Our World Together
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Join forces with Guardian-IO to drive innovation, sustainability, and create business practices that heal our planet while fostering prosperity.
      </p>

      <div className="bg-card p-6 rounded-lg shadow-sm space-y-6 mt-8">
        <h3 className="font-semibold text-lg">Alliance Benefits</h3>
        
        <ul className="space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-3 w-3 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-medium">Global Impact Network</span>
              <p className="text-muted-foreground text-xs mt-0.5">Access our network spanning 150+ countries and 500+ partners</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-3 w-3 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-medium">Cutting-Edge ESG Technology</span>
              <p className="text-muted-foreground text-xs mt-0.5">Leverage our AI-powered tools for supply chain transparency</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-3 w-3 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-medium">Collective Wisdom</span>
              <p className="text-muted-foreground text-xs mt-0.5">Join our community of sustainability pioneers and thought leaders</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="h-3 w-3 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-medium">Regenerative Business Model</span>
              <p className="text-muted-foreground text-xs mt-0.5">Transform your operations to restore rather than deplete our planet</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Medal className="h-3 w-3 text-primary" />
            </div>
            <div className="text-left">
              <span className="font-medium">Leadership Recognition</span>
              <p className="text-muted-foreground text-xs mt-0.5">Be recognized as a pioneer in the regenerative economy movement</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
