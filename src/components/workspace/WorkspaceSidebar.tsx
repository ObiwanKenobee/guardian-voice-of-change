
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavigationMenu } from "./sidebar/NavigationMenu";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function WorkspaceSidebar() {
  return (
    <>
      <SidebarTrigger>
        <motion.div 
          className="fixed left-4 top-20 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg md:left-6 lg:hidden flex items-center justify-center utopia-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.div>
      </SidebarTrigger>
      <Sidebar 
        variant="sidebar" 
        className="utopia-sidebar transition-all duration-300 w-[280px]"
        side="left"
      >
        <SidebarContent>
          <SidebarHeader />
          <NavigationMenu />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
