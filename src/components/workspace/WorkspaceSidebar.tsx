import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/workspace/dashboard" },
  { icon: Users, label: "Collaboration", href: "/workspace/collaboration" },
  { icon: Shield, label: "Compliance", href: "/workspace/compliance" },
  { icon: Map, label: "Supply Chain", href: "/workspace/supply-chain" },
  { icon: Bird, label: "Wildlife Insights", href: "/workspace/wildlife" },
  { icon: BarChart3, label: "Analytics", href: "/workspace/analytics" },
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
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <h2 className="text-lg font-semibold gradient-text">Guardian-IO</h2>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-1",
                  location.pathname === item.href && "bg-accent"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
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