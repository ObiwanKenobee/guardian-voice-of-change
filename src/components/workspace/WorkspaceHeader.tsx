import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeaderBranding } from "./header/HeaderBranding";
import { HeaderSearch } from "./header/HeaderSearch";
import { HeaderNotifications } from "./header/HeaderNotifications";
import { HeaderUserMenu } from "./header/HeaderUserMenu";
import { MobileSearch } from "./header/MobileSearch";

interface WorkspaceHeaderProps {
  onMenuClick?: () => void;
}

export const WorkspaceHeader = ({ onMenuClick }: WorkspaceHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b bg-card sticky top-0 z-40">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <HeaderBranding />
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <HeaderSearch />
          <HeaderNotifications />
          <HeaderUserMenu />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <MobileSearch />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};