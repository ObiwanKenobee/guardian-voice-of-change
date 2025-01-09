import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Shield,
  Map,
  Paw,
  BarChart3,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/workspace" },
  { icon: Users, label: "Collaboration", href: "/workspace/collaboration" },
  { icon: Shield, label: "Compliance", href: "/workspace/compliance" },
  { icon: Map, label: "Supply Chain", href: "/workspace/supply-chain" },
  { icon: Paw, label: "Wildlife Insights", href: "/workspace/wildlife" },
  { icon: BarChart3, label: "Analytics", href: "/workspace/analytics" },
  { icon: MessageSquare, label: "Partners", href: "/workspace/partners" },
  { icon: Settings, label: "Settings", href: "/workspace/settings" },
];

export const WorkspaceSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 border-r bg-card flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-semibold gradient-text">Guardian-IO</h2>
      </div>
      <nav className="flex-1 px-3 py-4">
        {sidebarItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start mb-1",
                location.pathname === item.href && "bg-accent"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
};