import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { IssueAreas } from "@/components/IssueAreas";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
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