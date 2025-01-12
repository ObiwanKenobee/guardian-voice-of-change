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
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

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

export const WorkspaceSidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 p-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="hover:bg-primary/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r shadow-sm",
          "transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          "flex flex-col",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={cn(
            "text-lg font-semibold text-primary transition-opacity duration-300",
            isCollapsed && "lg:opacity-0"
          )}>
            Guardian-IO
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform duration-300",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10",
                    isCollapsed ? "lg:justify-center" : "",
                    location.pathname === item.href && "bg-secondary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className={cn(
                    "h-4 w-4",
                    isCollapsed ? "lg:mr-0" : "mr-2"
                  )} />
                  <span className={cn(
                    "transition-opacity duration-300",
                    isCollapsed && "lg:hidden"
                  )}>
                    {item.label}
                  </span>
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};