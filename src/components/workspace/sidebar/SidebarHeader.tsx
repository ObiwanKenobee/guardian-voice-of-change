
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const SidebarHeader = () => {
  const { toggleSidebar } = useSidebar();
  
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <Link
        to="/workspace"
        className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity group"
      >
        <Shield className="h-6 w-6 text-primary" />
        <span className="gradient-text text-lg">
          Guardian-IO
        </span>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-muted lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  );
};
