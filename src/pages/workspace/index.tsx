import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Collaboration from "./Collaboration";
import Compliance from "./Compliance";
import SupplyChain from "./SupplyChain";
import Wildlife from "./Wildlife";
import Analytics from "./Analytics";
import Partners from "./Partners";
import Settings from "./Settings";
import ESGIntegration from "./features/ESGIntegration";
import AdvancedAnalytics from "./features/AdvancedAnalytics";
import DueDiligence from "./features/DueDiligence";
import BiometricSecurity from "./features/BiometricSecurity";
import EnterpriseData from "./features/EnterpriseData";
import SupplyChainMap from "./features/SupplyChainMap";
import ComplianceAutomation from "./features/ComplianceAutomation";
import RiskManagement from "./features/RiskManagement";
import StakeholderManagement from "./features/StakeholderManagement";
import CorporateGovernance from "./features/CorporateGovernance";
import PerformanceAnalytics from "./features/PerformanceAnalytics";
import CloudInfrastructure from "./features/CloudInfrastructure";

const WorkspaceRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="collaboration" element={<Collaboration />} />
      <Route path="compliance" element={<Compliance />} />
      <Route path="supply-chain" element={<SupplyChain />} />
      <Route path="wildlife" element={<Wildlife />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="partners" element={<Partners />} />
      <Route path="settings" element={<Settings />} />
      
      {/* New Feature Routes */}
      <Route path="esg-integration" element={<ESGIntegration />} />
      <Route path="advanced-analytics" element={<AdvancedAnalytics />} />
      <Route path="due-diligence" element={<DueDiligence />} />
      <Route path="biometric-security" element={<BiometricSecurity />} />
      <Route path="enterprise-data" element={<EnterpriseData />} />
      <Route path="supply-chain-map" element={<SupplyChainMap />} />
      <Route path="compliance-automation" element={<ComplianceAutomation />} />
      <Route path="risk-management" element={<RiskManagement />} />
      <Route path="stakeholder-management" element={<StakeholderManagement />} />
      <Route path="corporate-governance" element={<CorporateGovernance />} />
      <Route path="performance-analytics" element={<PerformanceAnalytics />} />
      <Route path="cloud-infrastructure" element={<CloudInfrastructure />} />
    </Routes>
  );
};

export default WorkspaceRoutes;