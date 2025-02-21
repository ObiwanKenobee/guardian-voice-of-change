
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from 'react-countup';
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Heart, Globe2, Leaf } from "lucide-react";

export const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Together, we're creating a world where every supply chain nurtures both people and planet.
          </h2>
        </div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Regenerative Impact */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors border-green-100">
            <CardContent className="p-6">
              <Sprout className="h-8 w-8 text-green-600 mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">
                {inView && <CountUp end={87} duration={2} suffix="%" />}
              </div>
              <div className="text-sm text-gray-600">
                Supply Chains Contributing to Regeneration
              </div>
            </CardContent>
          </Card>

          {/* Community Wellbeing */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors border-pink-100">
            <CardContent className="p-6">
              <Heart className="h-8 w-8 text-pink-600 mb-4" />
              <div className="text-3xl font-bold text-pink-600 mb-2">
                {inView && <CountUp end={3.2} duration={2.5} decimals={1} suffix="M" />}
              </div>
              <div className="text-sm text-gray-600">
                Lives Enhanced Through Fair Trade
              </div>
            </CardContent>
          </Card>

          {/* Global Harmony */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors border-blue-100">
            <CardContent className="p-6">
              <Globe2 className="h-8 w-8 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {inView && <CountUp end={150} duration={2} suffix="+" />}
              </div>
              <div className="text-sm text-gray-600">
                Nations United in Ethical Trade
              </div>
            </CardContent>
          </Card>

          {/* Environmental Restoration */}
          <Card className="bg-white/50 backdrop-blur hover:bg-white/60 transition-colors border-emerald-100">
            <CardContent className="p-6">
              <Leaf className="h-8 w-8 text-emerald-600 mb-4" />
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {inView && <CountUp end={12} duration={2} suffix="M" />}
              </div>
              <div className="text-sm text-gray-600">
                Hectares of Land Restored
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
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Our platform empowers organizations to create positive impact at scale,
            fostering a world where business becomes a force for universal good.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
