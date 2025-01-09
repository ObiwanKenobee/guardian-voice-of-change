import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Users, Lightbulb, LogIn } from "lucide-react";
import { platformFeatures, innovations } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-16 z-50 bg-background lg:hidden">
      <nav className="container py-6 space-y-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-medium hover:text-primary"
          onClick={onClose}
        >
          <Home className="h-5 w-5" /> Home
        </Link>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Platform Features</h3>
          <div className="space-y-2 pl-4">
            {platformFeatures.map((feature) => (
              <div key={feature.title} className="flex items-center gap-2">
                {feature.icon}
                <span>{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Innovations</h3>
          <div className="space-y-2 pl-4">
            {innovations.map((item) => (
              <div key={item.title}>{item.title}</div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Resources</h3>
          <div className="space-y-2 pl-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Resource Library
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" /> Success Stories
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" /> Events & Webinars
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-center"
            onClick={() => {
              window.location.href = '/partner';
              onClose();
            }}
          >
            Partner With Us
          </Button>
          <Button 
            className="w-full justify-center bg-primary"
            onClick={() => {
              window.location.href = '/sign-in';
              onClose();
            }}
          >
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </div>
      </nav>
    </div>
  );
};