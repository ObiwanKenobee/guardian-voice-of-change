import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import { Globe } from "../Globe";

export const GlobalOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Global Supply Chain Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <Globe />
        </CardContent>
      </Card>
    </motion.div>
  );
};