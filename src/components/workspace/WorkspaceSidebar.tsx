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
      <aside
        className={cn(
          "h-screen w-64 bg-background border-r shadow-sm",
          "lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block",
          "transform transition-transform duration-300 ease-in-out",
          "hidden lg:block"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-primary">Guardian-IO</h2>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-65px)]">
          <nav className="space-y-1 px-2">
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

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-background border-r shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-primary">Guardian-IO</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <ScrollArea className="flex-1 h-[calc(100vh-65px)]">
              <nav className="space-y-1 px-2">
                {sidebarItems.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={location.pathname === item.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-10",
                        location.pathname === item.href && "bg-secondary"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </aside>
        </div>
      )}
    </>
  );
};