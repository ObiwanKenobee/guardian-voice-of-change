import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Partner from "@/pages/Partner";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import PlatformFeatures from "@/pages/PlatformFeatures";
import Innovations from "@/pages/Innovations";
import Resources from "@/pages/Resources";
import Workspace from "@/pages/Workspace";
import { workspaceRoutes } from "@/pages/workspace";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Router basename="">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/platform-features" element={<PlatformFeatures />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/resources" element={<Resources />} />

            {/* Protected workspace routes */}
            <Route path="/workspace" element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }>
              {workspaceRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster richColors closeButton position="top-center" />
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;