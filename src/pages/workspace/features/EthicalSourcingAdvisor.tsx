import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Scale, AlertTriangle, BarChart3, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Guidance Tools",
    description: "Access expert recommendations on labor rights, human rights due diligence, and anti-forced labor strategies.",
    icon: Shield,
  },
  {
    title: "Supplier Matchmaking",
    description: "Connect with ethical suppliers and verify certifications for compliance with confidence.",
    icon: Users,
  },
  {
    title: "Legal Alerts",
    description: "Stay ahead of regulations like the Modern Slavery Act with real-time updates and actionable insights.",
    icon: AlertTriangle,
  },
];

const applications = [
  {
    title: "Blockchain Verification",
    description: "Ensure traceability and verify the ethical credentials of every product component with blockchain technology.",
    icon: Scale,
  },
  {
    title: "Automated Supplier Scorecards",
    description: "Evaluate suppliers' ESG performance at a glance with AI-generated scorecards.",
    icon: BarChart3,
  },
];

const testimonials = [
  {
    quote: "Guardian-IO's Ethical Sourcing Advisor transformed our supply chain. We now source responsibly and comply effortlessly.",
    author: "Jane Doe",
    role: "Head of Supply Chain",
    company: "XYZ Corp",
  },
  {
    quote: "The AI-powered recommendations have helped us identify and mitigate risks we didn't even know existed.",
    author: "John Smith",
    role: "Sustainability Director",
    company: "ABC Industries",
  },
];

const EthicalSourcingAdvisor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Dashboard Button */}
      <Button
        variant="ghost"
        className="m-4"
        onClick={() => navigate("/workspace/dashboard")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Transform Sourcing with Intelligence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Empowering businesses to source responsibly, comply with regulations, and build trust across supply chains.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-primary">
              Start Your Ethical Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Request a Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Applications Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Innovative Applications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <app.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{app.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{app.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Impact Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Drive Impact with Ethical Sourcing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">70%</CardTitle>
                <CardDescription>of consumers prefer ethically sourced products</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">20%</CardTitle>
                <CardDescription>higher profitability for businesses with strong ESG practices</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Build trust with stakeholders", "Strengthen compliance", "Reduce reputational risks"].map((benefit, index) => (
              <div key={benefit} className="flex items-center justify-center p-4">
                <Check className="text-primary mr-2" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardDescription className="text-lg italic">"{testimonial.quote}"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Your Ethical Supply Chain Starts Here</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Request a Live Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EthicalSourcingAdvisor;