import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load workspace pages
const Dashboard = lazy(() => import("@/pages/workspace/Dashboard"));
const Analytics = lazy(() => import("@/pages/workspace/Analytics"));
const Compliance = lazy(() => import("@/pages/workspace/Compliance"));
const ESGReporting = lazy(() => import("@/pages/workspace/ESGReporting"));
const Partners = lazy(() => import("@/pages/workspace/Partners"));
const Settings = lazy(() => import("@/pages/workspace/Settings"));
const SupplyChain = lazy(() => import("@/pages/workspace/SupplyChain"));
const Wildlife = lazy(() => import("@/pages/workspace/Wildlife"));
const Collaboration = lazy(() => import("@/pages/workspace/Collaboration"));
const Sensors = lazy(() => import("@/pages/workspace/Sensors"));
const RiskManagement = lazy(() => import("@/pages/workspace/features/RiskManagement"));
const CloudInfrastructure = lazy(() => import("@/pages/workspace/features/CloudInfrastructure"));
const CorporateGovernance = lazy(() => import("@/pages/workspace/features/CorporateGovernance"));
const ESGIntegration = lazy(() => import("@/pages/workspace/features/ESGIntegration"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Workspace = () => {
  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <Suspense fallback={<PageLoader />}>
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
            <Route path="sensors" element={<Sensors />} />
            <Route path="risk-management" element={<RiskManagement />} />
            <Route path="cloud-infrastructure" element={<CloudInfrastructure />} />
            <Route path="corporate-governance" element={<CorporateGovernance />} />
            <Route path="esg-integration" element={<ESGIntegration />} />
          </Routes>
        </Suspense>
      </div>
    </TooltipProvider>
  );
};

export default Workspace;