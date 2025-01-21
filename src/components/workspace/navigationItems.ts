import {
  LayoutDashboard,
  Shield,
  Building2,
  AlertTriangle,
  Cloud,
  CircuitBoard,
  Globe,
  FileText,
  Settings,
  BarChart3,
  Users,
  Link,
  PawPrint,
} from "lucide-react";

export const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/workspace/dashboard" },
  { 
    icon: BarChart3, 
    label: "Performance Analytics", 
    href: "/workspace/performance-analytics",
    badge: "New" 
  },
  { 
    icon: Shield, 
    label: "Risk Management", 
    href: "/workspace/risk-management",
    badge: "2" 
  },
  { 
    icon: Cloud, 
    label: "Infrastructure", 
    href: "/workspace/cloud-infrastructure" 
  },
  { 
    icon: Building2, 
    label: "Governance", 
    href: "/workspace/corporate-governance" 
  },
  { 
    icon: Globe, 
    label: "ESG", 
    href: "/workspace/esg-integration" 
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
    label: "Wildlife", 
    href: "/workspace/wildlife" 
  },
  { 
    icon: Users, 
    label: "Collaboration", 
    href: "/workspace/collaboration" 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/workspace/settings" 
  },
];