
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BenefitsSection } from "@/components/partner/BenefitsSection";
import { PartnerApplicationForm } from "@/components/partner/PartnerApplicationForm";

const Partner = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <BenefitsSection />
          <PartnerApplicationForm />
        </div>
      </div>
    </div>
  );
};

export default Partner;
