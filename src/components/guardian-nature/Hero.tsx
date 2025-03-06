
import React from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#e5f9e0_0%,rgba(255,255,255,0)_60%)] opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div className="h-[2px] w-8 bg-green-300 mx-3"></div>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full">
              Partnership Announcement
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 bg-clip-text text-transparent mb-6 leading-tight">
            Guardian-IO x The Nature Conservancy
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Redefining Sustainability: A Business-Driven Path to Regeneration.
            <span className="block mt-2 text-lg md:text-xl font-light">
              Every business decision should heal the planet. This partnership makes it possible.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 h-auto rounded-lg text-lg group">
              Start Your Regenerative Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 px-6 py-6 h-auto rounded-lg text-lg">
              Learn More About The Partnership
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
