import { Navigate, Route, Routes } from "react-router-dom";
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
import RiskMitigation from "./features/RiskMitigation";
import StakeholderManagement from "./features/StakeholderManagement";
import SupplyChainMap from "./features/SupplyChainMap";
import SupplyChainTransparency from "./features/SupplyChainTransparency";
import EthicalSourcingAdvisor from "./features/EthicalSourcingAdvisor";
import WildlifeProtection from "./features/WildlifeProtection";

const Workspace = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
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
            <Route path="risk-mitigation" element={<RiskMitigation />} />
            <Route path="stakeholder-management" element={<StakeholderManagement />} />
            <Route path="supply-chain-map" element={<SupplyChainMap />} />
            <Route path="supply-chain-transparency" element={<SupplyChainTransparency />} />
            <Route path="ethical-sourcing-advisor" element={<EthicalSourcingAdvisor />} />
            <Route path="wildlife-protection" element={<WildlifeProtection />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Workspace;