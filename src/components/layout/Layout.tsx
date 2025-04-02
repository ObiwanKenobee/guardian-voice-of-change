
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CookieConsent } from '@/components/CookieConsent';
import { HelmetProvider } from 'react-helmet-async';
import { SEOHead } from '@/components/SEOHead';
import { lazy, Suspense } from 'react';

// Define default SEO values based on routes
const getRouteMetadata = (pathname: string) => {
  const baseSEO = {
    title: "Guardian-IO | Protecting Our World's Most Vulnerable",
    description: "Join Guardian-IO in the fight against wildlife trafficking and modern slavery through innovative supply chain solutions.",
    keywords: ["sustainability", "ESG", "supply chain", "compliance", "ethical sourcing"],
  };

  // Add route-specific SEO
  switch (pathname) {
    case '/':
      return {
        ...baseSEO,
        canonicalUrl: '/',
      };
    case '/partner':
      return {
        ...baseSEO,
        title: "Partner with Guardian-IO | Join Our Mission",
        description: "Partner with Guardian-IO to advance sustainability, ethical sourcing, and supply chain transparency. Join our global network.",
        keywords: ["sustainability partnership", "ESG collaboration", "ethical sourcing partners", "supply chain alliance"],
        canonicalUrl: '/partner',
      };
    case '/about':
      return {
        ...baseSEO,
        title: "About Guardian-IO | Our Mission and Values",
        description: "Learn about Guardian-IO's mission to protect vulnerable communities and ecosystems through innovative technology solutions.",
        keywords: ["sustainability mission", "ESG values", "ethical technology", "supply chain innovation"],
        canonicalUrl: '/about',
      };
    case '/contact':
      return {
        ...baseSEO,
        title: "Contact Guardian-IO | Get in Touch",
        description: "Contact the Guardian-IO team for information about our sustainability and supply chain compliance solutions.",
        keywords: ["sustainability contact", "ESG solutions", "supply chain consultation", "compliance help"],
        canonicalUrl: '/contact',
      };
    case '/guardian-nature':
      return {
        ...baseSEO,
        title: "Guardian Nature | Sustainability Partnership",
        description: "Guardian-IO's partnership with The Nature Conservancy creates business-driven paths to environmental regeneration.",
        keywords: ["nature conservation", "sustainability partnership", "environmental regeneration", "corporate conservation"],
        canonicalUrl: '/guardian-nature',
        ogType: "article",
      };
    default:
      if (pathname.includes('workspace')) {
        return {
          ...baseSEO,
          title: "Guardian-IO Workspace | Sustainability Management Platform",
          description: "Access Guardian-IO's comprehensive sustainability management platform for ESG reporting, compliance, and supply chain transparency.",
          keywords: ["sustainability platform", "ESG management", "compliance dashboard", "supply chain analytics"],
          canonicalUrl: '/workspace',
        };
      }
      return baseSEO;
  }
};

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/sign-in' || 
                     location.pathname === '/sign-up' || 
                     location.pathname === '/partner' ||
                     location.pathname === '/guardian-nature';
  
  const seoMetadata = getRouteMetadata(location.pathname);

  return (
    <HelmetProvider>
      <SEOHead {...seoMetadata} />
      <div className="min-h-screen flex flex-col bg-background">
        {/* Decorative elements for the utopian design */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Top right decorative circle */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          
          {/* Bottom left decorative circle */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-screen relative z-10"
        >
          {!isAuthPage && <Navbar />}
          <main className="flex-grow">
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Outlet />
            </Suspense>
          </main>
          {!isAuthPage && <Footer />}
          <CookieConsent />
        </motion.div>
      </div>
    </HelmetProvider>
  );
};

export default Layout;
