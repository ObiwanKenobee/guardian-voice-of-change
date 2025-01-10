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
import AdvancedAnalytics from "./features/AdvancedAnalytics";
import BiometricSecurity from "./features/BiometricSecurity";
import CloudInfrastructure from "./features/CloudInfrastructure";
import ComplianceAutomation from "./features/ComplianceAutomation";
import CorporateGovernance from "./features/CorporateGovernance";
import DueDiligence from "./features/DueDiligence";
import ESGIntegration from "./features/ESGIntegration";
import EnterpriseData from "./features/EnterpriseData";
import PerformanceAnalytics from "./features/PerformanceAnalytics";
import RiskManagement from "./features/RiskManagement";
import StakeholderManagement from "./features/StakeholderManagement";
import SupplyChainMap from "./features/SupplyChainMap";

const Workspace = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkspaceHeader />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="supply-chain" element={<SupplyChain />} />
            <Route path="wildlife" element={<Wildlife />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="collaboration" element={<Collaboration />} />
            <Route path="partners" element={<Partners />} />
            <Route path="settings" element={<Settings />} />
            
            {/* Feature routes */}
            <Route path="advanced-analytics" element={<AdvancedAnalytics />} />
            <Route path="biometric-security" element={<BiometricSecurity />} />
            <Route path="cloud-infrastructure" element={<CloudInfrastructure />} />
            <Route path="compliance-automation" element={<ComplianceAutomation />} />
            <Route path="corporate-governance" element={<CorporateGovernance />} />
            <Route path="due-diligence" element={<DueDiligence />} />
            <Route path="esg-integration" element={<ESGIntegration />} />
            <Route path="enterprise-data" element={<EnterpriseData />} />
            <Route path="performance-analytics" element={<PerformanceAnalytics />} />
            <Route path="risk-management" element={<RiskManagement />} />
            <Route path="stakeholder-management" element={<StakeholderManagement />} />
            <Route path="supply-chain-map" element={<SupplyChainMap />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Workspace;