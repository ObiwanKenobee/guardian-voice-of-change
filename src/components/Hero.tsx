import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 gradient-text">
          Protecting Our World's Most Vulnerable
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground">
          Join Guardian-IO in the fight against wildlife trafficking and modern slavery through innovative supply chain solutions.
        </p>
        <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
          Learn More <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};