import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Billing = () => {
  const renderFeature = (text: string, included: boolean, info?: string) => (
    <div className="flex items-center space-x-2">
      <Check className={`h-4 w-4 ${included ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className="text-sm">{text}</span>
      {info && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[200px] text-sm">{info}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );

  return (
    <div className="container max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Choose the right plan for your business
        </p>
      </div>

      <Tabs defaultValue="enterprise" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 max-w-3xl mx-auto">
          <TabsTrigger value="enterprise">Fortune 500</TabsTrigger>
          <TabsTrigger value="business">Enterprise</TabsTrigger>
          <TabsTrigger value="sme">SME</TabsTrigger>
          <TabsTrigger value="supplier">Supplier</TabsTrigger>
        </TabsList>

        <div className="mt-8 grid gap-8">
          <TabsContent value="enterprise">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Enterprise Custom Plan</CardTitle>
                    <CardDescription>For Fortune 500 companies</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$50,000+</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  {renderFeature("Full platform access", true)}
                  {renderFeature("24/7 dedicated account manager", true)}
                  {renderFeature("Advanced analytics", true)}
                  {renderFeature("Blockchain verification", true)}
                  {renderFeature("Compliance automation", true)}
                  {renderFeature("Stakeholder management", true)}
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Available Add-ons:</h4>
                  <div className="grid gap-2">
                    <Badge variant="secondary" className="w-fit">Priority Support: $10,000/year</Badge>
                    <Badge variant="secondary" className="w-fit">On-site Compliance Audits: $15,000+</Badge>
                    <Badge variant="secondary" className="w-fit">API Integrations: $20,000</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Premium SaaS Plan</CardTitle>
                    <CardDescription>For large enterprises</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$25,000+</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  {renderFeature("Enterprise-grade tools", true)}
                  {renderFeature("ESG tracking", true)}
                  {renderFeature("Supply chain mapping", true)}
                  {renderFeature("Compliance automation", true)}
                  {renderFeature("Limited stakeholder management", true)}
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Available Add-ons:</h4>
                  <div className="grid gap-2">
                    <Badge variant="secondary" className="w-fit">Dedicated Compliance Specialist: $7,500/year</Badge>
                    <Badge variant="secondary" className="w-fit">Advanced Risk Management: $5,000/year</Badge>
                    <Badge variant="secondary" className="w-fit">Integration Services: $10,000</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sme">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>SME Plans</CardTitle>
                    <CardDescription>For small and medium enterprises</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$500+</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  {renderFeature("ESG monitoring", true)}
                  {renderFeature("Supply chain visualization", true)}
                  {renderFeature("Compliance reporting", true)}
                  {renderFeature("Basic analytics", true)}
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Available Add-ons:</h4>
                  <div className="grid gap-2">
                    <Badge variant="secondary" className="w-fit">Blockchain Verification: $0.10/transaction</Badge>
                    <Badge variant="secondary" className="w-fit">AI-powered Insights: $100/report</Badge>
                    <Badge variant="secondary" className="w-fit">Staff Training: $3,000/session</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Free Trial</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="supplier">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Supplier Plans</CardTitle>
                    <CardDescription>For vendors and subcontractors</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$250+</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  {renderFeature("Compliance tools", true)}
                  {renderFeature("Real-time ESG metrics", true)}
                  {renderFeature("Enterprise client visibility", true)}
                  {renderFeature("Basic reporting", true)}
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Available Add-ons:</h4>
                  <div className="grid gap-2">
                    <Badge variant="secondary" className="w-fit">Compliance Training: $1,500/session</Badge>
                    <Badge variant="secondary" className="w-fit">Performance Reports: $50/report</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Billing;