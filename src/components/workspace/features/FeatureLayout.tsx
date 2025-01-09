import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureLayoutProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const FeatureLayout = ({ icon: Icon, title, description, children }: FeatureLayoutProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Icon className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};