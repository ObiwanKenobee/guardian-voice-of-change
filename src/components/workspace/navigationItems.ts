
import {
  Activity,
  BarChart3,
  BookOpen,
  Briefcase,
  Building,
  CreditCard,
  FileText,
  Gauge,
  Gift,
  Globe,
  HelpCircle,
  Home,
  Info,
  LucideIcon,
  MessageSquare,
  PieChart,
  Power,
  Settings,
  ShieldAlert,
  ShoppingCart,
  Tables,
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
    label: "Supply Chain Map",
    href: "/workspace/supply-chain",
    icon: Globe,
  },
  {
    label: "ESG Reporting",
    href: "/workspace/features/esg-integration",
    icon: FileText,
  },
  {
    label: "Carbon Footprint",
    href: "/workspace/features/carbon-footprint",
    icon: BarChart3,
  },
  {
    label: "Compliance",
    href: "/workspace/compliance",
    icon: ShieldAlert,
  },
  {
    label: "Performance Analytics",
    href: "/workspace/analytics",
    icon: Activity,
  },
  {
    label: "Risk Monitoring",
    href: "/workspace/features/risk-monitoring",
    icon: Gauge,
  },
  {
    label: "AI Agents",
    href: "/workspace/ai-agents",
    icon: Power,
    badge: "New",
  },
  {
    label: "X-API Integrations",
    href: "/workspace/x-api-integration",
    icon: Zap,
    badge: "Beta",
  },
  {
    label: "Wildlife Protection",
    href: "/workspace/wildlife",
    icon: TreePine,
  },
  {
    label: "Collaboration",
    href: "/workspace/collaboration",
    icon: Users,
  },
  {
    label: "System Integrations",
    href: "/workspace/system-integration",
    icon: Workflow,
  },
  {
    label: "Enterprise Integration",
    href: "/workspace/enterprise-integration",
    icon: Building,
  },
  {
    label: "Team",
    href: "/workspace/team",
    icon: Users,
  },
  {
    label: "API",
    href: "/workspace/api",
    icon: Briefcase,
  },
  {
    label: "Settings",
    href: "/workspace/settings",
    icon: Settings,
  },
  {
    label: "Support",
    href: "/workspace/support",
    icon: HelpCircle,
  },
];

export const navigationGroups: NavigationGroupType[] = [
  {
    label: "Overview",
    items: ["Dashboard", "AI Agents", "X-API Integrations"]
  },
  {
    label: "Supply Chain",
    items: ["Supply Chain Map", "ESG Reporting", "Carbon Footprint", "Wildlife Protection"],
  },
  {
    label: "Governance",
    items: ["Compliance", "Risk Monitoring", "Performance Analytics"],
  },
  {
    label: "Collaboration",
    items: ["Collaboration", "Team"],
  },
  {
    label: "Integration",
    items: ["System Integrations", "Enterprise Integration", "API"],
  },
  {
    label: "Account",
    items: ["Settings", "Support"],
  },
];
