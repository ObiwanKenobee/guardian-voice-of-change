import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const HeaderSearch = () => {
  return (
    <div className="hidden sm:block relative w-full max-w-[200px] md:max-w-md">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-8 w-full"
      />
    </div>
  );
};