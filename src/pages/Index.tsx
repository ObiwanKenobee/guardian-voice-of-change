import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { IssueAreas } from "@/components/IssueAreas";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/workspace/dashboard', { replace: true });
      return;
    }
  }, [navigate]);

  const handleViewAnalytics = () => {
    navigate('/workspace/performance-analytics');
  };

  if (window.location.pathname === '/') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <Button
              onClick={handleViewAnalytics}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
        <Stats />
        <IssueAreas />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;