import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import Workspace from "@/pages/workspace";
import Partner from "@/pages/Partner";
import GuardianNature from "@/pages/GuardianNature";
import { SecurityProvider } from '@/components/security/SecurityProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SecurityProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="guardian-nature" element={<GuardianNature />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/workspace/*" element={<Workspace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </SecurityProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
