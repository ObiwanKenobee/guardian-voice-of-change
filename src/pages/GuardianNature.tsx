
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, BarChart, Users, Globe, ArrowRight, BarChart2, Zap } from "lucide-react";
import { Hero } from "@/components/guardian-nature/Hero";
import { Features } from "@/components/guardian-nature/Features";
import { Metrics } from "@/components/guardian-nature/Metrics";
import { CaseStudies } from "@/components/guardian-nature/CaseStudies";
import { Footer } from "@/components/guardian-nature/Footer";
import { Navbar } from "@/components/Navbar";

const GuardianNature = () => {
  return (
    <div className="bg-gradient-to-b from-green-50/50 to-background min-h-screen">
      <Navbar />
      <Hero />
      <Metrics />
      <Features />
      <CaseStudies />
      <Footer />
    </div>
  );
};

export default GuardianNature;
