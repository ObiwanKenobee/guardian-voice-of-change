import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, Menu, X } from "lucide-react";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopNav } from "./navigation/DesktopNav";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold gradient-text">Guardian-IO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopNav />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => window.location.href = '/partner'}
          >
            Partner With Us
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 transition-colors"
            onClick={() => window.location.href = '/sign-in'}
          >
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </div>
    </div>
  );
};