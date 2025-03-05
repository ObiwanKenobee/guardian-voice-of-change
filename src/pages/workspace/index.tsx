
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
import XAPIIntegration from "./XAPIIntegration";

// ESG & Sustainability
import ESGIntegration from "./features/ESGIntegration";
import CarbonFootprint from "./features/CarbonFootprint";
import ESGReporting from "./ESGReporting";

// Supply Chain & Ethics
import SupplyChainMap from "./features/SupplyChainMap";
import EthicalSourcingAdvisor from "./features/EthicalSourcingAdvisor";
import HumanRightsMonitor from "./features/HumanRightsMonitor";
import RiskMonitoring from "./features/RiskMonitoring";
import SupplyChainTransparency from "./features/SupplyChainTransparency";

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
import EnterpriseIntegration from "./enterprise-integration/EnterpriseIntegration";

// Settings & Configuration
import RegionalCompliance from "./features/RegionalCompliance";
import PolicyManagement from "./PolicyManagement";

// Wildlife Protection
import Wildlife from "./Wildlife";

// Team & Collaboration
import Team from "./Team";
import Collaboration from "./Collaboration";

// Support & API
import Support from "./Support";
import API from "./API";
import Compliance from "./Compliance";

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
                      <Route path="x-api-integration" element={<XAPIIntegration />} />
                      
                      {/* ESG & Sustainability */}
                      <Route path="features/esg-integration" element={<ESGIntegration />} />
                      <Route path="features/carbon-footprint" element={<CarbonFootprint />} />
                      <Route path="esg-reporting" element={<ESGReporting />} />
                      
                      {/* Supply Chain & Ethics */}
                      <Route path="supply-chain" element={<SupplyChainMap />} />
                      <Route path="features/ethical-sourcing-advisor" element={<EthicalSourcingAdvisor />} />
                      <Route path="features/human-rights-monitor" element={<HumanRightsMonitor />} />
                      <Route path="features/risk-monitoring" element={<RiskMonitoring />} />
                      <Route path="features/supply-chain-transparency" element={<SupplyChainTransparency />} />
                      
                      {/* Security & Risk */}
                      <Route path="features/risk-management" element={<RiskManagement />} />
                      <Route path="features/compliance-automation" element={<ComplianceAutomation />} />
                      <Route path="features/biometric-security" element={<BiometricSecurity />} />
                      
                      {/* Governance */}
                      <Route path="features/corporate-governance" element={<CorporateGovernance />} />
                      <Route path="features/stakeholder-dashboard" element={<StakeholderDashboard />} />
                      <Route path="features/due-diligence" element={<DueDiligence />} />
                      
                      {/* Analytics & Intelligence */}
                      <Route path="features/performance-analytics" element={<PerformanceAnalytics />} />
                      <Route path="features/advanced-analytics" element={<AdvancedAnalytics />} />
                      <Route path="analytics" element={<Analytics />} />
                      
                      {/* Enterprise Integrations */}
                      <Route path="system-integration" element={<SystemIntegration />} />
                      <Route path="sensors" element={<Sensors />} />
                      <Route path="github-integration" element={<GithubIntegration />} />
                      <Route path="enterprise-integration" element={<EnterpriseIntegration />} />
                      
                      {/* Settings & Configuration */}
                      <Route path="features/regional-compliance" element={<RegionalCompliance />} />
                      <Route path="policy-management" element={<PolicyManagement />} />
                      
                      {/* Wildlife Protection */}
                      <Route path="wildlife" element={<Wildlife />} />
                      
                      {/* Team & Collaboration */}
                      <Route path="team" element={<Team />} />
                      <Route path="collaboration" element={<Collaboration />} />
                      
                      {/* Support & API */}
                      <Route path="support" element={<Support />} />
                      <Route path="api" element={<API />} />
                      <Route path="compliance" element={<Compliance />} />
                      
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
