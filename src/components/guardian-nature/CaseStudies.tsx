
import { motion } from "framer-motion";
import { BarChart3, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const CaseStudies = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Success Stories</h2>
          <p className="text-muted-foreground text-lg">
            Discover how leading companies are making a difference with Guardian-IO and The Nature Conservancy.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Retail Leader</h3>
                <p className="text-muted-foreground">Reduced carbon footprint by 40% through AI-optimized logistics</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <BarChart3 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Manufacturing Pioneer</h3>
                <p className="text-muted-foreground">Achieved 100% traceable and sustainable raw materials sourcing</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
