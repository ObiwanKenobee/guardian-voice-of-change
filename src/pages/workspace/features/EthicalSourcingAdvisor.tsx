import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EthicalSourcingAdvisor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Dashboard Button */}
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          onClick={() => navigate("/workspace/dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Transform Sourcing with Intelligence: Ethical Sourcing Advisor AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Empowering businesses to source responsibly, comply with regulations, and build trust across supply chains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary">
              Start Your Ethical Journey
            </Button>
            <Button size="lg" variant="outline">
              Request a Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Guidance Tools",
                description: "Access expert recommendations on labor rights, human rights due diligence, and anti-forced labor strategies.",
              },
              {
                title: "Supplier Matchmaking",
                description: "Connect with ethical suppliers and verify certifications for compliance with confidence.",
              },
              {
                title: "Legal Alerts",
                description: "Stay ahead of regulations like the Modern Slavery Act with real-time updates and actionable insights.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Experience the Platform</h2>
          <div className="bg-card border rounded-lg p-8 shadow-lg">
            <p className="text-lg text-muted-foreground mb-8">
              Experience the power of ethical sourcing with intuitive tools and actionable insights.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Supplier Recommendations</h3>
                <p className="text-muted-foreground">AI-powered supplier matching based on your ethical criteria.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Compliance Tracking</h3>
                <p className="text-muted-foreground">Real-time monitoring of supplier compliance and certifications.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Your Ethical Supply Chain Starts Here</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary">
              Start Your Free Trial
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