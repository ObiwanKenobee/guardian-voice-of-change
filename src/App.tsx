
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SecurityProvider } from '@/components/security/SecurityProvider';
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { BrowserRouter } from "react-router-dom";

// Lazy load components
const Layout = lazy(() => import("@/components/layout/Layout"));
const Index = lazy(() => import("@/pages/Index"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Workspace = lazy(() => import("@/pages/workspace"));
const Partner = lazy(() => import("@/pages/Partner"));
const GuardianNature = lazy(() => import("@/pages/GuardianNature"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const CompleteProfile = lazy(() => import("@/pages/CompleteProfile"));

function App() {
  return (
    <BrowserRouter>
      <SecurityProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Layout />
              </Suspense>
            }>
              <Route index element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Index />
                </Suspense>
              } />
              <Route path="guardian-nature" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <GuardianNature />
                </Suspense>
              } />
            </Route>
            <Route path="/sign-in" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SignIn />
              </Suspense>
            } />
            <Route path="/sign-up" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SignUp />
              </Suspense>
            } />
            <Route path="/forgot-password" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ForgotPassword />
              </Suspense>
            } />
            <Route path="/partner" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Partner />
              </Suspense>
            } />
            <Route path="/auth/callback" element={
              <Suspense fallback={<LoadingSpinner />}>
                <AuthCallback />
              </Suspense>
            } />
            <Route path="/complete-profile" element={
              <Suspense fallback={<LoadingSpinner />}>
                <CompleteProfile />
              </Suspense>
            } />
            
            {/* Protected Workspace Routes */}
            <Route path="/workspace/*" element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <Workspace />
                </Suspense>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </SecurityProvider>
    </BrowserRouter>
  );
}

export default App;
