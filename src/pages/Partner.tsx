
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BenefitsSection } from "@/components/partner/BenefitsSection";
import { PartnerApplicationForm } from "@/components/partner/PartnerApplicationForm";

const Partner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x flex flex-col">
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
        <div className="max-w-md w-full space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-center mb-4">Become a Partner</h1>
          <BenefitsSection />
          <PartnerApplicationForm />
        </div>
      </div>
    </div>
  );
};

export default Partner;
