import { Navigate, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import Dashboard from "@/pages/workspace/Dashboard";
import Analytics from "@/pages/workspace/Analytics";
import Compliance from "@/pages/workspace/Compliance";
import ESGReporting from "@/pages/workspace/ESGReporting";
import Partners from "@/pages/workspace/Partners";
import Settings from "@/pages/workspace/Settings";
import SupplyChain from "@/pages/workspace/SupplyChain";
import Wildlife from "@/pages/workspace/Wildlife";
import Collaboration from "@/pages/workspace/Collaboration";

const Workspace = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <div className="flex-1 flex flex-col min-w-0">
            <WorkspaceHeader />
            <main className="flex-1 overflow-hidden">
              <div className="flex h-full">
                <div className="flex-1 overflow-auto">
                  <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="compliance" element={<Compliance />} />
                      <Route path="esg-reporting" element={<ESGReporting />} />
                      <Route path="partners" element={<Partners />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="supply-chain" element={<SupplyChain />} />
                      <Route path="wildlife" element={<Wildlife />} />
                      <Route path="collaboration" element={<Collaboration />} />
                    </Routes>
                  </div>
                </div>
                <WorkspaceSidebar />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Workspace;