import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface OnboardingTourProps {
  open: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

const OnboardingTour = ({ open, onClose, onStartTour }: OnboardingTourProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DialogHeader>
            <div className="flex justify-center mb-6">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <DialogTitle className="text-2xl text-center mb-2">
              Welcome to Guardian IO! Together, We're Changing the Game.
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              We're here to help you navigate supply chain complexities and tackle the world's most pressing challenges. Let's take a quick tour to set you up for success.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 space-y-4">
            <Button 
              onClick={onStartTour} 
              className="w-full text-lg h-12"
            >
              Take the Tour 🌍
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full"
            >
              Skip for now
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTour;