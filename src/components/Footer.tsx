import { Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Zap, Link, Rocket, Lightbulb, Globe } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com/guardian-io", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/guardians.io", label: "Instagram" },
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
      icon: <Zap className="h-6 w-6 text-secondary" />,
      title: "Real-Time ESG Risk Defense",
      description: "Powered by TURBO-X AI, our system detects, prevents, and mitigates sustainability risks before they escalate."
    },
    {
      icon: <Link className="h-6 w-6 text-secondary" />,
      title: "Ultra-Link Blockchain Network",
      description: "Ensuring 100% verified ESG claims through tamper-proof, decentralized compliance tracking."
    },
    {
      icon: <Rocket className="h-6 w-6 text-secondary" />,
      title: "Fusion-X Intelligence Engine",
      description: "AI-driven supply chain transparency, automated regulatory adaptation, and interactive ESG storytelling."
    }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">
                GUARDIAN-IO™ | GLOBAL INC
              </h3>
              <p className="text-lg text-muted-foreground">
                Redefining ESG Intelligence with Turbo-AI Compliance, Ultra-Link Blockchain Verification, and Fusion-X Impact Analytics.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-primary">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Taglines */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-secondary" />
                Lead the ESG Revolution. Stay Transparent. Stay Resilient.
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Globe className="h-4 w-4 text-secondary" />
                GUARDIAN-IO™ – Because the Future of Sustainability is Now.
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <RouterLink
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </RouterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} GUARDIAN-IO™ | GLOBAL INC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;