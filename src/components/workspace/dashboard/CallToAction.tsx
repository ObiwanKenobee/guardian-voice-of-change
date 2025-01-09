import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="text-center"
    >
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-6">
          <h3 className="text-2xl font-bold mb-2">Ready to join the movement?</h3>
          <p className="text-muted-foreground mb-4">
            Let's shape the future of ethical business together.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};