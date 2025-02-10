import { Navigate, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";

// Core Pages
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Profile from "./Profile";
import KeyboardShortcuts from "./KeyboardShortcuts";
import AIAgentsPage from "./AIAgents";

// ESG & Sustainability
import ESGIntegration from "./features/ESGIntegration";
import CarbonFootprint from "./features/CarbonFootprint";
import ESGReporting from "./ESGReporting";

// Supply Chain & Ethics
import SupplyChainMap from "./features/SupplyChainMap";
import EthicalSourcingAdvisor from "./features/EthicalSourcingAdvisor";
import HumanRightsMonitor from "./features/HumanRightsMonitor";
import RiskMonitoring from "./features/RiskMonitoring";

// Security & Risk
import RiskManagement from "./features/RiskManagement";
import ComplianceAutomation from "./features/ComplianceAutomation";
import BiometricSecurity from "./features/BiometricSecurity";

// Governance
import CorporateGovernance from "./features/CorporateGovernance";
import StakeholderDashboard from "./features/StakeholderDashboard";
import DueDiligence from "./features/DueDiligence";

// Analytics & Intelligence
import PerformanceAnalytics from "./features/PerformanceAnalytics";
import AdvancedAnalytics from "./features/AdvancedAnalytics";
import Analytics from "./Analytics";

// Enterprise Integrations
import SystemIntegration from "./SystemIntegration";
import Sensors from "./Sensors";
import GithubIntegration from "./GithubIntegration";

// Settings & Configuration
import RegionalCompliance from "./features/RegionalCompliance";
import PolicyManagement from "./PolicyManagement";

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
                      {/* Default route */}
                      <Route index element={<Navigate to="dashboard" replace />} />
                      
                      {/* Core Pages */}
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="keyboard-shortcuts" element={<KeyboardShortcuts />} />
                      <Route path="ai-agents" element={<AIAgentsPage />} />
                      
                      {/* ESG & Sustainability */}
                      <Route path="esg-integration" element={<ESGIntegration />} />
                      <Route path="carbon-footprint" element={<CarbonFootprint />} />
                      <Route path="esg-reporting" element={<ESGReporting />} />
                      
                      {/* Supply Chain & Ethics */}
                      <Route path="supply-chain-map" element={<SupplyChainMap />} />
                      <Route path="ethical-sourcing" element={<EthicalSourcingAdvisor />} />
                      <Route path="human-rights" element={<HumanRightsMonitor />} />
                      <Route path="risk-monitoring" element={<RiskMonitoring />} />
                      
                      {/* Security & Risk */}
                      <Route path="risk-management" element={<RiskManagement />} />
                      <Route path="compliance-automation" element={<ComplianceAutomation />} />
                      <Route path="cybersecurity" element={<BiometricSecurity />} />
                      
                      {/* Governance */}
                      <Route path="corporate-governance" element={<CorporateGovernance />} />
                      <Route path="stakeholder-management" element={<StakeholderDashboard />} />
                      <Route path="due-diligence" element={<DueDiligence />} />
                      
                      {/* Analytics & Intelligence */}
                      <Route path="performance-analytics" element={<PerformanceAnalytics />} />
                      <Route path="market-intelligence" element={<AdvancedAnalytics />} />
                      <Route path="alerts" element={<Analytics />} />
                      
                      {/* Enterprise Integrations */}
                      <Route path="erp-integration" element={<SystemIntegration />} />
                      <Route path="iot-networks" element={<Sensors />} />
                      <Route path="smart-contracts" element={<GithubIntegration />} />
                      
                      {/* Settings & Configuration */}
                      <Route path="regional-compliance" element={<RegionalCompliance />} />
                      <Route path="policy-management" element={<PolicyManagement />} />
                      
                      {/* Catch-all route */}
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
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
