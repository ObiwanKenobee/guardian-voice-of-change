
import { Handshake } from "lucide-react";

export const BenefitsSection = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Handshake className="h-12 w-12 text-primary" />
      </div>
      <h2 className="mt-6 text-3xl font-bold gradient-text">
        Let's Build the Future Together
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Join forces with Guardian IO to drive innovation, sustainability, and enterprise-grade solutions that make a difference.
      </p>

      <div className="bg-card p-6 rounded-lg shadow-sm space-y-4 mt-8">
        <h3 className="font-semibold text-lg">Key Benefits</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            Collaborate with Fortune 500 enterprises
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            Gain access to cutting-edge ESG technologies and tools
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            Build a more sustainable and interconnected world
          </li>
        </ul>
      </div>
    </div>
  );
};
