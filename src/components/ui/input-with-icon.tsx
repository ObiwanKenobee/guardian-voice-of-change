import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

const InputWithIcon = ({ icon: Icon, className, ...props }: InputWithIconProps) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <Input
        className={cn(Icon && "pl-8", className)}
        {...props}
      />
    </div>
  );
};

export { InputWithIcon };