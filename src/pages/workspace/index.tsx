import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Collaboration from "./Collaboration";
import Compliance from "./Compliance";
import SupplyChain from "./SupplyChain";
import Wildlife from "./Wildlife";
import Analytics from "./Analytics";
import Partners from "./Partners";
import Settings from "./Settings";

const WorkspaceRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="collaboration" element={<Collaboration />} />
      <Route path="compliance" element={<Compliance />} />
      <Route path="supply-chain" element={<SupplyChain />} />
      <Route path="wildlife" element={<Wildlife />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="partners" element={<Partners />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default WorkspaceRoutes;