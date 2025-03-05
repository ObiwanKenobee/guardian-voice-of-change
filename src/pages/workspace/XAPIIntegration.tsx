
import { useState } from "react";
import { 
  BarChart3, 
  Shield, 
  Zap, 
  Link, 
  Lock, 
  Command, 
  ListFilter,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { XApiCredentialManager } from "@/components/workspace/xapi/XApiCredentialManager";
import { XApiInnovationCard } from "@/components/workspace/xapi/XApiInnovationCard";
import { XApiIntegrationList } from "@/components/workspace/xapi/XApiIntegrationList";

export default function XAPIIntegration() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("innovations");

  const handleConnect = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is currently under development",
    });
  };

  const innovations = [
    {
      title: "TURBO-X API",
      description: "AI-Driven ESG Optimization & Smart Compliance",
      icon: Zap,
      features: [
        "Real-time ESG API feeds",
        "Pulls live climate policy changes",
        "Monitors carbon emissions data",
        "Integrates with global ESG rating platforms"
      ],
      status: "development"
    },
    {
      title: "ULTRA-LINK API NETWORK",
      description: "Blockchain-Connected Supply Chains",
      icon: Link,
      features: [
        "Creates real-time, decentralized ESG compliance network",
        "Uses Hyperledger + Ethereum L2 APIs",
        "Connects IoT-based supply chain sensors",
        "Provides instant supplier risk analysis"
      ],
      status: "planned"
    },
    {
      title: "TURBO-ENERGY API",
      description: "Tokenized ESG Incentives & Gamification",
      icon: BarChart3,
      features: [
        "Gamified Token Economy for ESG Compliance",
        "Integrates with carbon credit platforms",
        "Companies earn Guardian-Tokens (G-Tokens)",
        "API syncs with financial platforms"
      ],
      status: "planned"
    },
    {
      title: "N-TEK CYBERSECURITY API",
      description: "Military-Grade ESG Data Protection",
      icon: Shield,
      features: [
        "Integrates biometric authentication APIs",
        "Uses AI-powered fraud detection",
        "Provides encrypted ESG data storage",
        "Prevents greenwashing through verification"
      ],
      status: "development"
    },
    {
      title: "FUSION-X API",
      description: "AI + Blockchain Synergy for ESG Command Centers",
      icon: Command,
      features: [
        "High-performance ESG compliance dashboard",
        "Integrates AI, blockchain, and IoT data",
        "Predicts ESG risks",
        "Automates ESG reporting"
      ],
      status: "alpha"
    },
    {
      title: "ESG BLACKLIST API (DREDD SYSTEM)",
      description: "Enforcing Global Accountability",
      icon: ListFilter,
      features: [
        "Global ESG Blacklist & Sanctions System",
        "Tracks repeat ESG offenders",
        "Integrates with government sanctions lists",
        "Enforces blockchain-based penalties"
      ],
      status: "concept"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <FeatureLayout
        icon={Zap}
        title="X-API Integration System"
        description="Max Steel-Inspired Innovations with X-API Integrations for enhanced ESG compliance"
      >
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="innovations">Innovations</TabsTrigger>
              <TabsTrigger value="integrations">Active Integrations</TabsTrigger>
              <TabsTrigger value="credentials">API Credentials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="innovations" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {innovations.map((innovation, index) => (
                  <XApiInnovationCard 
                    key={index}
                    innovation={innovation}
                    onConnect={handleConnect}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6 mt-6">
              <XApiIntegrationList />
            </TabsContent>
            
            <TabsContent value="credentials" className="space-y-6 mt-6">
              <XApiCredentialManager />
            </TabsContent>
          </Tabs>
        </div>
      </FeatureLayout>
    </div>
  );
}
