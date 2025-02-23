import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ClipboardList, Bell, Brain, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const QuickActions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIDialog, setShowAIDialog] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would search across your application
      toast.success(`Searching for: ${searchQuery}`);
      // Reset search
      setSearchQuery("");
    }
  };

  const handleTaskManager = () => {
    navigate("/workspace/collaboration");
    toast.success("Redirecting to Task Manager");
  };

  const handleNotifications = () => {
    navigate("/workspace/notifications");
    toast.success("Checking latest notifications");
  };

  const handleAIAdvisor = () => {
    setShowAIDialog(true);
  };

  const handleNewsInsights = () => {
    navigate("/workspace/resources");
    toast.success("Loading latest industry updates");
  };

  const utilities = [
    {
      icon: <Search className="h-4 w-4" />,
      title: "Holistic Search",
      description: "Access insights and wisdom",
      onClick: () => document.getElementById("search-dialog-trigger")?.click(),
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      title: "Harmony Tracker",
      description: "Monitor positive impact goals",
      onClick: handleTaskManager,
    },
    {
      icon: <Bell className="h-4 w-4" />,
      title: "Vital Updates",
      description: "Stay aligned with progress",
      onClick: handleNotifications,
    },
    {
      icon: <Brain className="h-4 w-4" />,
      title: "Wisdom Guide",
      description: "AI-enhanced ethical guidance",
      onClick: handleAIAdvisor,
    },
    {
      icon: <Newspaper className="h-4 w-4" />,
      title: "Global Insights",
      description: "Discover regenerative practices",
      onClick: handleNewsInsights,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="h-full glass-card">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Harmony Tools</CardTitle>
          <CardDescription>Essential resources for positive impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {utilities.map((utility, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3 sm:py-4 px-3 sm:px-4 hover:bg-accent/10 transition-colors"
                onClick={utility.onClick}
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

          {/* Search Dialog */}
          <Dialog>
            <DialogTrigger id="search-dialog-trigger" />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="space-y-4 mt-4">
                <Input
                  placeholder="Search tools and reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* AI Advisor Dialog */}
          <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>AI Advisor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  Your personal AI advisor is here to help. What would you like guidance on?
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success("Analyzing supply chain risks...");
                      setShowAIDialog(false);
                    }}
                  >
                    Analyze Supply Chain Risks
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success("Generating compliance recommendations...");
                      setShowAIDialog(false);
                    }}
                  >
                    Compliance Recommendations
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success("Optimizing sustainability metrics...");
                      setShowAIDialog(false);
                    }}
                  >
                    Sustainability Optimization
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
};
