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
  Link,
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
    badge: "New"
  },
  {
    icon: Database,
    label: "Compliance Automation",
    href: "/workspace/compliance"
  },
  {
    icon: MapPin,
    label: "Supply Chain Mapping",
    href: "/workspace/supply-chain"
  },
  {
    icon: ClipboardCheck,
    label: "Task Manager",
    href: "/workspace/collaboration"
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
    href: "/workspace/stakeholder-management",
    badge: "New"
  },
  {
    icon: Building2,
    label: "Corporate Governance",
    href: "/workspace/corporate-governance"
  },
  {
    icon: Cloud,
    label: "Cloud Infrastructure",
    href: "/workspace/infrastructure",
    badge: "99.99% SLA"
  },
  {
    icon: CircuitBoard,
    label: "Sensor Management",
    href: "/workspace/sensors"
  },
  {
    icon: Link,
    label: "Supply Chain",
    href: "/workspace/supply-chain"
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
    items: ["Dashboard", "Biometric Security", "Due Diligence", "Advanced Analytics"]
  },
  {
    label: "Integration & Optimization",
    items: ["Supply Chain Mapping", "Compliance Automation"]
  },
  {
    label: "Risk & Performance",
    items: ["Risk Management", "Performance Analytics"]
  },
  {
    label: "Stakeholder & Governance",
    items: ["Stakeholder Management", "Corporate Governance"]
  },
  {
    label: "Infrastructure",
    items: ["Cloud Infrastructure", "Sensor Management"]
  },
  {
    label: "Additional Features",
    items: ["Supply Chain", "Wildlife Protection", "Settings"]
  }
];
