import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { IssueAreas } from "@/components/IssueAreas";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <IssueAreas />
    </div>
  );
};

export default Index;