import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Collaboration from "./Collaboration";

const WorkspaceRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="collaboration" element={<Collaboration />} />
    </Routes>
  );
};

export default WorkspaceRoutes;