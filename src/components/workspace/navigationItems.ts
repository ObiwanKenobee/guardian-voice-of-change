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
  Network
} from "lucide-react";

export const navigationItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/workspace/dashboard" 
  },
  {
    icon: Network,
    label: "Enterprise Integration",
    href: "/workspace/enterprise-integration",
    badge: "Enterprise"
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
    href: "/workspace/security"
  },
  {
    icon: Database,
    label: "Enterprise Integration",
    href: "/workspace/enterprise-integration",
    badge: "Fortune 500"
  },
  {
    icon: MapPin,
    label: "Supply Chain Mapping",
    href: "/workspace/supply-chain"
  },
  {
    icon: ClipboardCheck,
    label: "Compliance Automation",
    href: "/workspace/compliance"
  },
  {
    icon: AlertTriangle,
    label: "Risk Management",
    href: "/workspace/risk-management",
    badge: "Critical"
  },
  {
    icon: TrendingUp,
    label: "Performance Analytics",
    href: "/workspace/analytics"
  },
  {
    icon: Users,
    label: "Stakeholder Management",
    href: "/workspace/stakeholders"
  },
  {
    icon: Building2,
    label: "Corporate Governance",
    href: "/workspace/governance"
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
    items: ["Dashboard", "Enterprise Integration", "Global ESG Integration", "Advanced Analytics", "Due Diligence", "Biometric Security"]
  },
  {
    label: "Integration & Optimization",
    items: ["Enterprise Integration", "Supply Chain Mapping", "Compliance Automation"]
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
