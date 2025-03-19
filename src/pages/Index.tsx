
import { HeroSection } from '@/components/utopia/HeroSection';
import { CallToAction } from '@/components/CallToAction';
import { Features } from '@/components/Features';
import { Stats } from '@/components/Stats';
import { IssueAreas } from '@/components/IssueAreas';

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <Stats />
      <Features />
      <IssueAreas />
      <CallToAction />
    </div>
  );
};

export default Index;
