
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
import { SEOHead } from "@/components/SEOHead";

const GuardianNature = () => {
  return (
    <div className="bg-gradient-to-b from-green-50/50 to-background min-h-screen">
      <SEOHead 
        title="Guardian Nature | Transformative Partnership for Sustainable Business"
        description="Discover how our collaboration with The Nature Conservancy is creating business-driven paths to environmental regeneration and building a harmonious future."
        keywords={[
          "nature conservation partnership",
          "sustainable business practices",
          "environmental regeneration",
          "corporate conservation",
          "business sustainability",
          "regenerative economy",
          "nature-positive business",
          "sustainability innovation",
          "carbon-negative businesses",
          "esg partnership"
        ]}
        ogType="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Guardian Nature: Transformative Partnership for Sustainable Business",
          "image": "https://guardian-io.vercel.app/images/guardian-nature-hero.jpg",
          "author": {
            "@type": "Organization",
            "name": "Guardian-IO",
            "url": "https://guardian-io.vercel.app/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Guardian-IO",
            "logo": {
              "@type": "ImageObject",
              "url": "https://guardian-io.vercel.app/logo.png"
            }
          },
          "datePublished": "2023-09-01",
          "dateModified": "2023-12-15"
        }}
      />
      <Hero />
      <Metrics />
      <Features />
      <CaseStudies />
      <Footer />
    </div>
  );
};

export default GuardianNature;
