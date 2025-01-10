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
  { path: "dashboard", element: <Dashboard /> },
  { path: "analytics", element: <Analytics /> },
  { path: "compliance", element: <Compliance /> },
  { path: "supply-chain", element: <SupplyChain /> },
  { path: "wildlife", element: <Wildlife /> },
  { path: "collaboration", element: <Collaboration /> },
  { path: "partners", element: <Partners /> },
  { path: "settings", element: <Settings /> },
  // Features routes
  { path: "advanced-analytics", element: <AdvancedAnalytics /> },
  { path: "biometric-security", element: <BiometricSecurity /> },
  { path: "cloud-infrastructure", element: <CloudInfrastructure /> },
  { path: "compliance-automation", element: <ComplianceAutomation /> },
  { path: "corporate-governance", element: <CorporateGovernance /> },
  { path: "due-diligence", element: <DueDiligence /> },
  { path: "esg-integration", element: <ESGIntegration /> },
  { path: "enterprise-data", element: <EnterpriseData /> },
  { path: "performance-analytics", element: <PerformanceAnalytics /> },
  { path: "risk-management", element: <RiskManagement /> },
  { path: "stakeholder-management", element: <StakeholderManagement /> },
  { path: "supply-chain-map", element: <SupplyChainMap /> },
];