
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Shield, Globe, Rocket, Zap, Link2, Brain, Leaf, Sprout, Heart, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { navigationData, platformFeatures, innovations } from "./navigation/navigationData";
import { Button } from "./ui/button";

export const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com/guardian-io", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/guardian.io.inc/", label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/Guardian_org", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/guardian-org", label: "LinkedIn" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com/@guardian-io", label: "YouTube" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Guardian-io", label: "GitHub" },
  ];

  const contactInfo = [
    { icon: <MapPin className="h-5 w-5" />, label: "123 Innovation Way, San Francisco, CA 94105" },
    { icon: <Phone className="h-5 w-5" />, label: "+1 (800) 555-GUARD" },
    { icon: <Mail className="h-5 w-5" />, label: "contact@guardian-io.com" },
  ];

  const companyValues = [
    {
      icon: <Sprout className="h-6 w-6 text-green-500" />,
      title: "Regenerative AI",
      description: "Fostering positive impact across global supply chains",
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-500" />,
      title: "Community Empowerment",
      description: "Building thriving, interconnected communities",
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      title: "Universal Harmony",
      description: "Creating bridges of understanding worldwide",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-50 to-blue-50 border-t border-green-100">
      {/* Main mega footer with grid layout */}
      <div className="container mx-auto px-4 py-16">
        {/* Top section with brand and subscribe */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12 pb-12 border-b">
          {/* Brand column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                GUARDIAN-IO™
              </span>
            </div>
            <p className="text-muted-foreground">
              Pioneering ethical supply chains with AI-powered transparency solutions. 
              Guardian-IO™ transforms how businesses implement ESG practices.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="text-primary">{item.icon}</div>
                  <span className="text-muted-foreground">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter signup */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest updates on ethical sourcing and supply chain sustainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Middle section with features and platform navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b">
          {/* Platform features */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Platform Features</h3>
            <ul className="space-y-3">
              {platformFeatures.map((feature) => (
                <li key={feature.title}>
                  <Link 
                    to="/platform-features" 
                    className="group flex items-start gap-2 hover:text-primary transition-colors"
                  >
                    <div className="text-primary mt-0.5">{feature.icon}</div>
                    <div>
                      <span className="font-medium group-hover:underline">{feature.title}</span>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Innovations */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Innovations</h3>
            <ul className="space-y-3">
              {innovations.map((innovation) => (
                <li key={innovation.title}>
                  <Link 
                    to="/innovations" 
                    className="group flex flex-col hover:text-primary transition-colors"
                  >
                    <span className="font-medium group-hover:underline">{innovation.title}</span>
                    <p className="text-xs text-muted-foreground">{innovation.description}</p>
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/innovations" 
                  className="group flex flex-col hover:text-primary transition-colors"
                >
                  <span className="font-medium group-hover:underline">TURBO-X AI Platform</span>
                  <p className="text-xs text-muted-foreground">Advanced AI-powered risk detection system</p>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Navigation from navigationData */}
          {navigationData.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link 
                      to={item.href} 
                      className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Third section with values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {companyValues.map((value) => (
            <div key={value.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-white/50 hover:bg-white/60 transition-colors border border-green-100">
              <div className="mb-4">{value.icon}</div>
              <h4 className="font-semibold mb-2 text-gray-800">{value.title}</h4>
              <p className="text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GUARDIAN-IO™. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookies</Link>
              <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-primary">Sitemap</Link>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Leaf className="h-4 w-4" />
              <span>Carbon Neutral</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
