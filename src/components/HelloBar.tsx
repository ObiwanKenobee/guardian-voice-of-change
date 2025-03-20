
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { validateEmail } from "@/utils/emailValidation";

export const HelloBar = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Validate email format and deliverability
      const validationResult = await validateEmail(email);
      
      if (!validationResult.is_valid_format) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      if (validationResult.disposable) {
        toast({
          title: "Invalid Email",
          description: "Please don't use disposable email addresses",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // In a real application, you would send this to your backend
      // For demo purposes, we'll simulate a successful submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        toast({
          title: "Thank you!",
          description: "You've been successfully added to our mailing list.",
        });
        
        // Hide the hello bar after success
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }, 1500);
    } catch (error) {
      console.error("Error validating email:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-secondary text-white py-4 shadow-lg"
        >
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <p className="font-medium">
                  Join our newsletter for exclusive updates on sustainable business practices!
                </p>
              </div>
              
              {isSuccess ? (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="utopia-input w-full sm:w-auto min-w-[240px] border-none bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 focus-visible:ring-white/50"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-white text-primary hover:bg-white/90 transition-colors"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-pulse">Processing</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
            
            <button
              onClick={handleClose}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
