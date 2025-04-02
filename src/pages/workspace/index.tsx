import { Navigate, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load core pages
const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));
const Profile = lazy(() => import("./Profile"));
const KeyboardShortcuts = lazy(() => import("./KeyboardShortcuts"));
const AIAgentsPage = lazy(() => import("./AIAgents"));
const XAPIIntegration = lazy(() => import("./XAPIIntegration"));
const IntegratedAnalytics = lazy(() => import("./IntegratedAnalytics"));

// Lazy load ESG & Sustainability
const ESGIntegration = lazy(() => import("./features/ESGIntegration"));
const CarbonFootprint = lazy(() => import("./features/CarbonFootprint"));
const ESGReporting = lazy(() => import("./ESGReporting"));

// Lazy load Supply Chain & Ethics
const SupplyChain = lazy(() => import("./SupplyChain"));
const EthicalSourcingAdvisor = lazy(() => import("./features/EthicalSourcingAdvisor"));
const HumanRightsMonitor = lazy(() => import("./features/HumanRightsMonitor"));
const RiskMonitoring = lazy(() => import("./features/RiskMonitoring"));
const SupplyChainTransparency = lazy(() => import("./features/SupplyChainTransparency"));

// Lazy load Wildlife Protection
const Wildlife = lazy(() => import("./Wildlife"));

// Lazy load Security & Risk
const RiskManagement = lazy(() => import("./features/RiskManagement"));
const ComplianceAutomation = lazy(() => import("./features/ComplianceAutomation"));
const BiometricSecurity = lazy(() => import("./features/BiometricSecurity"));

// Lazy load Governance
const CorporateGovernance = lazy(() => import("./features/CorporateGovernance"));
const StakeholderDashboard = lazy(() => import("./features/StakeholderDashboard"));
const DueDiligence = lazy(() => import("./features/DueDiligence"));

// Lazy load Analytics & Intelligence
const PerformanceAnalytics = lazy(() => import("./features/PerformanceAnalytics"));
const AdvancedAnalytics = lazy(() => import("./features/AdvancedAnalytics"));
const Analytics = lazy(() => import("./Analytics"));

// Lazy load Enterprise Integrations
const SystemIntegration = lazy(() => import("./SystemIntegration"));
const Sensors = lazy(() => import("./Sensors"));
const GithubIntegration = lazy(() => import("./GithubIntegration"));
const EnterpriseIntegration = lazy(() => import("./enterprise-integration/EnterpriseIntegration"));

// Lazy load Settings & Configuration
const RegionalCompliance = lazy(() => import("./features/RegionalCompliance"));
const PolicyManagement = lazy(() => import("./PolicyManagement"));

// Lazy load Team & Collaboration
const Team = lazy(() => import("./Team"));
const Collaboration = lazy(() => import("./Collaboration"));

// Lazy load Support & API
const Support = lazy(() => import("./Support"));
const API = lazy(() => import("./API"));
const Compliance = lazy(() => import("./Compliance"));

const Workspace = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <WorkspaceSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <WorkspaceHeader />
            <main className="flex-1 overflow-hidden p-4">
              <Routes>
                {/* Default route */}
                <Route index element={<Navigate to="dashboard" replace />} />
                
                {/* Core Pages */}
                <Route path="dashboard" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Dashboard />
                  </Suspense>
                } />
                <Route path="settings" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Settings />
                  </Suspense>
                } />
                <Route path="profile" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Profile />
                  </Suspense>
                } />
                <Route path="keyboard-shortcuts" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <KeyboardShortcuts />
                  </Suspense>
                } />
                <Route path="ai-agents" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AIAgentsPage />
                  </Suspense>
                } />
                <Route path="x-api-integration" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <XAPIIntegration />
                  </Suspense>
                } />
                <Route path="integrated-analytics" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <IntegratedAnalytics />
                  </Suspense>
                } />
                
                {/* ESG & Sustainability */}
                <Route path="features/esg-integration" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ESGIntegration />
                  </Suspense>
                } />
                <Route path="features/carbon-footprint" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <CarbonFootprint />
                  </Suspense>
                } />
                <Route path="esg-reporting" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ESGReporting />
                  </Suspense>
                } />
                
                {/* Supply Chain & Ethics */}
                <Route path="supply-chain" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <SupplyChain />
                  </Suspense>
                } />
                <Route path="features/ethical-sourcing-advisor" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <EthicalSourcingAdvisor />
                  </Suspense>
                } />
                <Route path="features/human-rights-monitor" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HumanRightsMonitor />
                  </Suspense>
                } />
                <Route path="features/risk-monitoring" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <RiskMonitoring />
                  </Suspense>
                } />
                <Route path="features/supply-chain-transparency" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <SupplyChainTransparency />
                  </Suspense>
                } />
                
                {/* Wildlife Protection */}
                <Route path="wildlife" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Wildlife />
                  </Suspense>
                } />
                
                {/* Security & Risk */}
                <Route path="features/risk-management" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <RiskManagement />
                  </Suspense>
                } />
                <Route path="features/compliance-automation" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ComplianceAutomation />
                  </Suspense>
                } />
                <Route path="features/biometric-security" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <BiometricSecurity />
                  </Suspense>
                } />
                
                {/* Governance */}
                <Route path="features/corporate-governance" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <CorporateGovernance />
                  </Suspense>
                } />
                <Route path="features/stakeholder-dashboard" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <StakeholderDashboard />
                  </Suspense>
                } />
                <Route path="features/due-diligence" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <DueDiligence />
                  </Suspense>
                } />
                
                {/* Analytics & Intelligence */}
                <Route path="features/performance-analytics" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PerformanceAnalytics />
                  </Suspense>
                } />
                <Route path="features/advanced-analytics" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AdvancedAnalytics />
                  </Suspense>
                } />
                <Route path="analytics" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Analytics />
                  </Suspense>
                } />
                
                {/* Enterprise Integrations */}
                <Route path="system-integration" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <SystemIntegration />
                  </Suspense>
                } />
                <Route path="sensors" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Sensors />
                  </Suspense>
                } />
                <Route path="github-integration" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <GithubIntegration />
                  </Suspense>
                } />
                <Route path="enterprise-integration" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <EnterpriseIntegration />
                  </Suspense>
                } />
                
                {/* Settings & Configuration */}
                <Route path="features/regional-compliance" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <RegionalCompliance />
                  </Suspense>
                } />
                <Route path="policy-management" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PolicyManagement />
                  </Suspense>
                } />
                
                {/* Team & Collaboration */}
                <Route path="team" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Team />
                  </Suspense>
                } />
                <Route path="collaboration" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Collaboration />
                  </Suspense>
                } />
                
                {/* Support & API */}
                <Route path="support" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Support />
                  </Suspense>
                } />
                <Route path="api" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <API />
                  </Suspense>
                } />
                <Route path="compliance" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Compliance />
                  </Suspense>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Workspace;
