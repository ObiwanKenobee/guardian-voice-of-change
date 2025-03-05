
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Shield, 
  Zap, 
  Lock, 
  Link as LinkIcon,
  Gauge,
  LucideIcon
} from "lucide-react";
import { XApiInnovationCard } from "@/components/workspace/xapi/XApiInnovationCard";
import { XApiCredentialManager } from "@/components/workspace/xapi/XApiCredentialManager";
import { XApiIntegrationList } from "@/components/workspace/xapi/XApiIntegrationList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export type Innovation = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  status: "planned" | "concept" | "development" | "alpha" | "beta" | "live";
}

const innovations: Innovation[] = [
  {
    title: "TURBO-X API",
    description: "AI-Driven ESG Optimization & Smart Compliance",
    icon: Zap,
    features: [
      "Real-time ESG API feeds",
      "Pulls live climate policy changes",
      "Integrates with global ESG platforms"
    ],
    status: "beta"
  },
  {
    title: "ULTRA-LINK API NETWORK",
    description: "Blockchain-Connected Supply Chains",
    icon: LinkIcon,
    features: [
      "Uses Hyperledger + Ethereum L2 APIs",
      "Connects IoT-based supply chain sensors",
      "Instant supplier risk analysis"
    ],
    status: "alpha"
  },
  {
    title: "TURBO-ENERGY API",
    description: "Tokenized ESG Incentives & Gamification",
    icon: Activity,
    features: [
      "Integrates with carbon credit platforms",
      "Companies earn Guardian-Tokens for sustainable actions",
      "Syncs with financial platforms"
    ],
    status: "concept"
  },
  {
    title: "N-TEK CYBERSECURITY API",
    description: "Military-Grade ESG Data Protection",
    icon: Lock,
    features: [
      "Biometric authentication for supplier verification",
      "AI-powered fraud detection",
      "Encrypted ESG data storage"
    ],
    status: "planned"
  },
  {
    title: "FUSION-X API",
    description: "AI + Blockchain Synergy for ESG Command Centers",
    icon: Shield,
    features: [
      "Integrates AI, blockchain, and IoT data",
      "Predicts ESG risks with advanced analytics",
      "Automates ESG reporting to agencies"
    ],
    status: "development"
  },
  {
    title: "ESG BLACKLIST API (DREDD SYSTEM)",
    description: "Enforcing Global Accountability",
    icon: Gauge,
    features: [
      "Tracks repeat ESG offenders across networks",
      "Integrates with government sanctions lists",
      "Enforces blockchain-based penalties"
    ],
    status: "planned"
  }
];

const XAPIIntegration = () => {
  const [activeTab, setActiveTab] = useState("innovations");

  const handleConnectInnovation = () => {
    toast.success("Innovation connection initiated", {
      description: "Your request has been received and is being processed."
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">X-API Integrations</h1>
        <p className="text-muted-foreground">
          Deploy powerful cross-platform API integrations to supercharge your ESG compliance ecosystem
        </p>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <CardTitle>TURBO-X API System</CardTitle>
          </div>
          <CardDescription>
            Enhance your compliance capabilities with our cutting-edge X-API platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="innovations">Innovations</TabsTrigger>
              <TabsTrigger value="active">Active Integrations</TabsTrigger>
              <TabsTrigger value="credentials">API Credentials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="innovations" className="p-4">
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {innovations.map((innovation, index) => (
                    <XApiInnovationCard 
                      key={index}
                      innovation={innovation}
                      onConnect={handleConnectInnovation}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="active" className="p-4">
              <XApiIntegrationList />
            </TabsContent>
            
            <TabsContent value="credentials" className="p-4">
              <XApiCredentialManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default XAPIIntegration;
