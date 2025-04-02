
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BenefitsSection } from "@/components/partner/BenefitsSection";
import { PartnerApplicationForm } from "@/components/partner/PartnerApplicationForm";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";

const Partner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x flex flex-col">
      <SEOHead 
        title="Partner With Guardian-IO | Join Our Global Sustainability Alliance"
        description="Join our network of forward-thinking organizations committed to creating transparent, ethical supply chains that protect vulnerable ecosystems and communities."
        keywords={[
          "sustainability partnership",
          "ESG collaboration",
          "ethical supply chain alliance",
          "corporate sustainability network",
          "environmental business partners",
          "social impact collaboration",
          "supply chain transparency partners",
          "wildlife conservation business network",
          "human rights business coalition",
          "regenerative business alliance"
        ]}
        ogType="website"
      />
      
      <div className="container mx-auto px-4">
        <Link 
          to="/" 
          className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-center mb-4 utopia-gradient-text">Co-Create a Harmonious Future</h1>
          <p className="text-center text-muted-foreground mb-6">
            Join our alliance of visionaries who are redefining the relationship between business and nature. Together, we're building supply chains that heal rather than harm.
          </p>
          <BenefitsSection />
          <PartnerApplicationForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Partner;
