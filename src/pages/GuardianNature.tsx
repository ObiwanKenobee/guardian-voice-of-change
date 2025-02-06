
import { BackButton } from "@/components/navigation/BackButton";
import { Hero } from "@/components/guardian-nature/Hero";
import { Features } from "@/components/guardian-nature/Features";
import { Metrics } from "@/components/guardian-nature/Metrics";
import { CaseStudies } from "@/components/guardian-nature/CaseStudies";
import { Footer } from "@/components/guardian-nature/Footer";

const GuardianNature = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2] to-[#D3E4FD]">
      <BackButton />
      <Hero />
      <Features />
      <Metrics />
      <CaseStudies />
      <Footer />
    </div>
  );
};

export default GuardianNature;
