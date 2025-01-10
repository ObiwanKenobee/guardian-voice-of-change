import { motion } from "framer-motion";
import { ArrowLeft, Globe, Database, Shield, Eye, Zap, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Database className="h-8 w-8" />,
    title: "Data Aggregation",
    description: "Pull data from suppliers, transport systems, and third-party audits seamlessly into one platform."
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Risk Mapping",
    description: "Identify high-risk regions or suppliers for human rights violations or environmental harm with interactive maps."
  },
  {
    icon: <Eye className="h-8 w-8" />,
    title: "Dynamic Monitoring",
    description: "Track compliance metrics in real-time, ensuring adherence to labor rights and anti-forced labor laws."
  }
];

const innovations = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Predictive Analytics",
    description: "Forecast potential disruptions due to geopolitical or economic factors, keeping your operations proactive."
  },
  {
    icon: <Radio className="h-8 w-8" />,
    title: "IoT Integration",
    description: "Enable live shipment tracking and compliance validation with IoT-powered monitoring."
  }
];

const testimonials = [
  {
    quote: "This AI-powered solution has transformed how we manage our supply chain risks.",
    author: "Sarah Chen",
    role: "Supply Chain Director",
    company: "Global Logistics Co."
  },
  {
    quote: "The real-time monitoring capabilities have helped us maintain ethical standards across our operations.",
    author: "Michael Rodriguez",
    role: "Compliance Officer",
    company: "Ethical Trade Inc."
  }
];

const SupplyChainTransparency = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-8">
      {/* Back to Dashboard */}
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/workspace/dashboard")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold tracking-tight gradient-text">
          Real-Time Supply Chain Transparency at Your Fingertips
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering ethical practices, reducing risks, and improving decision-making with cutting-edge AI.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">
            Learn More
          </Button>
          <Button size="lg" variant="outline">
            Request a Demo
          </Button>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
      </section>

      {/* Innovative Applications Section */}
      <section className="py-12 bg-primary/5 rounded-lg">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Innovative Applications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {innovations.map((innovation, index) => (
              <motion.div
                key={innovation.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex items-start space-x-4"
              >
                <div className="text-primary mt-1">{innovation.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{innovation.title}</h3>
                  <p className="text-muted-foreground">{innovation.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Dashboard Preview */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Dashboard Preview</h2>
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Dashboard Preview Placeholder</p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button size="lg">See How It Works</Button>
            <Button size="lg" variant="outline">Schedule a Walkthrough</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <p className="text-lg italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 bg-primary/5 rounded-lg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Your Supply Chain?</h2>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              Talk to Our Experts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupplyChainTransparency;