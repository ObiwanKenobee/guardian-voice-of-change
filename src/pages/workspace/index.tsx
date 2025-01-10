import { Navigate, Route, Routes } from "react-router-dom";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import SupplyChain from "./SupplyChain";
import Wildlife from "./Wildlife";
import Compliance from "./Compliance";
import Collaboration from "./Collaboration";
import Partners from "./Partners";
import Settings from "./Settings";

const Workspace = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkspaceHeader />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <Routes>
            <Route index element={<Navigate to="/workspace/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="supply-chain" element={<SupplyChain />} />
            <Route path="wildlife" element={<Wildlife />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="collaboration" element={<Collaboration />} />
            <Route path="partners" element={<Partners />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Workspace;