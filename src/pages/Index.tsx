
import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/utopia/HeroSection';
import { CallToAction } from '@/components/CallToAction';
import { Features } from '@/components/Features';
import { Stats } from '@/components/Stats';
import { IssueAreas } from '@/components/IssueAreas';
import { HelloBar } from '@/components/HelloBar';

const Index = () => {
  const [showHelloBar, setShowHelloBar] = useState(false);
  
  useEffect(() => {
    // Only show the HelloBar on initial page load
    // We can use sessionStorage to track if they've seen it in this session
    const hasVisitedBefore = sessionStorage.getItem('visited_landing_page');
    
    if (!hasVisitedBefore) {
      setShowHelloBar(true);
      sessionStorage.setItem('visited_landing_page', 'true');
    }
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      {showHelloBar && <HelloBar />}
      <HeroSection />
      <Stats />
      <Features />
      <IssueAreas />
      <CallToAction />
    </div>
  );
};

export default Index;
