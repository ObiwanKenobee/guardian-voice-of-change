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
import WorkspaceRoutes from "@/pages/workspace";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Router basename="">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/platform-features" element={<PlatformFeatures />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/workspace/*" element={<Workspace />}>
              {WorkspaceRoutes()}
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