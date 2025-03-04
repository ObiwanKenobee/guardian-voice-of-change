
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, Leaf } from "lucide-react";

interface MobileAuthButtonsProps {
  isAuthenticated: boolean;
  onSignOut: () => Promise<void>;
  onClose: () => void;
}

export const MobileAuthButtons = ({ isAuthenticated, onSignOut, onClose }: MobileAuthButtonsProps) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <>
        <Button 
          variant="outline" 
          className="w-full justify-center"
          onClick={() => {
            navigate('/workspace');
            onClose();
          }}
        >
          Go to Workspace
        </Button>
        <Button 
          className="w-full justify-center bg-primary"
          onClick={() => {
            onSignOut();
            onClose();
          }}
        >
          Sign Out
        </Button>
      </>
    );
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full justify-center items-center"
        onClick={() => {
          navigate('/partner');
          onClose();
        }}
      >
        <Leaf className="mr-2 h-4 w-4 text-green-500" />
        Partner With Us
      </Button>
      <Button 
        className="w-full justify-center bg-primary"
        onClick={() => {
          navigate('/sign-in');
          onClose();
        }}
      >
        <LogIn className="mr-2 h-4 w-4" /> Sign In
      </Button>
    </>
  );
};
