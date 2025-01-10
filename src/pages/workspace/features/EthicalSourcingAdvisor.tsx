import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EthicalSourcingAdvisor = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back to Dashboard Button */}
      <Link to="/workspace/dashboard">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">
          Transform Sourcing with Intelligence: Ethical Sourcing Advisor AI
        </h1>
        <p className="text-xl text-muted-foreground">
          Empowering businesses to source responsibly, comply with regulations, and build trust across supply chains.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Start Your Ethical Journey</Button>
          <Button size="lg" variant="outline">Request a Demo</Button>
        </div>
      </motion.div>

      {/* Key Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
      >
        {[
          {
            title: "Guidance Tools",
            description: "Access expert recommendations on labor rights, human rights due diligence, and anti-forced labor strategies."
          },
          {
            title: "Supplier Matchmaking",
            description: "Connect with ethical suppliers and verify certifications for compliance with confidence."
          },
          {
            title: "Legal Alerts",
            description: "Stay ahead of regulations like the Modern Slavery Act with real-time updates and actionable insights."
          }
        ].map((feature, index) => (
          <div key={index} className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Innovative Applications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-8 items-center py-12"
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Cutting-Edge AI Applications</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
              <h3 className="text-xl font-semibold mb-2">Blockchain Verification</h3>
              <p className="text-muted-foreground">
                Ensure traceability and verify the ethical credentials of every product component with blockchain technology.
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
              <h3 className="text-xl font-semibold mb-2">Automated Supplier Scorecards</h3>
              <p className="text-muted-foreground">
                Evaluate suppliers' ESG performance at a glance with AI-generated scorecards.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 aspect-square flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold">Interactive Demo</p>
            <p className="text-muted-foreground">Coming Soon</p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center py-12 space-y-6"
      >
        <h2 className="text-3xl font-bold">Your Ethical Supply Chain Starts Here</h2>
        <p className="text-xl text-muted-foreground">
          Join the growing community of businesses committed to ethical sourcing
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Start Your Free Trial</Button>
          <Button size="lg" variant="outline">Request a Live Demo</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EthicalSourcingAdvisor;