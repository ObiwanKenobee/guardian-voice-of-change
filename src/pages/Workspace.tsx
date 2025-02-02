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
import SupplyChain from "@/pages/workspace/SupplyChain";
import Wildlife from "@/pages/workspace/Wildlife";
import Collaboration from "@/pages/workspace/Collaboration";
import Sensors from "@/pages/workspace/Sensors";
import StakeholderDashboard from "@/pages/workspace/features/StakeholderDashboard";

// Import feature pages
import RiskManagement from "@/pages/workspace/features/RiskManagement";
import CloudInfrastructure from "@/pages/workspace/features/CloudInfrastructure";
import CorporateGovernance from "@/pages/workspace/features/CorporateGovernance";
import ESGIntegration from "@/pages/workspace/features/ESGIntegration";
import PerformanceAnalytics from "@/pages/workspace/features/PerformanceAnalytics";
import BiometricSecurity from "@/pages/workspace/features/BiometricSecurity";
import DueDiligence from "@/pages/workspace/features/DueDiligence";
import AdvancedAnalytics from "@/pages/workspace/features/AdvancedAnalytics";
import EnterpriseIntegration from "@/pages/workspace/features/EnterpriseIntegration";
import SupplyChainTransparency from "@/pages/workspace/features/SupplyChainTransparency";
import WildlifeProtection from "@/pages/workspace/features/WildlifeProtection";

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
                      
                      {/* Main workspace routes */}
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="keyboard-shortcuts" element={<KeyboardShortcuts />} />
                      
                      {/* Feature routes */}
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="compliance" element={<Compliance />} />
                      <Route path="esg-reporting" element={<ESGReporting />} />
                      <Route path="partners" element={<Partners />} />
                      <Route path="supply-chain" element={<SupplyChain />} />
                      <Route path="wildlife" element={<Wildlife />} />
                      <Route path="collaboration" element={<Collaboration />} />
                      <Route path="sensors" element={<Sensors />} />
                      <Route path="stakeholder-management" element={<StakeholderDashboard />} />
                      
                      {/* Feature routes */}
                      <Route path="risk-management" element={<RiskManagement />} />
                      <Route path="infrastructure" element={<CloudInfrastructure />} />
                      <Route path="corporate-governance" element={<CorporateGovernance />} />
                      <Route path="esg-integration" element={<ESGIntegration />} />
                      <Route path="performance-analytics" element={<PerformanceAnalytics />} />
                      <Route path="biometric-security" element={<BiometricSecurity />} />
                      <Route path="due-diligence" element={<DueDiligence />} />
                      <Route path="advanced-analytics" element={<AdvancedAnalytics />} />
                      <Route path="enterprise-integration" element={<EnterpriseIntegration />} />
                      <Route path="supply-chain-transparency" element={<SupplyChainTransparency />} />
                      <Route path="wildlife-protection" element={<WildlifeProtection />} />
                      
                      {/* Catch-all route for unmatched paths */}
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
