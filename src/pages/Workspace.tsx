
import { Navigate, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";

// Import all workspace pages
import Dashboard from "@/pages/workspace/Dashboard";
import Profile from "@/pages/workspace/Profile";
import Settings from "@/pages/workspace/Settings";
import KeyboardShortcuts from "@/pages/workspace/KeyboardShortcuts";
import Analytics from "@/pages/workspace/Analytics";
import Compliance from "@/pages/workspace/Compliance";
import ESGReporting from "@/pages/workspace/ESGReporting";
import Partners from "@/pages/workspace/Partners";
import Wildlife from "@/pages/workspace/Wildlife";
import Collaboration from "@/pages/workspace/Collaboration";
import Sensors from "@/pages/workspace/Sensors";
import Team from "@/pages/workspace/Team";
import NewTeam from "@/pages/workspace/NewTeam";
import InviteUsers from "@/pages/workspace/InviteUsers";
import GithubIntegration from "@/pages/workspace/GithubIntegration";
import Support from "@/pages/workspace/Support";
import API from "@/pages/workspace/API";
import SystemIntegration from "@/pages/workspace/SystemIntegration";
import AIAgentsPage from "@/pages/workspace/AIAgents";
import XAPIIntegration from "@/pages/workspace/XAPIIntegration";
import EnterpriseIntegration from "@/pages/workspace/enterprise-integration/EnterpriseIntegration";

// Import feature pages
import RiskManagement from "@/pages/workspace/features/RiskManagement";
import CloudInfrastructure from "@/pages/workspace/features/CloudInfrastructure";
import CorporateGovernance from "@/pages/workspace/features/CorporateGovernance";
import ESGIntegration from "@/pages/workspace/features/ESGIntegration";
import PerformanceAnalytics from "@/pages/workspace/features/PerformanceAnalytics";
import BiometricSecurity from "@/pages/workspace/features/BiometricSecurity";
import DueDiligence from "@/pages/workspace/features/DueDiligence";
import AdvancedAnalytics from "@/pages/workspace/features/AdvancedAnalytics";
import StakeholderDashboard from "@/pages/workspace/features/StakeholderDashboard";
import HumanRightsMonitor from "@/pages/workspace/features/HumanRightsMonitor";
import RiskMonitoring from "@/pages/workspace/features/RiskMonitoring";
import SupplyChainMap from "@/pages/workspace/features/SupplyChainMap";
import EthicalSourcingAdvisor from "@/pages/workspace/features/EthicalSourcingAdvisor";
import CarbonFootprint from "@/pages/workspace/features/CarbonFootprint";
import ComplianceAutomation from "@/pages/workspace/features/ComplianceAutomation";
import RegionalCompliance from "@/pages/workspace/features/RegionalCompliance";
import SupplyChainTransparency from "@/pages/workspace/features/SupplyChainTransparency";
import WildlifeProtection from "@/pages/workspace/features/WildlifeProtection";

const Workspace = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <WorkspaceSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <WorkspaceHeader />
            <main className="flex-1 overflow-hidden">
              <div className="flex h-full">
                <div className="flex-1 overflow-auto">
                  <div className="container mx-auto p-4 md:p-6 max-w-7xl">
                    <Routes>
                      {/* Default route */}
                      <Route index element={<Navigate to="dashboard" replace />} />
                      
                      {/* Main workspace routes */}
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="keyboard-shortcuts" element={<KeyboardShortcuts />} />
                      <Route path="team" element={<Team />} />
                      <Route path="new-team" element={<NewTeam />} />
                      <Route path="invite-users" element={<InviteUsers />} />
                      <Route path="github" element={<GithubIntegration />} />
                      <Route path="support" element={<Support />} />
                      <Route path="api" element={<API />} />
                      <Route path="system-integration" element={<SystemIntegration />} />
                      <Route path="ai-agents" element={<AIAgentsPage />} />
                      <Route path="x-api-integration" element={<XAPIIntegration />} />
                      <Route path="enterprise-integration" element={<EnterpriseIntegration />} />
                      
                      {/* Core Features */}
                      <Route path="features/advanced-analytics" element={<AdvancedAnalytics />} />
                      <Route path="features/performance-analytics" element={<PerformanceAnalytics />} />
                      <Route path="features/due-diligence" element={<DueDiligence />} />
                      <Route path="features/biometric-security" element={<BiometricSecurity />} />
                      <Route path="compliance" element={<Compliance />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="wildlife" element={<Wildlife />} />
                      <Route path="features/wildlife-protection" element={<WildlifeProtection />} />
                      <Route path="features/supply-chain-map" element={<SupplyChainMap />} />
                      <Route path="supply-chain" element={<SupplyChainMap />} />
                      <Route path="features/risk-management" element={<RiskManagement />} />
                      <Route path="features/risk-monitoring" element={<RiskMonitoring />} />
                      <Route path="features/compliance-automation" element={<ComplianceAutomation />} />
                      <Route path="features/ethical-sourcing-advisor" element={<EthicalSourcingAdvisor />} />
                      <Route path="features/stakeholder-dashboard" element={<StakeholderDashboard />} />
                      <Route path="features/corporate-governance" element={<CorporateGovernance />} />
                      <Route path="features/carbon-footprint" element={<CarbonFootprint />} />
                      <Route path="features/regional-compliance" element={<RegionalCompliance />} />
                      <Route path="features/supply-chain-transparency" element={<SupplyChainTransparency />} />
                      <Route path="features/human-rights-monitor" element={<HumanRightsMonitor />} />
                      <Route path="infrastructure" element={<CloudInfrastructure />} />
                      <Route path="sensors" element={<Sensors />} />
                      <Route path="features/esg-integration" element={<ESGIntegration />} />
                      
                      {/* Additional Features */}
                      <Route path="esg-reporting" element={<ESGReporting />} />
                      <Route path="partners" element={<Partners />} />
                      <Route path="collaboration" element={<Collaboration />} />
                      
                      {/* Catch-all route for unmatched paths */}
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Workspace;
