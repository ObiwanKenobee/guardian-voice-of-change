
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className="m-4 hover:bg-white/20"
      onClick={() => navigate('/')}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Home
    </Button>
  );
};
