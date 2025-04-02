
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
  Map,
  MessageSquare,
  PieChart,
  Search,
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
  keywords?: string[]; // SEO keywords relevant to this section
  description?: string; // SEO description for this section
}

export interface NavigationGroupType {
  label: string;
  items: string[];
  keywords?: string[]; // SEO keywords for the group
}

export const navigationItems: NavigationItemType[] = [
  {
    label: "Dashboard",
    href: "/workspace/dashboard",
    icon: Home,
    keywords: ["regenerative business dashboard", "sustainability metrics", "ESG performance overview"],
    description: "Your unified command center for monitoring and managing your organization's regenerative impact",
  },
  {
    label: "AI Agents",
    href: "/workspace/ai-agents",
    icon: Bot,
    badge: "New",
    keywords: ["AI sustainability assistants", "ESG automation", "intelligent impact optimization"],
    description: "AI-powered agents that amplify your sustainability initiatives and uncover hidden opportunities for positive impact",
  },
  {
    label: "X-API Integrations",
    href: "/workspace/x-api-integration",
    icon: Zap,
    badge: "Beta",
    keywords: ["sustainability API ecosystem", "ESG data integration", "impact data connectivity"],
    description: "Connect your regenerative initiatives with external systems through our powerful, secure API ecosystem",
  },
  {
    label: "Supply Chain Map",
    href: "/workspace/supply-chain",
    icon: Map,
    keywords: ["transparent supply networks", "ethical sourcing visualization", "supply chain mapping"],
    description: "Visualize your entire supply ecosystem with unprecedented transparency and identify regeneration opportunities",
  },
  {
    label: "ESG Reporting",
    href: "/workspace/esg-reporting",
    icon: FileText,
    keywords: ["impact reporting", "sustainability disclosure", "ESG transparency"],
    description: "Generate comprehensive ESG reports that showcase your organization's positive impact journey",
  },
  {
    label: "Carbon Footprint",
    href: "/workspace/features/carbon-footprint",
    icon: Leaf,
    keywords: ["carbon negative strategies", "emissions reduction", "climate positive business"],
    description: "Transform your carbon footprint from a liability into an opportunity for ecosystem regeneration",
  },
  {
    label: "Wildlife Protection",
    href: "/workspace/wildlife",
    icon: TreeDeciduous,
    keywords: ["biodiversity conservation", "wildlife monitoring", "ecosystem protection"],
    description: "Deploy advanced monitoring technologies to protect wildlife and biodiversity in your operational areas",
  },
  {
    label: "Ethical Sourcing",
    href: "/workspace/features/ethical-sourcing-advisor",
    icon: ShoppingCart,
    keywords: ["fair trade sourcing", "ethical procurement", "responsible supply chain"],
    description: "Transform your sourcing processes to prioritize human and ecological wellbeing across your value chain",
  },
  {
    label: "Human Rights Monitor",
    href: "/workspace/features/human-rights-monitor",
    icon: ShieldAlert,
    keywords: ["labor rights protection", "human trafficking prevention", "dignified work"],
    description: "Ensure human dignity and rights are protected throughout your operations and supply network",
  },
  {
    label: "Supply Chain Transparency",
    href: "/workspace/features/supply-chain-transparency",
    icon: Table,
    keywords: ["radical supply transparency", "ethical traceability", "responsible sourcing"],
    description: "Achieve unprecedented visibility into your supply chain to drive accountability and positive impact",
  },
  {
    label: "Compliance",
    href: "/workspace/compliance",
    icon: ShieldCheck,
    keywords: ["ethical business standards", "ESG regulation alignment", "impact compliance"],
    description: "Stay ahead of sustainability regulations while exceeding minimum compliance to become a regenerative leader",
  },
  {
    label: "Performance Analytics",
    href: "/workspace/features/performance-analytics",
    icon: Activity,
    keywords: ["impact measurement", "sustainability KPIs", "regenerative performance tracking"],
    description: "Measure and optimize your organization's positive impact on people and planet through advanced analytics",
  },
  {
    label: "Risk Monitoring",
    href: "/workspace/features/risk-monitoring",
    icon: Gauge,
    keywords: ["regenerative risk assessment", "ESG risk identification", "sustainability risk radar"],
    description: "Proactively identify sustainability risks and transform them into opportunities for positive impact",
  },
  {
    label: "Risk Management",
    href: "/workspace/features/risk-management",
    icon: Activity,
    keywords: ["ESG risk mitigation", "sustainability resilience", "proactive risk strategies"],
    description: "Develop comprehensive strategies to manage risks while advancing your regenerative mission",
  },
  {
    label: "Compliance Automation",
    href: "/workspace/features/compliance-automation",
    icon: Workflow,
    keywords: ["automated sustainability compliance", "ESG regulation technology", "streamlined standards"],
    description: "Automate compliance processes to free resources for more innovative impact initiatives",
  },
  {
    label: "Corporate Governance",
    href: "/workspace/features/corporate-governance",
    icon: Building,
    keywords: ["regenerative governance", "ethical leadership", "purpose-driven management"],
    description: "Implement governance frameworks that embed regenerative principles throughout your organization",
  },
  {
    label: "Due Diligence",
    href: "/workspace/features/due-diligence",
    icon: FileText,
    keywords: ["ethical due diligence", "sustainability risk assessment", "comprehensive impact evaluation"],
    description: "Conduct thorough due diligence to ensure all business activities align with your regenerative mission",
  },
  {
    label: "Regional Compliance",
    href: "/workspace/features/regional-compliance",
    icon: Globe,
    keywords: ["global sustainability standards", "regional ESG regulations", "location-specific compliance"],
    description: "Navigate complex regional sustainability regulations while maintaining your global impact vision",
  },
  {
    label: "Analytics",
    href: "/workspace/analytics",
    icon: BarChart3,
    keywords: ["regenerative impact analytics", "sustainability metrics", "impact intelligence"],
    description: "Gain deep insights into your sustainability performance to drive continuous improvement and innovation",
  },
];

export const navigationGroups: NavigationGroupType[] = [
  {
    label: "Overview",
    items: ["Dashboard", "AI Agents", "X-API Integrations"],
    keywords: ["regenerative business overview", "sustainability command center", "impact intelligence hub"]
  },
  {
    label: "Supply Chain",
    items: ["Supply Chain Map", "ESG Reporting", "Carbon Footprint", "Wildlife Protection", "Ethical Sourcing", "Human Rights Monitor", "Supply Chain Transparency"],
    keywords: ["regenerative supply networks", "ethical sourcing", "transparent value chains", "carbon neutral operations"]
  },
  {
    label: "Governance",
    items: ["Compliance", "Risk Monitoring", "Risk Management", "Compliance Automation", "Corporate Governance", "Due Diligence", "Regional Compliance"],
    keywords: ["regenerative governance", "ethical leadership", "purpose-driven compliance", "sustainability risk strategy"]
  },
  {
    label: "Analytics & Security",
    items: ["Performance Analytics", "Analytics", "Advanced Analytics", "Biometric Security", "Stakeholder Dashboard"],
    keywords: ["impact intelligence", "regenerative metrics", "sustainability performance tracking", "stakeholder transparency"]
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
