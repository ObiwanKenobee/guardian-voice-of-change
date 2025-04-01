
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <SEOHead 
        title="Contact Guardian-IO | Get Support for Ethical Supply Chain Management"
        description="Contact Guardian-IO's team for information about our sustainability solutions, ethical sourcing tools, and supply chain compliance platform."
        keywords={[
          "contact sustainability experts",
          "ethical supply chain solutions",
          "ESG platform support",
          "corporate sustainability consultation",
          "supply chain compliance help",
          "responsible sourcing tools",
          "sustainability software support"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Guardian-IO Contact Page",
          "description": "Contact Guardian-IO for information about our sustainability and supply chain compliance solutions.",
          "url": "https://guardian-io.vercel.app/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Guardian-IO",
            "email": "contact@guardian-io.com",
            "telephone": "+1-555-123-4567",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Sustainability Lane",
              "addressLocality": "Eco City",
              "addressRegion": "EC",
              "postalCode": "12345",
              "addressCountry": "US"
            }
          }
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions about our ethical supply chain solutions? Our team is here to help.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              variants={fadeIn} 
              className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30"
            >
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-2">Mon-Fri, 9am-5pm EST</p>
              <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a>
            </motion.div>

            <motion.div 
              variants={fadeIn} 
              className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30"
            >
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">We'll respond within 24hrs</p>
              <a href="mailto:contact@guardian-io.com" className="text-primary hover:underline">contact@guardian-io.com</a>
            </motion.div>

            <motion.div 
              variants={fadeIn} 
              className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30"
            >
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-2">123 Sustainability Lane</p>
              <p className="text-primary">Eco City, EC 12345</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              variants={fadeIn} 
              className="bg-muted/30 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="Your email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    Company
                  </label>
                  <Input 
                    id="company" 
                    name="company"
                    placeholder="Your company" 
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="subject" 
                    name="subject"
                    placeholder="Message subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full gap-2 group"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
            
            <motion.div variants={fadeIn} className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "How can Guardian-IO help with ESG compliance?",
                      a: "Our platform provides comprehensive tools for monitoring, reporting, and improving your ESG performance across your entire supply chain."
                    },
                    {
                      q: "Do you offer custom solutions?",
                      a: "Yes, we can tailor our platform to your specific industry requirements and compliance needs. Contact us for details."
                    },
                    {
                      q: "How long does implementation take?",
                      a: "Typical implementation takes 2-4 weeks depending on the complexity of your supply chain and integration requirements."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-muted-foreground/20 pb-4">
                      <h3 className="font-medium mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-4 p-0 gap-2 group">
                  <span>View all FAQs</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Business Hours</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Monday - Friday: 9:00 AM - 5:00 PM EST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Saturday - Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
