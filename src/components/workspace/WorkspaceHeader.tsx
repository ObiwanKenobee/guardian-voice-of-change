
import { useState } from "react";
import { HeaderSearch } from "./header/HeaderSearch";
import { HeaderNotifications } from "./header/HeaderNotifications";
import { HeaderUserMenu } from "./header/HeaderUserMenu";
import { HeaderMetrics } from "./header/HeaderMetrics";
import { MobileSearch } from "./header/MobileSearch";
import { Button } from "@/components/ui/button";
import { Menu, Search, Sparkles } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HeaderBranding } from "./header/HeaderBranding";

export const WorkspaceHeader = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  
  // Get the current page title based on route
  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/').filter(Boolean);
    if (path.length <= 1) return "Dashboard";
    
    // Convert kebab-case to Title Case (e.g., "supply-chain" to "Supply Chain")
    const lastSegment = path[path.length - 1];
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <motion.header 
      className="border-b utopia-header sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-16 items-center px-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-primary hover:bg-primary/10"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <HeaderBranding />

        <div className="hidden lg:flex items-center gap-2 pl-4">
          <Sparkles className="h-5 w-5 text-secondary animate-pulse-gentle" />
          <h1 className="text-xl font-medium utopia-gradient-text">{getCurrentPageTitle()}</h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 px-4">
          <HeaderSearch />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary hover:bg-primary/10"
            onClick={() => setShowMobileSearch(true)}
          >
            <span className="sr-only">Search</span>
            <Search className="h-5 w-5" />
          </Button>

          <div className="hidden sm:block">
            <HeaderMetrics />
          </div>
          <HeaderNotifications />
          <HeaderUserMenu />
        </div>
      </div>

      {/* Mobile Search Panel */}
      <MobileSearch 
        open={showMobileSearch} 
        onClose={() => setShowMobileSearch(false)} 
      />
    </motion.header>
  );
};
