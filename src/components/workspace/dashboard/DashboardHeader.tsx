
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardHeaderProps {
  showBanner: boolean;
}

export const DashboardHeader = ({ showBanner }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="w-full bg-primary/10 rounded-lg overflow-hidden"
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">ESG Integration Activated</h3>
                <p className="text-sm text-muted-foreground">
                  Redirecting to ESG Integration Dashboard...
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-primary animate-bounce" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
