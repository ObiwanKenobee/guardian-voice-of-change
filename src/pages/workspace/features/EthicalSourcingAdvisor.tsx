import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Globe, LineChart, AlertTriangle, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SupplierAssessment {
  id: string;
  name: string;
  score: number;
  status: 'compliant' | 'at_risk' | 'non_compliant';
  lastAudit: string;
  riskAreas: string[];
}

const EthicalSourcingAdvisor = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const { data: suppliers, isLoading } = useQuery({
    queryKey: ['supplier-assessments'],
    queryFn: async () => {
      // Simulated data - in production, this would fetch from your Supabase database
      const mockData: SupplierAssessment[] = [
        {
          id: '1',
          name: 'Eco Textiles Co.',
          score: 85,
          status: 'compliant',
          lastAudit: '2024-02-15',
          riskAreas: ['Labor Rights', 'Environmental Impact']
        },
        {
          id: '2',
          name: 'Sustainable Materials Ltd',
          score: 92,
          status: 'compliant',
          lastAudit: '2024-02-10',
          riskAreas: ['Supply Chain Transparency']
        },
        {
          id: '3',
          name: 'Global Manufacturing Inc',
          score: 65,
          status: 'at_risk',
          lastAudit: '2024-01-20',
          riskAreas: ['Working Conditions', 'Environmental Compliance', 'Fair Wages']
        }
      ];
      return mockData;
    }
  });

  const getStatusColor = (status: SupplierAssessment['status']) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-500/10 text-green-500';
      case 'at_risk':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'non_compliant':
        return 'bg-red-500/10 text-red-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/workspace/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Ethical Sourcing Advisor</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered insights and recommendations for sustainable sourcing
          </p>
        </div>
        <Button className="bg-primary">
          <Shield className="mr-2 h-4 w-4" />
          Run Compliance Check
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Compliance Score
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={85} className="h-2" />
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-muted-foreground">
                Based on 50+ compliance metrics
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Suppliers
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-muted-foreground">
                Across 12 countries
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Risk Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">
                Requiring immediate attention
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Supplier Assessment</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid gap-4">
            {suppliers?.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{supplier.name}</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={supplier.score} className="w-32 h-2" />
                        <span className="text-sm text-muted-foreground">
                          {supplier.score}% Compliant
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={getStatusColor(supplier.status)}>
                        {supplier.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Risk Areas:</p>
                    <div className="flex gap-2 mt-2">
                      {supplier.riskAreas.map((area) => (
                        <Badge key={area} variant="secondary">{area}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Based on analysis of your supply chain data and industry best practices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Enhance Supplier Auditing",
                  description: "Implement quarterly audits for high-risk suppliers to ensure continuous compliance.",
                  priority: "High"
                },
                {
                  title: "Sustainable Packaging Initiative",
                  description: "Switch to recyclable packaging materials across all suppliers by Q3 2024.",
                  priority: "Medium"
                },
                {
                  title: "Worker Rights Training",
                  description: "Roll out comprehensive worker rights training program across all supplier facilities.",
                  priority: "High"
                }
              ].map((rec, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>
                Download and view detailed compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Q1 2024 Ethical Sourcing Report",
                    date: "March 15, 2024",
                    type: "Quarterly Report"
                  },
                  {
                    title: "Annual Sustainability Assessment",
                    date: "December 31, 2023",
                    type: "Annual Report"
                  },
                  {
                    title: "Supply Chain Audit Results",
                    date: "February 28, 2024",
                    type: "Audit Report"
                  }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{report.type}</Badge>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EthicalSourcingAdvisor;