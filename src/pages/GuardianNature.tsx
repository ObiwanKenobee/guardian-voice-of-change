
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Globe, Shield, BarChart3, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI-Powered ESG Compliance",
    description: "Track environmental & ethical risks in supply chains with advanced AI monitoring."
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Sustainable Sourcing Insights",
    description: "Real-time data on deforestation, carbon footprint, & biodiversity impact."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Blockchain-Powered Transparency",
    description: "Immutable verification for eco-friendly & fair labor practices."
  }
];

const metrics = [
  { value: "2.5M", label: "Tons of Carbon Reduced" },
  { value: "500K", label: "Acres of Forest Protected" },
  { value: "1000+", label: "Ethical Trade Partnerships" }
];

const GuardianNature = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/90" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-text">
              Protecting People & Planet: Ethical Supply Chains for a Sustainable Future
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Guardian-IO and The Nature Conservancy in revolutionizing supply chain sustainability through AI-driven transparency and ecological impact tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate('/sign-up')}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/contact')}
              >
                Request Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How We Help
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Live Impact Metrics
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <p className="text-muted-foreground text-lg">
              Discover how leading companies are making a difference with Guardian-IO and The Nature Conservancy.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Case Study Cards */}
              <Card>
                <CardContent className="p-6">
                  <Globe className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Global Retail Leader</h3>
                  <p className="text-muted-foreground">Reduced carbon footprint by 40% through AI-optimized logistics</p>
                </CardContent>
              </Card>
              <Card>
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

      {/* Final CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-bold">
              Join the Future of Ethical & Sustainable Supply Chains
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform your supply chain with Guardian-IO's AI-powered sustainability solutions.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/sign-up')}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GuardianNature;
