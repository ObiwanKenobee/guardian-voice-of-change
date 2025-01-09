import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Lightbulb, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const resources = [
  {
    title: "Resource Library",
    description: "Access comprehensive guides, reports, and infographics about ethical supply chain practices.",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: "Success Stories",
    description: "Explore real-world case studies and impact stories from our partners.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Events & Webinars",
    description: "Join our educational sessions and networking events to stay updated with industry best practices.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
];

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold gradient-text">Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access valuable resources and educational materials to enhance your understanding of ethical supply chain practices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {resource.icon}
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;