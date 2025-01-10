import { useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [socialLinks, setSocialLinks] = useState([
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com/guardian-io", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/guardian-io", label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/guardian-io", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/company/guardian-io", label: "LinkedIn" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com/guardian-io", label: "YouTube" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/guardian-io", label: "GitHub" },
  ]);

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

  const handleSocialLinkChange = (index: number, newHref: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], href: newHref };
    setSocialLinks(updatedLinks);
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Guardian-IO</h3>
            <p className="text-sm text-muted-foreground">
              Protecting Our World's Most Vulnerable through innovative supply chain solutions.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
              className="mb-4"
            >
              {isEditing ? "Save Links" : "Edit Social Links"}
            </Button>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <div key={social.label} className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <span className="text-muted-foreground">{social.icon}</span>
                      <Input
                        value={social.href}
                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                        placeholder={`Enter ${social.label} URL`}
                        className="flex-1"
                      />
                    </>
                  ) : (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
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
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Guardian-IO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;