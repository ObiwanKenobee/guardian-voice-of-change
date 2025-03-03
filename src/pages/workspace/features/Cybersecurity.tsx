
import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Fix the TypeScript errors by using the correct type
const Database = () => null; // Mock implementation

interface VulnerabilityReport {
  id: string;
  name: string;
  status: "resolved" | "open" | "investigating";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  detectedAt: string;
}

const Cybersecurity = () => {
  // Use 'typeof Database' instead of 'Database'
  const [database, setDatabase] = useState<typeof Database | null>(null);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityReport[]>([
    {
      id: "vuln-1",
      name: "SQL Injection Point",
      status: "resolved",
      severity: "high",
      description: "Potential SQL injection vulnerability detected in login form",
      detectedAt: "2023-05-15T14:30:00Z"
    },
    {
      id: "vuln-2",
      name: "Cross-Site Scripting",
      status: "open",
      severity: "medium",
      description: "XSS vulnerability detected in comment system",
      detectedAt: "2023-05-16T09:15:00Z"
    },
    {
      id: "vuln-3",
      name: "API Key Exposure",
      status: "investigating",
      severity: "critical",
      description: "Potential API key exposed in client-side code",
      detectedAt: "2023-05-17T11:45:00Z"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "open": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "investigating": return <Shield className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Cybersecurity Dashboard</h1>
      
      <Alert className="mb-6 border-primary/50 bg-primary/10">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle>Security Status: Strong</AlertTitle>
        <AlertDescription>
          Your system's security posture is currently strong. 2 vulnerabilities need attention.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="vulnerabilities" className="mb-8">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">3</CardTitle>
                <CardDescription>Total Vulnerabilities</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-green-600">1</CardTitle>
                <CardDescription>Resolved</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-orange-600">2</CardTitle>
                <CardDescription>Open Issues</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          {vulnerabilities.map((vulnerability) => (
            <Card key={vulnerability.id} className="mb-4">
              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(vulnerability.status)}
                    <CardTitle>{vulnerability.name}</CardTitle>
                  </div>
                  <CardDescription>Detected {new Date(vulnerability.detectedAt).toLocaleDateString()}</CardDescription>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vulnerability.severity)}`}>
                  {vulnerability.severity}
                </div>
              </CardHeader>
              <CardContent>
                <p>{vulnerability.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure your cybersecurity preferences and protections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Two-Factor Authentication</span>
                </div>
                <Button>Enable</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="font-medium">Automated Vulnerability Scanning</span>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Security Reports</CardTitle>
              <CardDescription>View and download security reports and audits</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No reports available yet.</p>
            </CardContent>
            <CardFooter>
              <Button>Generate Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Cybersecurity;
