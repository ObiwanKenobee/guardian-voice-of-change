import { Fingerprint, Shield, Eye, Scan, UserCheck, AlertTriangle } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const BiometricSecurity = () => {
  const { toast } = useToast();
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleStartVerification = () => {
    setIsVerifying(true);
    setVerificationProgress(0);
    
    // Simulate verification process
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          toast({
            title: "Verification Complete",
            description: "Biometric verification was successful.",
          });
          return 100;
        }
        return prev + 20;
      });
    }, 1000);
  };

  return (
    <FeatureLayout
      icon={Fingerprint}
      title="Biometric Security"
      description="World ID technology provides state-of-the-art biometric verification for secure identity management."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Verification Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Last verified 2 hours ago
            </p>
            {isVerifying && (
              <Progress value={verificationProgress} className="mt-2" />
            )}
          </CardContent>
        </Card>

        {/* Identity Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Identity Score</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">
              High confidence level
            </p>
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No active security alerts
            </p>
          </CardContent>
        </Card>

        {/* Biometric Features */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Biometric Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center space-x-4">
                <Fingerprint className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Fingerprint Scanning</div>
                  <p className="text-sm text-muted-foreground">Advanced pattern recognition</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Eye className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Iris Recognition</div>
                  <p className="text-sm text-muted-foreground">High-precision scanning</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Scan className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">Facial Recognition</div>
                  <p className="text-sm text-muted-foreground">AI-powered analysis</p>
                </div>
              </div>
            </div>
            <Button 
              className="mt-6 w-full md:w-auto"
              onClick={handleStartVerification}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Start Verification"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </FeatureLayout>
  );
};

export default BiometricSecurity;