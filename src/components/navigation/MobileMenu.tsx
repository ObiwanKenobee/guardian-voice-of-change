import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Users, Lightbulb, LogIn } from "lucide-react";
import { platformFeatures, innovations } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();

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
              <Link
                key={feature.title}
                to="/platform-features"
                className="flex items-center gap-2 hover:text-primary"
                onClick={onClose}
              >
                {feature.icon}
                <span>{feature.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Innovations</h3>
          <div className="space-y-2 pl-4">
            {innovations.map((item) => (
              <Link
                key={item.title}
                to="/innovations"
                className="block hover:text-primary"
                onClick={onClose}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Resources</h3>
          <div className="space-y-2 pl-4">
            <Link
              to="/resources"
              className="flex items-center gap-2 hover:text-primary"
              onClick={onClose}
            >
              <BookOpen className="h-5 w-5" /> Resource Library
            </Link>
            <Link
              to="/resources"
              className="flex items-center gap-2 hover:text-primary"
              onClick={onClose}
            >
              <Users className="h-5 w-5" /> Success Stories
            </Link>
            <Link
              to="/resources"
              className="flex items-center gap-2 hover:text-primary"
              onClick={onClose}
            >
              <Lightbulb className="h-5 w-5" /> Events & Webinars
            </Link>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-center"
            onClick={() => {
              navigate('/partner');
              onClose();
            }}
          >
            Partner With Us
          </Button>
          <Button 
            className="w-full justify-center bg-primary"
            onClick={() => {
              navigate('/sign-in');
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