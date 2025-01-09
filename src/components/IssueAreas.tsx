import { Shield, Users, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const issues = [
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: "Supply Chain Solutions",
    description:
      "Innovative technology to ensure transparency and ethical practices across global supply chains.",
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Human Rights",
    description:
      "Fighting modern slavery through detection, prevention, and advocacy.",
  },
  {
    icon: <Leaf className="h-12 w-12 text-primary" />,
    title: "Wildlife Protection",
    description:
      "Combating wildlife trafficking to preserve biodiversity and protect endangered species.",
  },
];

export const IssueAreas = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          Our Focus Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {issues.map((issue, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{issue.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
              <p className="text-muted-foreground">{issue.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};