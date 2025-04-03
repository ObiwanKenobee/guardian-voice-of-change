
import { Link } from "react-router-dom";
import { Cat, Layers, Lightbulb } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WildlifeItems } from "./navigation-items/WildlifeItems";
import { DinosaurItems } from "./navigation-items/DinosaurItems";
import { AlienItems } from "./navigation-items/AlienItems";
import { PlatformFeatures } from "./navigation-items/PlatformFeatures";
import { InnovationsMenu } from "./navigation-items/InnovationsMenu";
import { ResourcesMenu } from "./navigation-items/ResourcesMenu";

export default function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Cat className="mr-2 h-4 w-4" />
            Wildlife
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-[500px]">
              <div className="grid gap-4 p-6">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Present Day</h4>
                  <div className="grid gap-3 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <WildlifeItems />
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium leading-none">Prehistoric</h4>
                  <div className="grid gap-3 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <DinosaurItems />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium leading-none">Alien Species</h4>
                  <div className="grid gap-3 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <AlienItems />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Layers className="mr-2 h-4 w-4" />
            Platform Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-[500px] max-w-[95vw]">
              <div className="grid gap-4 md:grid-cols-2 w-[90vw] max-w-[900px] p-4 bg-white">
                <div>
                  <h4 className="font-medium px-3 mb-2 text-primary">Core Features</h4>
                  <PlatformFeatures />
                </div>
                <div>
                  <h4 className="font-medium px-3 mb-2 text-primary">Resources</h4>
                  <ResourcesMenu />
                </div>
              </div>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Lightbulb className="mr-2 h-4 w-4" />
            Innovations
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <InnovationsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
