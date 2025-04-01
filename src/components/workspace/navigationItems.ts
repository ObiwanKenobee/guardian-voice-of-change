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
    keywords: ["ESG dashboard", "sustainability metrics", "corporate governance"],
    description: "Comprehensive dashboard for monitoring environmental, social, and governance metrics",
  },
  {
    label: "AI Agents",
    href: "/workspace/ai-agents",
    icon: Bot,
    badge: "New",
    keywords: ["AI compliance tools", "ESG automation", "intelligent sustainability"],
    description: "AI-powered agents that help automate and optimize your sustainability initiatives",
  },
  {
    label: "X-API Integrations",
    href: "/workspace/x-api-integration",
    icon: Zap,
    badge: "Beta",
    keywords: ["sustainability API", "ESG data integration", "compliance automation"],
    description: "Connect your sustainability data with external systems through our powerful API",
  },
  {
    label: "Supply Chain Map",
    href: "/workspace/supply-chain",
    icon: Map,
    keywords: ["ethical supply chain", "supplier mapping", "responsible sourcing"],
    description: "Interactive visualization of your entire supply chain with sustainability insights",
  },
  {
    label: "ESG Reporting",
    href: "/workspace/esg-reporting",
    icon: FileText,
    keywords: ["ESG reports", "sustainability reporting", "corporate responsibility disclosure"],
    description: "Generate comprehensive ESG reports compliant with global standards",
  },
  {
    label: "Carbon Footprint",
    href: "/workspace/features/carbon-footprint",
    icon: Leaf,
    keywords: ["carbon accounting", "emissions tracking", "climate impact"],
    description: "Track and reduce your organization's carbon emissions and environmental impact",
  },
  {
    label: "Wildlife Protection",
    href: "/workspace/wildlife",
    icon: TreeDeciduous,
    keywords: ["biodiversity conservation", "wildlife monitoring", "habitat protection"],
    description: "Monitor and protect wildlife in your operational areas with advanced tracking",
  },
  {
    label: "Ethical Sourcing",
    href: "/workspace/features/ethical-sourcing-advisor",
    icon: ShoppingCart,
    keywords: ["fair trade", "responsible procurement", "ethical supply chain"],
    description: "Tools to ensure your sourcing practices align with ethical standards",
  },
  {
    label: "Human Rights Monitor",
    href: "/workspace/features/human-rights-monitor",
    icon: ShieldAlert,
    keywords: ["labor rights", "human trafficking prevention", "modern slavery"],
    description: "Monitor and prevent human rights abuses in your operations and supply chain",
  },
  {
    label: "Supply Chain Transparency",
    href: "/workspace/features/supply-chain-transparency",
    icon: Table,
    keywords: ["supply chain visibility", "supplier transparency", "ethical sourcing"],
    description: "Gain complete visibility into your supply chain operations and ethical practices",
  },
  {
    label: "Compliance",
    href: "/workspace/compliance",
    icon: ShieldCheck,
    keywords: ["regulatory compliance", "ESG standards", "sustainability regulations"],
    description: "Stay compliant with global sustainability standards and regulations",
  },
  {
    label: "Performance Analytics",
    href: "/workspace/features/performance-analytics",
    icon: Activity,
    keywords: ["ESG performance metrics", "sustainability KPIs", "impact measurement"],
    description: "Advanced analytics to measure and optimize your sustainability performance",
  },
  {
    label: "Risk Monitoring",
    href: "/workspace/features/risk-monitoring",
    icon: Gauge,
    keywords: ["sustainability risk assessment", "ESG risk monitoring", "compliance risk"],
    description: "Proactively identify and mitigate sustainability and compliance risks",
  },
  {
    label: "Risk Management",
    href: "/workspace/features/risk-management",
    icon: Activity,
    keywords: ["ESG risk mitigation", "sustainability risk strategy", "compliance planning"],
    description: "Develop strategies to manage and mitigate sustainability and compliance risks",
  },
  {
    label: "Compliance Automation",
    href: "/workspace/features/compliance-automation",
    icon: Workflow,
    keywords: ["ESG automation", "sustainability compliance", "compliance tools"],
    description: "Automate and optimize your sustainability compliance processes",
  },
  {
    label: "Corporate Governance",
    href: "/workspace/features/corporate-governance",
    icon: Building,
    keywords: ["corporate governance", "ESG compliance", "sustainability governance"],
    description: "Implement and enforce corporate governance practices to ensure sustainability",
  },
  {
    label: "Due Diligence",
    href: "/workspace/features/due-diligence",
    icon: FileText,
    keywords: ["due diligence", "sustainability risk assessment", "ESG compliance"],
    description: "Conduct thorough due diligence to identify and mitigate sustainability risks",
  },
  {
    label: "Regional Compliance",
    href: "/workspace/features/regional-compliance",
    icon: Globe,
    keywords: ["regional compliance", "ESG standards", "sustainability regulations"],
    description: "Adhere to regional sustainability standards and regulations",
  },
  {
    label: "Analytics",
    href: "/workspace/analytics",
    icon: BarChart3,
    keywords: ["ESG analytics", "sustainability metrics", "performance tracking"],
    description: "Advanced analytics to measure and optimize your sustainability performance",
  },
];

export const navigationGroups: NavigationGroupType[] = [
  {
    label: "Overview",
    items: ["Dashboard", "AI Agents", "X-API Integrations"],
    keywords: ["sustainability overview", "ESG dashboard", "corporate responsibility"]
  },
  {
    label: "Supply Chain",
    items: ["Supply Chain Map", "ESG Reporting", "Carbon Footprint", "Wildlife Protection", "Ethical Sourcing", "Human Rights Monitor", "Supply Chain Transparency"],
    keywords: ["sustainable supply chain", "ethical sourcing", "responsible procurement", "carbon tracking"]
  },
  {
    label: "Governance",
    items: ["Compliance", "Risk Monitoring", "Risk Management", "Compliance Automation", "Corporate Governance", "Due Diligence", "Regional Compliance"],
    keywords: ["corporate governance", "ESG compliance", "sustainability risk management", "due diligence"]
  },
  {
    label: "Analytics & Security",
    items: ["Performance Analytics", "Analytics", "Advanced Analytics", "Biometric Security", "Stakeholder Dashboard"],
    keywords: ["ESG analytics", "sustainability metrics", "performance tracking", "stakeholder reporting"]
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
