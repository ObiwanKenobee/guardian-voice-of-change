
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Referral, referralService } from '@/services/referralService';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export function ReferralProgram() {
  const [referralLink, setReferralLink] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Check if user is authenticated
  useState(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    checkAuth();
  });

  // Fetch user's referrals
  const { data: referrals, isLoading, isError } = useQuery({
    queryKey: ['referrals'],
    queryFn: referralService.getUserReferrals,
    onSettled: (data, error) => {
      if (error) {
        console.error("Error fetching referrals:", error);
      }
    },
    enabled: isLoggedIn,
  });

  const generateReferralLink = async () => {
    try {
      if (!isLoggedIn) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return;
      }

      const newReferral = await referralService.generateReferral();
      const link = `${window.location.origin}/?ref=${newReferral.referral_code}`;
      setReferralLink(link);
      
      toast({
        title: "Referral link generated!",
        description: "Your unique referral link is ready to be shared.",
      });
    } catch (error) {
      console.error("Error generating referral:", error);
      toast({
        title: "Error",
        description: "Could not generate referral link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard.",
    });
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Guardian-IO',
          text: 'Check out Guardian-IO for innovative supply chain solutions!',
          url: referralLink,
        });
        toast({
          title: "Shared!",
          description: "Thanks for sharing Guardian-IO.",
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Alert className="bg-primary/10 border-primary/30">
            <Users className="h-4 w-4" />
            <AlertTitle>Authentication required</AlertTitle>
            <AlertDescription>
              Please sign in to generate your unique referral link.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Card className="utopia-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Invite & Earn Rewards
          </CardTitle>
          <CardDescription>
            Invite colleagues to Guardian-IO and earn exclusive rewards when they join.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referral-link">Your Referral Link</Label>
            <div className="flex gap-2">
              <Input
                id="referral-link"
                value={referralLink}
                placeholder="Generate your unique referral link"
                readOnly
                className="font-mono text-xs sm:text-sm bg-background/60"
              />
              {referralLink && (
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={generateReferralLink}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              Generate Link
            </Button>
            
            {referralLink && (
              <Button
                variant="outline"
                onClick={shareReferral}
                className="w-full sm:w-auto"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            )}
          </div>

          {isLoggedIn && !isLoading && referrals && referrals.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Your Referrals</h4>
              <div className="space-y-2">
                {referrals.map((referral: Referral) => (
                  <div key={referral.id} className="text-xs flex justify-between items-center p-2 bg-background/40 rounded-md">
                    <span className="font-mono">{referral.referral_code}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      referral.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : referral.status === 'expired'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {referral.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
