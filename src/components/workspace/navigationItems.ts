import {
  Activity,
  BarChart3,
  Bot,
  BookOpen,
  Briefcase,
  Building,
  Code,
  CreditCard,
  FileText,
  Fingerprint,
  Gauge,
  Gift,
  Globe,
  HelpCircle,
  Home,
  Info,
  Leaf,
  LucideIcon,
  MessageSquare,
  PieChart,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Table,
  TreeDeciduous,
  TreePine,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export interface NavigationItemType {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavigationGroupType {
  label: string;
  items: string[];
}

export const navigationItems: NavigationItemType[] = [
  {
    label: "Dashboard",
    href: "/workspace/dashboard",
    icon: Home,
  },
  {
    label: "AI Agents",
    href: "/workspace/ai-agents",
    icon: Bot,
    badge: "New",
  },
  {
    label: "X-API Integrations",
    href: "/workspace/x-api-integration",
    icon: Zap,
    badge: "Beta",
  },
  {
    label: "Supply Chain Map",
    href: "/workspace/features/supply-chain-map",
    icon: Globe,
  },
  {
    label: "ESG Reporting",
    href: "/workspace/esg-reporting",
    icon: FileText,
  },
  {
    label: "Carbon Footprint",
    href: "/workspace/features/carbon-footprint",
    icon: Leaf,
  },
  {
    label: "Wildlife Protection",
    href: "/workspace/features/wildlife-protection",
    icon: TreeDeciduous,
  },
  {
    label: "Ethical Sourcing",
    href: "/workspace/features/ethical-sourcing-advisor",
    icon: ShoppingCart,
  },
  {
    label: "Human Rights Monitor",
    href: "/workspace/features/human-rights-monitor",
    icon: ShieldAlert,
  },
  {
    label: "Supply Chain Transparency",
    href: "/workspace/features/supply-chain-transparency",
    icon: Table,
  },
  {
    label: "Compliance",
    href: "/workspace/compliance",
    icon: ShieldCheck,
  },
  {
    label: "Performance Analytics",
    href: "/workspace/features/performance-analytics",
    icon: Activity,
  },
  {
    label: "Risk Monitoring",
    href: "/workspace/features/risk-monitoring",
    icon: Gauge,
  },
  {
    label: "Risk Management",
    href: "/workspace/features/risk-management",
    icon: Activity,
  },
  {
    label: "Compliance Automation",
    href: "/workspace/features/compliance-automation",
    icon: Workflow,
  },
  {
    label: "Corporate Governance",
    href: "/workspace/features/corporate-governance",
    icon: Building,
  },
  {
    label: "Due Diligence",
    href: "/workspace/features/due-diligence",
    icon: FileText,
  },
  {
    label: "Regional Compliance",
    href: "/workspace/features/regional-compliance",
    icon: Globe,
  },
  {
    label: "Analytics",
    href: "/workspace/analytics",
    icon: BarChart3,
  },
];

export const navigationGroups: NavigationGroupType[] = [
  {
    label: "Overview",
    items: ["Dashboard", "AI Agents", "X-API Integrations"]
  },
  {
    label: "Supply Chain",
    items: ["Supply Chain Map", "ESG Reporting", "Carbon Footprint", "Wildlife Protection", "Ethical Sourcing", "Human Rights Monitor", "Supply Chain Transparency"],
  },
  {
    label: "Governance",
    items: ["Compliance", "Risk Monitoring", "Risk Management", "Compliance Automation", "Corporate Governance", "Due Diligence", "Regional Compliance"],
  },
  {
    label: "Analytics & Security",
    items: ["Performance Analytics", "Analytics", "Advanced Analytics", "Biometric Security", "Stakeholder Dashboard"],
  },
  {
    label: "Collaboration",
    items: ["Collaboration", "Team"],
  },
  {
    label: "Integration",
    items: ["System Integrations", "Enterprise Integration", "API", "X-API Integrations"],
  },
  {
    label: "Account",
    items: ["Settings", "Support"],
  },
];
