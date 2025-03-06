
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, PlayCircle, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CaseStudyCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  index 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string; 
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border-green-100 hover:border-green-300">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="bg-green-50 p-3 rounded-full w-fit mb-4">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <a 
              href={link} 
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group"
            >
              Learn more
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const CaseStudies = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4"
          >
            Featured Stories & Insights
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Real Impact, Real Stories
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Discover how businesses are transforming their operations and making a measurable difference.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CaseStudyCard
            icon={<FileText className="h-6 w-6 text-green-600" />}
            title="Case Study: Fortune 500 Carbon-Negative Success"
            description="How a multinational corporation achieved carbon-negative status through innovative supply chain reforms."
            link="#"
            index={1}
          />
          <CaseStudyCard
            icon={<BarChart className="h-6 w-6 text-green-600" />}
            title="Industry Report: Regenerative Supply Chains"
            description="The business case for regenerative practices: ROI analysis and competitive advantages."
            link="#"
            index={2}
          />
          <CaseStudyCard
            icon={<PlayCircle className="h-6 w-6 text-green-600" />}
            title="Watch Now: A New Era of Corporate Sustainability"
            description="Discover how Guardian-IO and The Nature Conservancy are reshaping business norms."
            link="#"
            index={3}
          />
        </div>
      </div>
    </section>
  );
};
