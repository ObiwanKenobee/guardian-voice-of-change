import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Partner = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Partner Page (Coming Soon)</h1>
      </div>
    </div>
  );
};

export default Partner;