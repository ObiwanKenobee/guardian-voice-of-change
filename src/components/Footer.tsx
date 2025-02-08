import { Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Shield, Globe, Rocket, Zap, Link2, Brain, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com/guardian-io", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/allguardians_io/", label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/guardian_org", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/guardian-org", label: "LinkedIn" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com/@guardian-io", label: "YouTube" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Guardian-io", label: "GitHub" },
  ];

  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Partner with Us", href: "/partner" },
        { label: "Resources", href: "/resources" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Features", href: "/platform-features" },
        { label: "Innovations", href: "/innovations" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/security" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "GDPR", href: "/gdpr" },
      ],
    },
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: "TURBO-X AI",
      description: "Real-time ESG risk detection and prevention",
    },
    {
      icon: <Link2 className="h-6 w-6 text-blue-400" />,
      title: "Ultra-Link Blockchain",
      description: "Tamper-proof compliance tracking",
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: "Fusion-X Intelligence",
      description: "AI-driven supply chain transparency",
    },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Brand Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-primary mb-4">
            GUARDIAN-IO™ | GLOBAL INC
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Redefining ESG Intelligence with Turbo-AI Compliance, Ultra-Link Blockchain Verification, and Fusion-X Impact Analytics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:bg-accent/5 transition-colors">
              <div className="mb-4">{feature.icon}</div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold">GUARDIAN-IO™</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Because the Future of Sustainability is Now. Lead the ESG Revolution. Stay Transparent. Stay Resilient.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-primary">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GUARDIAN-IO™. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>Global Presence</span>
              <span className="mx-2">•</span>
              <Leaf className="h-4 w-4" />
              <span>Sustainable Future</span>
              <span className="mx-2">•</span>
              <Rocket className="h-4 w-4" />
              <span>Innovation First</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
