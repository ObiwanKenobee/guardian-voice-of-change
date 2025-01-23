import { useState } from "react";
import { HeaderBranding } from "./header/HeaderBranding";
import { HeaderSearch } from "./header/HeaderSearch";
import { HeaderNotifications } from "./header/HeaderNotifications";
import { HeaderUserMenu } from "./header/HeaderUserMenu";
import { HeaderMetrics } from "./header/HeaderMetrics";
import { MobileSearch } from "./header/MobileSearch";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const WorkspaceHeader = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <HeaderBranding />

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 px-4">
          <HeaderSearch />
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Search Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileSearch(true)}
          >
            <span className="sr-only">Search</span>
            <Search className="h-5 w-5" />
          </Button>

          <HeaderMetrics />
          <HeaderNotifications />
          <HeaderUserMenu />
        </div>
      </div>

      {/* Mobile Search Panel */}
      <MobileSearch 
        open={showMobileSearch} 
        onClose={() => setShowMobileSearch(false)} 
      />
    </header>
  );
};