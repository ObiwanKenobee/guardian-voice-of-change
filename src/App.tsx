import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";

// Page imports
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import Workspace from "@/pages/Workspace";
import PlatformFeatures from "@/pages/PlatformFeatures";
import Partner from "@/pages/Partner";
import Resources from "@/pages/Resources";
import Innovations from "@/pages/Innovations";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/platform-features" element={<PlatformFeatures />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/innovations" element={<Innovations />} />
            
            {/* Workspace routes */}
            <Route path="/workspace/*" element={<Workspace />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;