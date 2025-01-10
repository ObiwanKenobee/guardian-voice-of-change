import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavItems } from "./MobileNavItems";
import { MobileAuthButtons } from "./MobileAuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onSignOut: () => Promise<void>;
}

export const MobileMenu = ({ isOpen, onClose, isAuthenticated, onSignOut }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-6 space-y-6">
          <MobileNavItems onClose={onClose} />
          <div className="space-y-4 pt-4 border-t">
            <MobileAuthButtons 
              isAuthenticated={isAuthenticated} 
              onSignOut={onSignOut} 
              onClose={onClose} 
            />
          </div>
        </div>
      </nav>
    </div>
  );
};