import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";

// Lazy load page components
const Index = lazy(() => import("@/pages/Index"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Workspace = lazy(() => import("@/pages/Workspace"));
const PlatformFeatures = lazy(() => import("@/pages/PlatformFeatures"));
const Partner = lazy(() => import("@/pages/Partner"));
const Resources = lazy(() => import("@/pages/Resources"));
const Innovations = lazy(() => import("@/pages/Innovations"));
const PerformanceAnalytics = lazy(() => import("@/pages/workspace/features/PerformanceAnalytics"));

const queryClient = new QueryClient();

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 flex flex-col min-w-0">
        <WorkspaceHeader />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full">
            <div className="flex-1 overflow-auto">
              <Suspense fallback={<PageLoader />}>
                {children}
              </Suspense>
            </div>
            <WorkspaceSidebar />
          </div>
        </main>
      </div>
    </div>
  );
};

// Public Layout component
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <Routes>
              {/* Public routes with Navbar */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/platform-features" element={<PlatformFeatures />} />
                <Route path="/partner" element={<Partner />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/innovations" element={<Innovations />} />
              </Route>

              {/* Protected routes with WorkspaceHeader and WorkspaceSidebar */}
              <Route path="/workspace/*" element={
                <ProtectedRoute>
                  <Workspace />
                </ProtectedRoute>
              } />
              <Route path="/workspace/performance-analytics" element={
                <ProtectedRoute>
                  <PerformanceAnalytics />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;