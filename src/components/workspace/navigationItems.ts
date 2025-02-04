import {
  Globe,
  Leaf,
  FileCheck,
  Map,
  Shield,
  AlertTriangle,
  Lock,
  Building2,
  Users,
  Search,
  BarChart3,
  Brain,
  Bell,
  Network,
  Radio,
  Link2,
  Settings,
  Scale,
  FileText,
  Wrench,
} from "lucide-react";

export const navigationItems = [
  // ESG & Sustainability
  {
    icon: Globe,
    label: "Global ESG Integration",
    href: "/workspace/esg-integration",
    badge: "Enterprise"
  },
  {
    icon: Leaf,
    label: "Carbon Footprint",
    href: "/workspace/carbon-footprint",
    badge: "New"
  },
  {
    icon: FileCheck,
    label: "ESG Reporting",
    href: "/workspace/esg-reporting"
  },

  // Supply Chain & Ethics
  {
    icon: Map,
    label: "Supply Chain Mapping",
    href: "/workspace/supply-chain-map"
  },
  {
    icon: Shield,
    label: "Ethical Sourcing",
    href: "/workspace/ethical-sourcing",
    badge: "Premium"
  },
  {
    icon: AlertTriangle,
    label: "Human Rights Monitor",
    href: "/workspace/human-rights"
  },

  // Security & Risk
  {
    icon: Brain,
    label: "Risk Assessment",
    href: "/workspace/risk-management",
    badge: "AI-Powered"
  },
  {
    icon: FileCheck,
    label: "Compliance Automation",
    href: "/workspace/compliance-automation"
  },
  {
    icon: Lock,
    label: "Cybersecurity",
    href: "/workspace/cybersecurity",
    badge: "Military-Grade"
  },

  // Governance
  {
    icon: Building2,
    label: "Corporate Governance",
    href: "/workspace/corporate-governance"
  },
  {
    icon: Users,
    label: "Stakeholder Management",
    href: "/workspace/stakeholder-management"
  },
  {
    icon: Search,
    label: "Due Diligence",
    href: "/workspace/due-diligence"
  },

  // Analytics & Intelligence
  {
    icon: BarChart3,
    label: "Performance Analytics",
    href: "/workspace/performance-analytics"
  },
  {
    icon: Brain,
    label: "Market Intelligence",
    href: "/workspace/market-intelligence",
    badge: "AI-Driven"
  },
  {
    icon: Bell,
    label: "Real-Time Alerts",
    href: "/workspace/alerts"
  },

  // Enterprise Integrations
  {
    icon: Network,
    label: "ERP Integration",
    href: "/workspace/erp-integration"
  },
  {
    icon: Radio,
    label: "IoT Networks",
    href: "/workspace/iot-networks"
  },
  {
    icon: Link2,
    label: "Smart Contracts",
    href: "/workspace/smart-contracts",
    badge: "Blockchain"
  },

  // Settings
  {
    icon: Settings,
    label: "Settings",
    href: "/workspace/settings"
  },
  {
    icon: Scale,
    label: "Regional Compliance",
    href: "/workspace/regional-compliance"
  },
  {
    icon: FileText,
    label: "Policy Management",
    href: "/workspace/policy-management"
  },
  {
    icon: Wrench,
    label: "System Integration",
    href: "/workspace/system-integration"
  },
];

export const navigationGroups = [
  {
    label: "ESG & Sustainability",
    items: ["Global ESG Integration", "Carbon Footprint", "ESG Reporting"]
  },
  {
    label: "Supply Chain & Ethics",
    items: ["Supply Chain Mapping", "Ethical Sourcing", "Human Rights Monitor"]
  },
  {
    label: "Security & Risk",
    items: ["Risk Assessment", "Compliance Automation", "Cybersecurity"]
  },
  {
    label: "Governance",
    items: ["Corporate Governance", "Stakeholder Management", "Due Diligence"]
  },
  {
    label: "Analytics & Intelligence",
    items: ["Performance Analytics", "Market Intelligence", "Real-Time Alerts"]
  },
  {
    label: "Enterprise Integrations",
    items: ["ERP Integration", "IoT Networks", "Smart Contracts"]
  },
  {
    label: "Settings & Configuration",
    items: ["Settings", "Regional Compliance", "Policy Management", "System Integration"]
  }
];