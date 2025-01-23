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
        <span>Search workspace...</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs font-medium">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
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
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};