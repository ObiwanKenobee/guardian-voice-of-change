import { useState } from "react";
import { MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "./navigationItems";
import { HeaderBranding } from "./header/HeaderBranding";
import { HeaderMetrics } from "./header/HeaderMetrics";
import { HeaderSearch } from "./header/HeaderSearch";
import { HeaderNotifications } from "./header/HeaderNotifications";
import { HeaderUserMenu } from "./header/HeaderUserMenu";
import { MobileSearch } from "./header/MobileSearch";

interface WorkspaceHeaderProps {
  onMenuClick?: () => void;
}

export const WorkspaceHeader = ({ onMenuClick }: WorkspaceHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="border-b bg-card sticky top-0 z-40">
      <div className="flex items-center justify-between p-3 sm:p-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <HeaderBranding />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className="gap-2"
                  size="sm"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <HeaderMetrics />

        {/* Search and Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <HeaderSearch />

          {/* Collaboration Button */}
          <Button variant="ghost" size="icon" className="relative hidden sm:flex">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <HeaderNotifications />
          <HeaderUserMenu />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-65px)]">
                <nav className="space-y-1 p-2">
                  {navigationItems.map((item) => (
                    <Link 
                      key={item.href} 
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={location.pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <MobileSearch />
    </header>
  );
};