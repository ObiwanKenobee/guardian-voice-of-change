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

// Features
import AdvancedAnalytics from "@/pages/workspace/features/AdvancedAnalytics";
import BiometricSecurity from "@/pages/workspace/features/BiometricSecurity";
import CloudInfrastructure from "@/pages/workspace/features/CloudInfrastructure";
import ComplianceAutomation from "@/pages/workspace/features/ComplianceAutomation";
import CorporateGovernance from "@/pages/workspace/features/CorporateGovernance";
import DueDiligence from "@/pages/workspace/features/DueDiligence";
import EnterpriseData from "@/pages/workspace/features/EnterpriseData";
import ESGIntegration from "@/pages/workspace/features/ESGIntegration";
import EthicalSourcingAdvisor from "@/pages/workspace/features/EthicalSourcingAdvisor";
import PerformanceAnalytics from "@/pages/workspace/features/PerformanceAnalytics";
import RiskManagement from "@/pages/workspace/features/RiskManagement";
import RiskMitigation from "@/pages/workspace/features/RiskMitigation";
import StakeholderManagement from "@/pages/workspace/features/StakeholderManagement";
import SupplyChainMap from "@/pages/workspace/features/SupplyChainMap";
import SupplyChainTransparency from "@/pages/workspace/features/SupplyChainTransparency";
import SupplyChainTransparencyAI from "@/pages/workspace/features/SupplyChainTransparencyAI";
import WildlifeProtection from "@/pages/workspace/features/WildlifeProtection";

const Workspace = () => {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
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

                      {/* Feature routes */}
                      <Route path="features">
                        <Route path="advanced-analytics" element={<AdvancedAnalytics />} />
                        <Route path="biometric-security" element={<BiometricSecurity />} />
                        <Route path="cloud-infrastructure" element={<CloudInfrastructure />} />
                        <Route path="compliance-automation" element={<ComplianceAutomation />} />
                        <Route path="corporate-governance" element={<CorporateGovernance />} />
                        <Route path="due-diligence" element={<DueDiligence />} />
                        <Route path="enterprise-data" element={<EnterpriseData />} />
                        <Route path="esg-integration" element={<ESGIntegration />} />
                        <Route path="ethical-sourcing" element={<EthicalSourcingAdvisor />} />
                        <Route path="performance-analytics" element={<PerformanceAnalytics />} />
                        <Route path="risk-management" element={<RiskManagement />} />
                        <Route path="risk-mitigation" element={<RiskMitigation />} />
                        <Route path="stakeholder-management" element={<StakeholderManagement />} />
                        <Route path="supply-chain-map" element={<SupplyChainMap />} />
                        <Route path="supply-chain-transparency" element={<SupplyChainTransparency />} />
                        <Route path="supply-chain-transparency-ai" element={<SupplyChainTransparencyAI />} />
                        <Route path="wildlife-protection" element={<WildlifeProtection />} />
                      </Route>
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