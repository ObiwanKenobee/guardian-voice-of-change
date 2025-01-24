import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { navigationItems } from "../navigationItems";

const navigationGroups = [
  {
    label: "Main",
    items: ["Dashboard", "Analytics", "Supply Chain", "ESG Reporting"]
  },
  {
    label: "Management",
    items: ["Compliance", "Wildlife", "Partners", "Settings"]
  }
];

export const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center w-full gap-2 px-3 py-1.5 text-sm text-muted-foreground 
                 bg-muted/50 rounded-md hover:bg-muted transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search workspace...</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
      >
        <div className="fixed inset-0 z-50 min-h-0 w-full overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-2xl">
            <div className="relative bg-background rounded-lg shadow-lg overflow-hidden">
              <CommandInput 
                placeholder="Type a command or search..." 
                className="h-11 px-4 border-b"
              />
              <CommandList className="max-h-[60vh] overflow-y-auto p-2">
                <CommandEmpty>No results found.</CommandEmpty>
                {navigationGroups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {navigationItems
                      .filter((item) => group.items.includes(item.label))
                      .map((item) => (
                        <CommandItem
                          key={item.href}
                          onSelect={() => {
                            navigate(item.href);
                            setOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2"
                        >
                          <item.icon className="flex-shrink-0 h-4 w-4" />
                          <span className="flex-1">{item.label}</span>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};