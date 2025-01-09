import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { IssueAreas } from "@/components/IssueAreas";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <IssueAreas />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Index;