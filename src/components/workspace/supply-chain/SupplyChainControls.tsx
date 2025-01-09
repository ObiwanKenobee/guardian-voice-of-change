import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const SupplyChainControls = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-8 w-[300px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                <Package className="mr-1 h-3 w-3" />
                Warehouses
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                <Package className="mr-1 h-3 w-3" />
                Distribution
              </Badge>
              <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
                <Package className="mr-1 h-3 w-3" />
                Manufacturing
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};