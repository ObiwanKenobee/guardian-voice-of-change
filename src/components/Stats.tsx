
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from 'react-countup';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BadgeAlert, LineChart, Globe } from "lucide-react";

export const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="py-12 sm:py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">
            92% of global supply chains lack full transparency—Guardian-IO is here to change that.
          </h2>
        </div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Global Ethical Supply Chain Score */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {inView && <CountUp end={87} duration={2} suffix="%" />}
              </div>
              <div className="text-sm text-muted-foreground">
                Global Ethical Supply Chain Score
              </div>
            </CardContent>
          </Card>

          {/* Guardian-IO Impact Counter */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors">
            <CardContent className="p-6">
              <Globe className="h-8 w-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {inView && <CountUp end={2456} duration={2.5} separator="," />}
              </div>
              <div className="text-sm text-muted-foreground">
                Ethical Businesses Verified
              </div>
            </CardContent>
          </Card>

          {/* ESG & Compliance Readiness */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors">
            <CardContent className="p-6">
              <BadgeAlert className="h-8 w-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {inView && <CountUp end={80} duration={2} suffix="%" />}
              </div>
              <div className="text-sm text-muted-foreground">
                Businesses Facing New ESG Laws by 2030
              </div>
            </CardContent>
          </Card>

          {/* Supply Chain Risk Index */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors">
            <CardContent className="p-6">
              <LineChart className="h-8 w-8 text-primary mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {inView && <CountUp end={24} duration={2} />}
              </div>
              <div className="text-sm text-muted-foreground">
                High-Risk Regions Monitored
              </div>
            </CardContent>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform continuously monitors global supply chains,
            identifying risks and ensuring compliance with international standards.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
