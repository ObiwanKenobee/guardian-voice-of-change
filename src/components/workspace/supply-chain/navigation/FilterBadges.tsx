
import { Badge } from "@/components/ui/badge";
import { Package, Ship, Plane, Truck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const FilterBadges = () => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 2 : 3;
  
  return (
    <div className="flex flex-col w-full space-y-2 md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex flex-wrap gap-1 sm:gap-2">
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2">
          <Package className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
          Warehouses
        </Badge>
        <Badge variant="outline" className="bg-green-500/10 text-green-500 text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2">
          <Truck className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
          Distribution
        </Badge>
        <Badge variant="outline" className="bg-orange-500/10 text-orange-500 text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2">
          <Package className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
          Manufacturing
        </Badge>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2">
          <Ship className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
          Sea Routes
        </Badge>
        <Badge variant="outline" className="bg-green-500/10 text-green-500 text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2">
          <Plane className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
          Air Routes
        </Badge>
        <Badge variant="outline" className="bg-orange-500/10 text-orange-500 text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2">
          <Truck className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
          Land Routes
        </Badge>
      </div>
    </div>
  );
};
