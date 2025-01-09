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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/workspace/dashboard" },
  { icon: MessageSquare, label: "Collaboration", href: "/workspace/collaboration" },
  { icon: Shield, label: "Compliance", href: "/workspace/compliance" },
  { icon: Map, label: "Supply Chain", href: "/workspace/supply-chain" },
  { icon: Bird, label: "Wildlife", href: "/workspace/wildlife" },
  { icon: BarChart3, label: "Analytics", href: "/workspace/analytics" },
  { icon: Users, label: "Partners", href: "/workspace/partners" },
  { icon: Settings, label: "Settings", href: "/workspace/settings" },
];

export const WorkspaceSidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
          "fixed inset-y-0 left-0 z-40 bg-card border-r transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static",
          isCollapsed ? "w-[60px]" : "w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <h2 className={cn("text-lg font-semibold gradient-text transition-opacity duration-300",
              isCollapsed && "opacity-0"
            )}>
              Guardian-IO
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden lg:flex"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start mb-1",
                      location.pathname === item.href && "bg-accent",
                      isCollapsed && "justify-center px-2"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
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