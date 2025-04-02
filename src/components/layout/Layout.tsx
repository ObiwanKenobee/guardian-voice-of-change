
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CookieConsent } from '@/components/CookieConsent';
import { SEOHead, SEOProps } from '@/components/SEOHead';
import { lazy, Suspense } from 'react';
import { SocialShareBar } from '@/components/social/SocialShareBar';

// Define default SEO values based on routes
const getRouteMetadata = (pathname: string): SEOProps => {
  const baseUrl = "https://guardian-io.vercel.app";
  const currentDate = new Date().toISOString();
  
  const baseSEO: SEOProps = {
    title: "Guardian-IO | Protecting Our World's Most Vulnerable",
    description: "Join Guardian-IO in the fight against wildlife trafficking and modern slavery through innovative supply chain solutions.",
    keywords: ["sustainability", "ESG", "supply chain", "compliance", "ethical sourcing", "supply chain transparency", "wildlife protection"],
    ogType: "website",
    publishedTime: currentDate,
    modifiedTime: currentDate,
    author: "Guardian-IO Team"
  };

  // Add route-specific SEO
  switch (pathname) {
    case '/':
      return {
        ...baseSEO,
        canonicalUrl: '/',
        ogImage: "/images/home-og-image.png",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": baseUrl,
          "name": "Guardian-IO",
          "description": "Guardian-IO provides innovative solutions to combat wildlife trafficking and modern slavery through transparent, ethical supply chain management.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      };
    case '/partner':
      return {
        ...baseSEO,
        title: "Partner with Guardian-IO | Join Our Mission",
        description: "Partner with Guardian-IO to advance sustainability, ethical sourcing, and supply chain transparency. Join our global network of change-makers.",
        keywords: ["sustainability partnership", "ESG collaboration", "ethical sourcing partners", "supply chain alliance", "sustainability collaboration"],
        canonicalUrl: '/partner',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Guardian-IO Partnership Program",
          "provider": {
            "@type": "Organization",
            "name": "Guardian-IO"
          },
          "description": "Join our network of partners committed to transparent and ethical supply chains that protect wildlife and vulnerable communities.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
      };
    case '/about':
      return {
        ...baseSEO,
        title: "About Guardian-IO | Our Mission and Values",
        description: "Learn about Guardian-IO's mission to protect vulnerable communities and ecosystems through innovative technology solutions for ethical supply chains.",
        keywords: ["sustainability mission", "ESG values", "ethical technology", "supply chain innovation", "wildlife protection mission"],
        canonicalUrl: '/about',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Guardian-IO",
            "description": "Guardian-IO is dedicated to creating technology solutions that protect vulnerable communities and wildlife through transparent supply chains.",
            "foundingDate": "2020",
            "founders": [
              {
                "@type": "Person",
                "name": "Guardian-IO Founding Team"
              }
            ]
          }
        }
      };
    case '/contact':
      return {
        ...baseSEO,
        title: "Contact Guardian-IO | Get in Touch",
        description: "Contact the Guardian-IO team for information about our sustainability and supply chain compliance solutions for wildlife and human rights protection.",
        keywords: ["sustainability contact", "ESG solutions", "supply chain consultation", "compliance help", "ethical sourcing assistance"],
        canonicalUrl: '/contact',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Guardian-IO",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-555-5555",
              "contactType": "customer service",
              "email": "contact@guardian-io.com",
              "availableLanguage": ["English"]
            }
          }
        }
      };
    case '/guardian-nature':
      return {
        ...baseSEO,
        title: "Guardian Nature | Sustainability Partnership",
        description: "Guardian-IO's partnership with The Nature Conservancy creates business-driven paths to environmental regeneration and wildlife protection globally.",
        keywords: ["nature conservation", "sustainability partnership", "environmental regeneration", "corporate conservation", "wildlife protection"],
        canonicalUrl: '/guardian-nature',
        ogType: "article",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Guardian-IO Partners with The Nature Conservancy",
          "image": `${baseUrl}/images/guardian-nature-feature.jpg`,
          "publisher": {
            "@type": "Organization",
            "name": "Guardian-IO",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": "2023-01-15",
          "dateModified": currentDate
        }
      };
    default:
      if (pathname.includes('workspace')) {
        return {
          ...baseSEO,
          title: "Guardian-IO Workspace | Sustainability Management Platform",
          description: "Access Guardian-IO's comprehensive sustainability management platform for ESG reporting, compliance, and supply chain transparency for wildlife and human protection.",
          keywords: ["sustainability platform", "ESG management", "compliance dashboard", "supply chain analytics", "wildlife tracking", "ethical sourcing platform"],
          canonicalUrl: '/workspace',
          structuredData: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Guardian-IO Workspace",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Comprehensive sustainability management platform for ethical supply chains and wildlife protection."
          }
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
  const showShareBar = !location.pathname.includes('/workspace') && 
                       location.pathname !== '/sign-in' && 
                       location.pathname !== '/sign-up';

  return (
    <>
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
          {showShareBar && <SocialShareBar />}
          {!isAuthPage && <Footer />}
          <CookieConsent />
        </motion.div>
      </div>
    </>
  );
};

export default Layout;
