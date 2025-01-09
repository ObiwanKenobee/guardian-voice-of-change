import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileText, Users, BarChart3, Leaf } from "lucide-react";

const features = [
  {
    icon: <Search className="h-5 w-5 text-primary" />,
    title: "Transparency Toolkit",
    description: "Access real-time supply chain visibility and risk assessments"
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Ethical Sourcing Guide",
    description: "Access best practices and compliance guides"
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Collaboration Hub",
    description: "Connect with ethical partners and join discussions"
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-primary" />,
    title: "ESG Reporting",
    description: "Generate ESG-compliant reports and monitor SDG progress"
  },
  {
    icon: <Leaf className="h-5 w-5 text-primary" />,
    title: "Wildlife Protection",
    description: "Combat wildlife trafficking and protect biodiversity"
  }
];

export const FeatureCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {feature.icon}
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};