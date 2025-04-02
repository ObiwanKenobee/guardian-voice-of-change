
import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/utopia/HeroSection';
import { CallToAction } from '@/components/CallToAction';
import { Features } from '@/components/Features';
import { Stats } from '@/components/Stats';
import { IssueAreas } from '@/components/IssueAreas';
import { HelloBar } from '@/components/HelloBar';
import { SEOHead } from '@/components/SEOHead';
import { ReferralProgram } from '@/components/growth/ReferralProgram';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViralContent } from '@/components/growth/ViralContent';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [showHelloBar, setShowHelloBar] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  // Track referrals
  useEffect(() => {
    // Parse query parameters to check for referral
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get('ref');
    
    if (referralCode) {
      // Store referral code in localStorage
      localStorage.setItem('referralCode', referralCode);
      
      // Show a thank you toast
      toast({
        title: "Welcome via referral!",
        description: `You were invited with code: ${referralCode}`,
      });
      
      // Clear the URL without reloading the page
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location.search, toast]);
  
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
    
    // Add structured data for the organization to improve SEO
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Guardian-IO",
      "url": "https://guardian-io.vercel.app/",
      "logo": "https://guardian-io.vercel.app/logo.png",
      "sameAs": [
        "https://twitter.com/guardianio",
        "https://linkedin.com/company/guardianio",
        "https://facebook.com/company/guardianio"
      ],
      "description": "Guardian-IO provides innovative solutions to combat wildlife trafficking and modern slavery through transparent, ethical supply chain management.",
      "foundingDate": "2020",
      "founders": [{
        "@type": "Person",
        "name": "Guardian-IO Founding Team"
      }]
    });
    
    document.head.appendChild(scriptElement);
    
    return () => {
      document.head.removeChild(scriptElement);
    };
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
        alternateLanguages={[
          { locale: "en", url: "https://guardian-io.vercel.app/" },
          { locale: "es", url: "https://guardian-io.vercel.app/es/" },
          { locale: "fr", url: "https://guardian-io.vercel.app/fr/" }
        ]}
      />
      <div className="overflow-x-hidden">
        {showHelloBar && <HelloBar />}
        <HeroSection />
        <Stats />
        <Features />
        <IssueAreas />
        
        <section className="py-16 px-4 bg-gradient-to-b from-transparent to-primary/5">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-8">Join Our Community</h2>
            
            <Tabs defaultValue="referral" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 max-w-md mx-auto">
                <TabsTrigger value="referral">Referral Program</TabsTrigger>
                <TabsTrigger value="content">Trending Content</TabsTrigger>
              </TabsList>
              
              <TabsContent value="referral">
                <ReferralProgram />
              </TabsContent>
              
              <TabsContent value="content">
                <ViralContent />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <CallToAction />
      </div>
    </>
  );
};

export default Index;
