import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import ForgotPassword from '@/pages/ForgotPassword';
import Workspace from '@/pages/Workspace';
import PlatformFeatures from '@/pages/PlatformFeatures';
import Resources from '@/pages/Resources';
import Partner from '@/pages/Partner';
import Innovations from '@/pages/Innovations';

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/platform-features" element={<PlatformFeatures />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/innovations" element={<Innovations />} />

        {/* Workspace routes - nested under /workspace */}
        <Route path="/workspace/*" element={<Workspace />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;