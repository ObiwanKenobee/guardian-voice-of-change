import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  Shield,
  Map,
  Bird,
  BarChart3,
  MessageSquare,
  Settings,
  Menu,
  Globe,
  FileText,
  Fingerprint,
  Database,
  ClipboardCheck,
  AlertTriangle,
  Building2,
  TrendingUp,
  Cloud,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface WorkspaceSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const WorkspaceSidebar = ({ isOpen, onToggle }: WorkspaceSidebarProps) => {
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/workspace/dashboard" },
    { icon: Users, label: "Collaboration", href: "/workspace/collaboration" },
    { icon: Shield, label: "Compliance", href: "/workspace/compliance" },
    { icon: Map, label: "Supply Chain", href: "/workspace/supply-chain" },
    { icon: Bird, label: "Wildlife", href: "/workspace/wildlife" },
    { icon: BarChart3, label: "Analytics", href: "/workspace/analytics" },
    { icon: Globe, label: "ESG Integration", href: "/workspace/esg-integration" },
    { icon: FileText, label: "ESG Reporting", href: "/workspace/esg-reporting" },
    { icon: Fingerprint, label: "Biometric Security", href: "/workspace/biometric-security" },
    { icon: Database, label: "Enterprise Data", href: "/workspace/enterprise-data" },
    { icon: ClipboardCheck, label: "Compliance Automation", href: "/workspace/compliance-automation" },
    { icon: AlertTriangle, label: "Risk Management", href: "/workspace/risk-management" },
    { icon: Building2, label: "Corporate Governance", href: "/workspace/corporate-governance" },
    { icon: TrendingUp, label: "Performance Analytics", href: "/workspace/performance-analytics" },
    { icon: Cloud, label: "Cloud Infrastructure", href: "/workspace/cloud-infrastructure" },
    { icon: MessageSquare, label: "Partners", href: "/workspace/partners" },
    { icon: Settings, label: "Settings", href: "/workspace/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-sm transition-transform duration-300",
          "lg:translate-x-0",
          !isOpen && "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-primary">Guardian-IO</h2>
          <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-65px)]">
          <nav className="space-y-1 p-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10",
                    location.pathname === item.href && "bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};