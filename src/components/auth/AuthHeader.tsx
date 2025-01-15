import { Shield } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Shield className="h-12 w-12 text-primary animate-scale-in hover:scale-110 transition-transform duration-200" />
      </div>
      <h2 className="mt-6 text-2xl sm:text-3xl font-bold gradient-text animate-fade-in delay-100">
        {title}
      </h2>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground animate-fade-in delay-200">
        {description}
      </p>
    </div>
  );
};

export default AuthHeader;