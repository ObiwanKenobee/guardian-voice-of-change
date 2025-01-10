import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import Compliance from "./Compliance";
import SupplyChain from "./SupplyChain";
import Wildlife from "./Wildlife";
import Collaboration from "./Collaboration";
import Partners from "./Partners";
import Settings from "./Settings";

// Features routes
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

export const workspaceRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "analytics", element: <Analytics /> },
  { path: "compliance", element: <Compliance /> },
  { path: "supply-chain", element: <SupplyChain /> },
  { path: "wildlife", element: <Wildlife /> },
  { path: "collaboration", element: <Collaboration /> },
  { path: "partners", element: <Partners /> },
  { path: "settings", element: <Settings /> },
  // Features routes
  { path: "features/advanced-analytics", element: <AdvancedAnalytics /> },
  { path: "features/biometric-security", element: <BiometricSecurity /> },
  { path: "features/cloud-infrastructure", element: <CloudInfrastructure /> },
  { path: "features/compliance-automation", element: <ComplianceAutomation /> },
  { path: "features/corporate-governance", element: <CorporateGovernance /> },
  { path: "features/due-diligence", element: <DueDiligence /> },
  { path: "features/esg-integration", element: <ESGIntegration /> },
  { path: "features/enterprise-data", element: <EnterpriseData /> },
  { path: "features/performance-analytics", element: <PerformanceAnalytics /> },
  { path: "features/risk-management", element: <RiskManagement /> },
  { path: "features/stakeholder-management", element: <StakeholderManagement /> },
  { path: "features/supply-chain-map", element: <SupplyChainMap /> },
];