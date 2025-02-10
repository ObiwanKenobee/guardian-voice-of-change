
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { LocationSearch } from "./search/LocationSearch";
import { FilterBadges } from "./navigation/FilterBadges";
import { AddLocationDialog } from "./form/AddLocationDialog";

export const SupplyChainControls = () => {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <LocationSearch />
            <FilterBadges />
          </div>
          <AddLocationDialog open={open} onOpenChange={setOpen} />
          <Button className="w-full md:w-auto" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
