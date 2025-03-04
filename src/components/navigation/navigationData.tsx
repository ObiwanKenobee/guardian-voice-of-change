
import { Shield, Globe, BarChart3, BookOpen } from "lucide-react";

export const platformFeatures = [
  {
    title: "Supply Chain Transparency",
    description: "Blockchain-enabled tracking tools and real-time visibility",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Ethical Sourcing Tools",
    description: "AI-driven supplier audits and risk assessment",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "CSR & ESG Reporting",
    description: "Dynamic dashboards and customizable templates",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "Resource Library",
    description: "Comprehensive guides, reports, and best practices",
    icon: <BookOpen className="w-6 h-6" />,
  },
];

export const innovations = [
  {
    title: "AI-Powered Risk Assessment",
    description: "Predictive analytics for supply chain vulnerabilities",
  },
  {
    title: "Impact Calculators",
    description: "Measure ecological impact of sourcing decisions",
  },
  {
    title: "Educational Modules",
    description: "Interactive training for ethical practices",
  },
];

export const navigationData = [
  {
    title: "Platform",
    items: [
      { title: "Features", href: "/platform-features" },
      { title: "Innovations", href: "/innovations" },
      { title: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "Partner With Us", href: "/partner" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ],
  },
];
