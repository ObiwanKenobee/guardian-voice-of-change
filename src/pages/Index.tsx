import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { IssueAreas } from "@/components/IssueAreas";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/workspace/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <main className="flex-grow">
      <Hero />
      <Stats />
      <IssueAreas />
      <Features />
      <CallToAction />
    </main>
  );
};

export default Index;