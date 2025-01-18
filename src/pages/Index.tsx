import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { IssueAreas } from "@/components/IssueAreas";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately redirect if we're at the root path
    if (window.location.pathname === '/') {
      navigate('/workspace/dashboard', { replace: true });
      return;
    }
  }, [navigate]);

  // Only render the marketing page content if we're not at the root path
  if (window.location.pathname === '/') {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
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