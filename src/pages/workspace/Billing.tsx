import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingTier } from "@/components/workspace/billing/PricingTier";
import { PricingHeader } from "@/components/workspace/billing/PricingHeader";

const Billing = () => {
  const fortune500Features = [
    { name: "Full platform access", included: true },
    { name: "24/7 dedicated account manager", included: true },
    { name: "Advanced analytics", included: true },
    { name: "Blockchain verification", included: true },
    { name: "Compliance automation", included: true },
    { name: "Stakeholder management", included: true },
  ];

  const fortune500AddOns = [
    { name: "Priority Support", price: "$10,000/year" },
    { name: "On-site Compliance Audits", price: "$15,000+" },
    { name: "API Integrations", price: "$20,000" },
  ];

  const enterpriseFeatures = [
    { name: "Enterprise-grade tools", included: true },
    { name: "ESG tracking", included: true },
    { name: "Supply chain mapping", included: true },
    { name: "Compliance automation", included: true },
    { name: "Limited stakeholder management", included: true },
  ];

  const enterpriseAddOns = [
    { name: "Dedicated Compliance Specialist", price: "$7,500/year" },
    { name: "Advanced Risk Management", price: "$5,000/year" },
    { name: "Integration Services", price: "$10,000" },
  ];

  const smeFeatures = [
    { name: "ESG monitoring", included: true },
    { name: "Supply chain visualization", included: true },
    { name: "Compliance reporting", included: true },
    { name: "Basic analytics", included: true },
  ];

  const smeAddOns = [
    { name: "Blockchain Verification", price: "$0.10/transaction" },
    { name: "AI-powered Insights", price: "$100/report" },
    { name: "Staff Training", price: "$3,000/session" },
  ];

  const supplierFeatures = [
    { name: "Compliance tools", included: true },
    { name: "Real-time ESG metrics", included: true },
    { name: "Enterprise client visibility", included: true },
    { name: "Basic reporting", included: true },
  ];

  const supplierAddOns = [
    { name: "Compliance Training", price: "$1,500/session" },
    { name: "Performance Reports", price: "$50/report" },
  ];

  return (
    <div className="container max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <PricingHeader />

      <Tabs defaultValue="enterprise" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 max-w-3xl mx-auto">
          <TabsTrigger value="enterprise">Fortune 500</TabsTrigger>
          <TabsTrigger value="business">Enterprise</TabsTrigger>
          <TabsTrigger value="sme">SME</TabsTrigger>
          <TabsTrigger value="supplier">Supplier</TabsTrigger>
        </TabsList>

        <div className="mt-8 grid gap-8">
          <TabsContent value="enterprise">
            <PricingTier
              title="Enterprise Custom Plan"
              description="For Fortune 500 companies"
              price="$50,000+"
              features={fortune500Features}
              addOns={fortune500AddOns}
              primaryAction="Contact Sales"
              highlighted={true}
            />
          </TabsContent>

          <TabsContent value="business">
            <PricingTier
              title="Premium SaaS Plan"
              description="For large enterprises"
              price="$25,000+"
              features={enterpriseFeatures}
              addOns={enterpriseAddOns}
              primaryAction="Get Started"
            />
          </TabsContent>

          <TabsContent value="sme">
            <PricingTier
              title="SME Plans"
              description="For small and medium enterprises"
              price="$500+"
              features={smeFeatures}
              addOns={smeAddOns}
              primaryAction="Start Free Trial"
            />
          </TabsContent>

          <TabsContent value="supplier">
            <PricingTier
              title="Supplier Plans"
              description="For vendors and subcontractors"
              price="$250+"
              features={supplierFeatures}
              addOns={supplierAddOns}
              primaryAction="Get Started"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Billing;