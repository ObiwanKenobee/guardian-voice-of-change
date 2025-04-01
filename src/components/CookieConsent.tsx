
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (cookieConsent === null) {
      // Only show banner if no choice has been made yet
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-border",
      "shadow-lg md:flex md:items-center md:justify-between",
      "animate-slide-up"
    )}>
      <div className="flex items-center">
        <Cookie className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
        <div className="text-sm md:text-base">
          <p className="font-medium">We use cookies to enhance your experience.</p>
          <p className="text-muted-foreground">
            We use cookies to understand how you use our site and to improve your browsing experience.
          </p>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex gap-3 items-center md:ml-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDecline} 
          className="flex-1 md:flex-none"
        >
          Decline
        </Button>
        <Button 
          size="sm" 
          onClick={handleAccept} 
          className="flex-1 md:flex-none"
        >
          Accept All Cookies
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto md:ml-0" 
          onClick={handleDecline}
          aria-label="Close cookie banner"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
