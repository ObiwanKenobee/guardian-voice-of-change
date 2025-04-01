
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Shield, Users, Globe, ArrowRight, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/SEOHead';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <SEOHead 
        title="About Guardian-IO | Our Mission & Approach to Ethical Supply Chains"
        description="Guardian-IO is dedicated to building transparent, ethical supply chains through innovative technology. Learn about our mission, values, and impact."
        keywords={[
          "ethical supply chain management",
          "ESG compliance platform",
          "supply chain transparency",
          "wildlife trafficking prevention",
          "modern slavery prevention",
          "sustainable business practices",
          "responsible sourcing",
          "corporate social responsibility"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Guardian-IO",
          "url": "https://guardian-io.vercel.app/about",
          "logo": "https://guardian-io.vercel.app/logo.png",
          "foundingDate": "2020",
          "founders": [
            {
              "@type": "Person",
              "name": "Guardian-IO Leadership Team"
            }
          ],
          "description": "Guardian-IO is a leading provider of ethical supply chain management solutions, helping organizations prevent wildlife trafficking and modern slavery.",
          "mission": "To protect the world's most vulnerable communities and ecosystems through innovative supply chain solutions.",
          "areaServed": "Worldwide"
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Our Mission to Protect the Vulnerable
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              At Guardian-IO, we're dedicated to creating a world where supply chains 
              are transparent, ethical, and sustainable. We combine cutting-edge technology 
              with deep expertise to combat wildlife trafficking and modern slavery.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 group">
                <Shield className="h-5 w-5" />
                <span>Our Approach</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                <span>Meet Our Team</span>
              </Button>
            </div>
          </motion.div>
        </section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Protection",
                description: "We work tirelessly to protect vulnerable communities and ecosystems from exploitation and harm."
              },
              {
                icon: <Globe className="h-8 w-8 text-blue-500" />,
                title: "Transparency",
                description: "We believe in complete visibility throughout supply chains to ensure ethical practices at every step."
              },
              {
                icon: <Leaf className="h-8 w-8 text-green-500" />,
                title: "Sustainability",
                description: "We're committed to building solutions that support both environmental and social sustainability."
              }
            ].map((value, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full border-t-4 border-t-primary/70 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16 bg-muted/30 rounded-2xl p-8"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-lg mb-4 leading-relaxed">
              Guardian-IO was founded in 2020 by a team of supply chain experts, conservation 
              specialists, and technology innovators who shared a vision: to leverage technology 
              to protect the world's most vulnerable.
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              We recognized that despite global efforts, wildlife trafficking and modern slavery 
              continue to thrive in opaque supply chains. We set out to change that by building 
              tools that bring unprecedented transparency and accountability.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we work with organizations across the globe, from multinational corporations 
              to NGOs, helping them ensure their supply chains are ethical, compliant, and sustainable.
            </p>
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8 text-amber-500" />,
                title: "150+ Countries",
                description: "Our solutions are deployed across more than 150 countries, helping organizations worldwide maintain ethical supply chains."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
                title: "Industry Leadership",
                description: "We're recognized as thought leaders in ethical supply chain management, regularly contributing to global standards and practices."
              }
            ].map((impact, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="mb-4">{impact.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{impact.title}</h3>
                    <p className="text-muted-foreground">{impact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Join Our Mission</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Whether you're looking to ensure compliance, enhance sustainability, or make a 
            positive impact, we're here to help you build ethical supply chains.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/partner">Become a Partner</Link>
            </Button>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default About;
