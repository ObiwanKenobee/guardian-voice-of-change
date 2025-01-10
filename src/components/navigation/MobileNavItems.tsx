import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navigationData } from "./navigationData";

interface MobileNavItemsProps {
  onClose: () => void;
}

export const MobileNavItems = ({ onClose }: MobileNavItemsProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-1">
      {navigationData.map((section) => (
        <div key={section.title} className="mb-6">
          <h4 className="px-2 text-lg font-semibold">{section.title}</h4>
          <div className="mt-2 space-y-1">
            {section.items.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className="w-full justify-start text-base"
                onClick={() => {
                  navigate(item.href);
                  onClose();
                }}
              >
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};