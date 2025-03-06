
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Mail, Leaf, Instagram, Twitter, ExternalLink, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-xl border border-green-100 p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Partnership with Purpose
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            This collaboration is more than a commitment—it's a fundamental shift in how businesses interact with the planet. Together, we're proving that profitability and planetary health can thrive hand-in-hand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg w-full sm:w-auto group">
              Start Your Regenerative Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Stay Updated
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Enter your email" 
                  className="pl-10 pr-4 py-2 rounded-lg w-full"
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-12 text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <a href="https://website.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
              <ExternalLink className="h-5 w-5 text-green-600" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
              <Instagram className="h-5 w-5 text-green-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
              <Twitter className="h-5 w-5 text-green-600" />
            </a>
          </div>
          
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <p className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Leaf className="h-4 w-4 text-green-500" />
            <span>Guardian-IO x The Nature Conservancy © {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
