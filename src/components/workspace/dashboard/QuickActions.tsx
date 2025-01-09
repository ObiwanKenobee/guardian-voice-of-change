import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ClipboardList, Bell, Brain, Newspaper } from "lucide-react";

const utilities = [
  {
    icon: <Search className="h-4 w-4" />,
    title: "Search",
    description: "Quick access to tools and reports"
  },
  {
    icon: <ClipboardList className="h-4 w-4" />,
    title: "Task Manager",
    description: "Track compliance and deadlines"
  },
  {
    icon: <Bell className="h-4 w-4" />,
    title: "Notifications",
    description: "Stay updated on risks and updates"
  },
  {
    icon: <Brain className="h-4 w-4" />,
    title: "AI Advisor",
    description: "Get personalized guidance"
  },
  {
    icon: <Newspaper className="h-4 w-4" />,
    title: "News & Insights",
    description: "Latest industry updates"
  }
];

export const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
          <CardDescription>Essential tools and utilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {utilities.map((utility, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3 sm:py-4 px-3 sm:px-4"
              >
                {utility.icon}
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base">{utility.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {utility.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};