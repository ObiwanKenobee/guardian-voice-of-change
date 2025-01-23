import { motion } from "framer-motion";
import { Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TagProps {
  icon: React.ReactNode;
  text: string;
  stat: string;
}

const FloatingTag = ({ icon, text, stat }: TagProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative cursor-pointer"
  >
    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/20">
      {icon}
      <span className="text-sm font-medium text-white">{text}</span>
    </div>
    <div className="absolute -top-12 left-1/2 hidden -translate-x-1/2 transform rounded-lg bg-black/80 p-2 text-xs text-white group-hover:block">
      {stat}
    </div>
  </motion.div>
);

export const DynamicHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Background with gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/70 to-accent/80" />
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10" />
      
      {/* Content container */}
      <div className="container relative mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Revolutionizing Supply Chain Ethics.{" "}
              <span className="text-secondary">Globally. Seamlessly.</span>
            </h1>
            <p className="text-lg text-white/90 md:text-xl">
              Empower your enterprise with Guardian-IO: Blockchain transparency,
              real-time ESG compliance, and predictive analytics tailored for your
              success.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-secondary text-white hover:bg-secondary/90"
                onClick={() => navigate("/platform-features")}
              >
                Explore Solutions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/partner")}
              >
                View Pricing
              </Button>
            </div>
          </motion.div>

          {/* Visual elements */}
          <div className="relative flex items-center justify-center">
            {/* Globe visualization placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-64 w-64 rounded-full bg-white/10 backdrop-blur-sm"
            >
              <Globe className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform text-white" />
            </motion.div>

            {/* Floating tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0"
            >
              <FloatingTag
                icon={<Shield className="h-4 w-4 text-secondary" />}
                text="Real-Time ESG Compliance"
                stat="99.99% uptime SLA"
              />
              <FloatingTag
                icon={<Zap className="h-4 w-4 text-secondary" />}
                text="AI-Powered Insights"
                stat="Processing 1M+ transactions daily"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};