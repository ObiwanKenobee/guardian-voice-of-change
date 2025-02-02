import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Team from "./pages/workspace/Team";
import InviteUsers from "./pages/workspace/InviteUsers";
import NewTeam from "./pages/workspace/NewTeam";
import GithubIntegration from "./pages/workspace/GithubIntegration";
import Support from "./pages/workspace/Support";
import API from "./pages/workspace/API";
import Dashboard from "./pages/workspace/Dashboard";
import Profile from "./pages/workspace/Profile";
import Settings from "./pages/workspace/Settings";
import KeyboardShortcuts from "./pages/workspace/KeyboardShortcuts";
import PlatformFeatures from "./pages/PlatformFeatures";
import Innovations from "./pages/Innovations";
import Resources from "./pages/Resources";
import Partner from "./pages/Partner";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/platform-features" element={<PlatformFeatures />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/workspace" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="keyboard-shortcuts" element={<KeyboardShortcuts />} />
            <Route path="team" element={<Team />} />
            <Route path="invite-users" element={<InviteUsers />} />
            <Route path="new-team" element={<NewTeam />} />
            <Route path="github" element={<GithubIntegration />} />
            <Route path="support" element={<Support />} />
            <Route path="api" element={<API />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}