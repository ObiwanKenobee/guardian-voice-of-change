
import { useState, useEffect } from "react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Shield, AlertTriangle, Check, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

interface SecurityIncident {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved" | "closed";
  created_at: string;
  description: string;
}

const Cybersecurity = () => {
  const [securityScore, setSecurityScore] = useState(78);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading security incidents
    const timer = setTimeout(() => {
      // Mock data for security incidents
      const mockIncidents: SecurityIncident[] = [
        {
          id: "1",
          title: "Suspicious login attempt",
          severity: "medium",
          status: "resolved",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          description: "Multiple failed login attempts from unusual location."
        },
        {
          id: "2",
          title: "Data export anomaly",
          severity: "low",
          status: "closed",
          created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
          description: "Larger than usual data export detected and verified as authorized."
        }
      ];
      
      setIncidents(mockIncidents);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-blue-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-orange-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "investigating": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const runSecurityScan = () => {
    setLoading(true);
    
    // Simulate security scan
    setTimeout(() => {
      setSecurityScore(Math.floor(Math.random() * 15) + 75); // Random score between 75-90
      setLoading(false);
    }, 2000);
  };

  return (
    <FeatureLayout 
      title="Cybersecurity" 
      description="Monitor and manage cybersecurity concerns, threats, and policies"
      icon={<Shield className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Security Health Score</span>
              <Button variant="outline" size="sm" onClick={runSecurityScan} disabled={loading}>
                Run Scan
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-full mb-4">
                <Progress value={securityScore} className="h-3" />
              </div>
              <p className="text-4xl font-bold">{securityScore}/100</p>
              <p className="text-sm text-muted-foreground mt-2">
                {securityScore > 80 
                  ? "Good security posture" 
                  : securityScore > 60 
                    ? "Moderate security concerns" 
                    : "Critical security issues detected"}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Email verification enabled</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <span>Data encryption implemented</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <span>Consider enabling two-factor authentication</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <span>Update user password policy</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Alert className="mb-6">
        <Lock className="h-4 w-4" />
        <AlertTitle>Security Protocols Active</AlertTitle>
        <AlertDescription>
          Your platform is protected with input validation, content security policy, CSRF protection, 
          and data encryption. Regular security audits are recommended.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Recent Security Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-6">
              <div className="animate-pulse text-center">
                <p className="text-muted-foreground">Loading security data...</p>
              </div>
            </div>
          ) : incidents.length > 0 ? (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <span className={`w-2 h-2 rounded-full ${getSeverityColor(incident.severity)} mr-2`}></span>
                        {incident.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{incident.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Reported: {new Date(incident.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No security incidents reported</p>
            </div>
          )}
        </CardContent>
      </Card>
    </FeatureLayout>
  );
};

export default Cybersecurity;
