
import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/utopia/HeroSection';
import { CallToAction } from '@/components/CallToAction';
import { Features } from '@/components/Features';
import { Stats } from '@/components/Stats';
import { IssueAreas } from '@/components/IssueAreas';
import { HelloBar } from '@/components/HelloBar';
import { SEOHead } from '@/components/SEOHead';

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
    
    // Improve core web vitals by preloading important pages
    const preloadLinks = [
      '/partner',
      '/about',
      '/contact',
      '/sign-in',
      '/guardian-nature'
    ];
    
    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
  
  return (
    <>
      <SEOHead 
        title="Guardian-IO | Ethical Supply Chain Solutions for Wildlife & Human Rights Protection"
        description="Guardian-IO provides innovative solutions to combat wildlife trafficking and modern slavery through transparent, ethical supply chain management. Join our movement for a regenerative economy."
        keywords={[
          "ethical supply chain management",
          "wildlife trafficking prevention",
          "modern slavery prevention",
          "ESG compliance platform",
          "supply chain transparency",
          "sustainable business practices",
          "responsible sourcing",
          "corporate social responsibility",
          "regenerative economy",
          "business sustainability solutions"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://guardian-io.vercel.app/",
          "name": "Guardian-IO",
          "description": "Guardian-IO provides innovative solutions to combat wildlife trafficking and modern slavery through transparent, ethical supply chain management.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://guardian-io.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <div className="overflow-x-hidden">
        {showHelloBar && <HelloBar />}
        <HeroSection />
        <Stats />
        <Features />
        <IssueAreas />
        <CallToAction />
      </div>
    </>
  );
};

export default Index;
