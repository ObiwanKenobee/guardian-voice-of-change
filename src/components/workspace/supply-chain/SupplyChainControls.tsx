
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { LocationSearch } from "./search/LocationSearch";
import { FilterBadges } from "./navigation/FilterBadges";
import { AddLocationDialog } from "./form/AddLocationDialog";
import { useIsMobile } from "@/hooks/use-mobile";

export const SupplyChainControls = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardContent className="p-2 sm:p-4">
        <div className="flex flex-col space-y-3 sm:space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
          <div className="flex flex-col space-y-3 sm:space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <LocationSearch />
            <FilterBadges />
          </div>
          <AddLocationDialog open={open} onOpenChange={setOpen} />
          <Button 
            className="w-full md:w-auto text-xs sm:text-sm py-1 sm:py-2" 
            onClick={() => setOpen(true)}
            size={isMobile ? "sm" : "default"}
          >
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Add Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
