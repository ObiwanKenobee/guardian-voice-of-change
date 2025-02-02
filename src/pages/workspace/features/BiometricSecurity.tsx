import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Fingerprint, 
  Shield, 
  Eye, 
  Scan, 
  UserCheck, 
  AlertTriangle,
  Lock,
  Brain,
  LineChart
} from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const BiometricSecurity = () => {
  const { toast } = useToast();
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeVerification, setActiveVerification] = useState<string | null>(null);

  const handleStartVerification = (type: string) => {
    setIsVerifying(true);
    setActiveVerification(type);
    setVerificationProgress(0);
    
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          setActiveVerification(null);
          toast({
            title: "Verification Complete",
            description: `${type} verification was successful.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FeatureLayout
        icon={Fingerprint}
        title="Biometric Security"
        description="Next-generation authentication through privacy-first, AI-powered biometric verification"
      >
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verification Success Rate</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">+0.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">11,234</div>
                  <p className="text-xs text-muted-foreground">+2.5% this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Incidents</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">No security breaches</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">Secure</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Verification Methods</CardTitle>
                  <CardDescription>Available biometric authentication methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: Fingerprint,
                      title: "Fingerprint Scanning",
                      description: "Advanced pattern recognition with AI enhancement",
                      accuracy: 99.9
                    },
                    {
                      icon: Eye,
                      title: "Iris Recognition",
                      description: "High-precision retinal scanning and verification",
                      accuracy: 99.8
                    },
                    {
                      icon: Scan,
                      title: "Facial Recognition",
                      description: "AI-powered facial analysis with liveness detection",
                      accuracy: 99.7
                    }
                  ].map((method, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <method.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{method.title}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {method.accuracy}% accuracy
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Features</CardTitle>
                  <CardDescription>Enhanced security with AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: Brain,
                      title: "Deep Learning",
                      description: "Continuous model improvement"
                    },
                    {
                      icon: AlertTriangle,
                      title: "Fraud Detection",
                      description: "Real-time threat analysis"
                    },
                    {
                      icon: LineChart,
                      title: "Performance",
                      description: "Optimization metrics"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <feature.icon className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Fingerprint,
                  title: "Fingerprint Verification",
                  description: "Scan your fingerprint for secure authentication"
                },
                {
                  icon: Eye,
                  title: "Iris Scan",
                  description: "High-precision iris recognition"
                },
                {
                  icon: Scan,
                  title: "Facial Recognition",
                  description: "AI-powered facial verification"
                }
              ].map((method, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <method.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                    </div>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeVerification === method.title && (
                      <Progress value={verificationProgress} className="mb-2" />
                    )}
                    <Button 
                      className="w-full"
                      onClick={() => handleStartVerification(method.title)}
                      disabled={isVerifying}
                    >
                      {isVerifying && activeVerification === method.title 
                        ? "Verifying..." 
                        : "Start Verification"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Analytics</CardTitle>
                <CardDescription>Real-time security metrics and performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "System Uptime", value: "99.999%", change: "+0.001%" },
                    { label: "Average Response Time", value: "0.3s", change: "-0.1s" },
                    { label: "Successful Verifications", value: "1,234,567", change: "+12.5%" }
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{metric.label}</p>
                        <p className="text-sm text-muted-foreground">{metric.value}</p>
                      </div>
                      <div className="text-sm text-green-500">{metric.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure your biometric security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Configure Security Policies
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="mr-2 h-4 w-4" />
                    Access Control Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="mr-2 h-4 w-4" />
                    AI Model Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </FeatureLayout>
    </motion.div>
  );
};

export default BiometricSecurity;