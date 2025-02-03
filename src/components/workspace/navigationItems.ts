import {
  LayoutDashboard,
  Globe,
  LineChart,
  ShieldCheck,
  Fingerprint,
  Database,
  MapPin,
  ClipboardCheck,
  AlertTriangle,
  Users,
  Building2,
  TrendingUp,
  Cloud,
  CircuitBoard,
  PawPrint,
  Settings,
} from "lucide-react";

export const navigationItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/workspace/dashboard" 
  },
  {
    icon: Globe,
    label: "Global ESG Integration",
    href: "/workspace/esg-integration",
    badge: "Enterprise"
  },
  {
    icon: LineChart,
    label: "Advanced Analytics",
    href: "/workspace/advanced-analytics",
    badge: "New"
  },
  {
    icon: ShieldCheck,
    label: "Due Diligence",
    href: "/workspace/due-diligence"
  },
  {
    icon: Fingerprint,
    label: "Biometric Security",
    href: "/workspace/biometric-security",
    badge: "Premium"
  },
  {
    icon: Database,
    label: "Compliance",
    href: "/workspace/compliance"
  },
  {
    icon: MapPin,
    label: "Supply Chain",
    href: "/workspace/supply-chain"
  },
  {
    icon: AlertTriangle,
    label: "Risk Management",
    href: "/workspace/risk-management",
    badge: "Critical"
  },
  {
    icon: Users,
    label: "Stakeholder Management",
    href: "/workspace/stakeholder-management"
  },
  {
    icon: Building2,
    label: "Corporate Governance",
    href: "/workspace/corporate-governance"
  },
  {
    icon: Cloud,
    label: "Infrastructure",
    href: "/workspace/infrastructure",
    badge: "99.99% SLA"
  },
  {
    icon: CircuitBoard,
    label: "Sensors",
    href: "/workspace/sensors"
  },
  {
    icon: PawPrint,
    label: "Wildlife Protection",
    href: "/workspace/wildlife"
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/workspace/settings"
  },
];

export const navigationGroups = [
  {
    label: "Core Features",
    items: ["Dashboard", "Advanced Analytics", "Due Diligence", "Biometric Security"]
  },
  {
    label: "Compliance & Risk",
    items: ["Compliance", "Risk Management"]
  },
  {
    label: "Supply Chain",
    items: ["Supply Chain", "Sensors"]
  },
  {
    label: "Governance",
    items: ["Stakeholder Management", "Corporate Governance"]
  },
  {
    label: "Infrastructure",
    items: ["Infrastructure", "Global ESG Integration"]
  },
  {
    label: "Sustainability",
    items: ["Wildlife Protection"]
  },
  {
    label: "System",
    items: ["Settings"]
  }
];