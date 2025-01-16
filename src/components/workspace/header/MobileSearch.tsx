import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MobileSearch = () => {
  return (
    <div className="lg:hidden p-2 border-t">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-8 w-full"
        />
      </div>
    </div>
  );
};