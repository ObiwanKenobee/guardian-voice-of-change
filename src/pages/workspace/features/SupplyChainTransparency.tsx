
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Database, Shield, Eye, Zap, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { SupplyChainMapView } from "@/components/workspace/supply-chain/SupplyChainMapView";
import { SupplyChainControls } from "@/components/workspace/supply-chain/SupplyChainControls";
import { SupplierDirectory } from "@/components/workspace/supply-chain/SupplierDirectory";
import { ShipmentTracking } from "@/components/workspace/supply-chain/ShipmentTracking";

const features = [
  {
    icon: <Database className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Data Aggregation",
    description: "Pull data from suppliers, transport systems, and third-party audits seamlessly into one platform."
  },
  {
    icon: <Globe className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Risk Mapping",
    description: "Identify high-risk regions or suppliers for human rights violations or environmental harm with interactive maps."
  },
  {
    icon: <Eye className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Dynamic Monitoring",
    description: "Track compliance metrics in real-time, ensuring adherence to labor rights and anti-forced labor laws."
  }
];

const innovations = [
  {
    icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "Predictive Analytics",
    description: "Forecast potential disruptions due to geopolitical or economic factors, keeping your operations proactive."
  },
  {
    icon: <Radio className="h-6 w-6 sm:h-8 sm:w-8" />,
    title: "IoT Integration",
    description: "Enable live shipment tracking and compliance validation with IoT-powered monitoring."
  }
];

const SupplyChainTransparency = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8 pb-6 sm:pb-8">
      {/* Back to Dashboard */}
      <Button
        variant="ghost"
        className="mb-2 sm:mb-4"
        onClick={() => navigate("/workspace/dashboard")}
      >
        <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-sm sm:text-base">Back to Dashboard</span>
      </Button>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 sm:space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight gradient-text">
          Supply Chain Transparency Dashboard
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
          Real-time visibility and control over your global supply chain operations
        </p>
      </motion.section>

      {/* Main Dashboard Section */}
      <div className="space-y-4 sm:space-y-6">
        <SupplyChainControls />
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="h-[250px] sm:h-[350px] md:h-[400px]">
                <SupplyChainMapView />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <ShipmentTracking />
          <SupplierDirectory />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-6 sm:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-8">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6 space-y-2 sm:space-y-4">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Innovations Section */}
      <section className="py-6 sm:py-12 bg-primary/5 rounded-lg">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-8">Latest Innovations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {innovations.map((innovation, index) => (
              <motion.div
                key={innovation.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex items-start space-x-3 sm:space-x-4"
              >
                <div className="text-primary mt-1">{innovation.icon}</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{innovation.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{innovation.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupplyChainTransparency;
