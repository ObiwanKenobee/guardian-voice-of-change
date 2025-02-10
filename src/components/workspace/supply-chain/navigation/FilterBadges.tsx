
import { Badge } from "@/components/ui/badge";
import { Package, Ship, Plane, Truck } from "lucide-react";

export const FilterBadges = () => {
  return (
    <div className="flex flex-col w-full space-y-2 md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
          <Package className="mr-1 h-3 w-3" />
          Warehouses
        </Badge>
        <Badge variant="outline" className="bg-green-500/10 text-green-500">
          <Truck className="mr-1 h-3 w-3" />
          Distribution
        </Badge>
        <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
          <Package className="mr-1 h-3 w-3" />
          Manufacturing
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
          <Ship className="mr-1 h-3 w-3" />
          Sea Routes
        </Badge>
        <Badge variant="outline" className="bg-green-500/10 text-green-500">
          <Plane className="mr-1 h-3 w-3" />
          Air Routes
        </Badge>
        <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
          <Truck className="mr-1 h-3 w-3" />
          Land Routes
        </Badge>
      </div>
    </div>
  );
};
