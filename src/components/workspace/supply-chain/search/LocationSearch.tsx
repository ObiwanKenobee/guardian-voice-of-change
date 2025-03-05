
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

export const LocationSearch = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative w-full md:w-[240px] lg:w-[300px]">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
      <Input
        placeholder="Search locations..."
        className="pl-7 sm:pl-8 text-xs sm:text-sm h-8 sm:h-10"
        size={isMobile ? "sm" : "default"}
      />
    </div>
  );
};
