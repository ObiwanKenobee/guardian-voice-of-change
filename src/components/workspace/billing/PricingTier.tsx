import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingAddOn {
  name: string;
  price: string;
}

interface PricingTierProps {
  title: string;
  description: string;
  price: string;
  features: PricingFeature[];
  addOns: PricingAddOn[];
  primaryAction: string;
  highlighted?: boolean;
}

export const PricingTier = ({
  title,
  description,
  price,
  features,
  addOns,
  primaryAction,
  highlighted = false,
}: PricingTierProps) => {
  return (
    <Card className={`relative ${highlighted ? 'border-primary shadow-lg' : ''}`}>
      {highlighted && (
        <Badge className="absolute -top-2 right-4">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{price}</div>
            <div className="text-sm text-muted-foreground">per year</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className={`h-4 w-4 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm">{feature.name}</span>
            </div>
          ))}
        </div>
        {addOns.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-2">Available Add-ons:</h4>
            <div className="grid gap-2">
              {addOns.map((addon, index) => (
                <Badge key={index} variant="secondary" className="w-fit">
                  {addon.name}: {addon.price}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">{primaryAction}</Button>
      </CardFooter>
    </Card>
  );
};