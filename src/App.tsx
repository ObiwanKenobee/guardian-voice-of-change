import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Partner from "@/pages/Partner";
import SignIn from "@/pages/SignIn";
import PlatformFeatures from "@/pages/PlatformFeatures";
import Innovations from "@/pages/Innovations";
import Resources from "@/pages/Resources";

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/platform-features" element={<PlatformFeatures />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;