
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Gift, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { referralService, Referral } from '@/services/referralService';
import { supabase } from "@/integrations/supabase/client";

export const ReferralProgram = () => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get current user session
  const [session, setSession] = useState(null);
  const [referralUrl, setReferralUrl] = useState('');
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user's referrals
  const { data: referrals, isLoading } = useQuery({
    queryKey: ['referrals'],
    queryFn: referralService.getUserReferrals,
    enabled: !!session,
    onError: (error) => {
      toast({
        title: "Failed to load referrals",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Generate a new referral if needed
  const generateReferralMutation = useMutation({
    mutationFn: referralService.generateReferral,
    onSuccess: (data) => {
      setReferralCode(data.referral_code);
      setReferralUrl(data.referral_url);
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to generate referral",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Submit referral invitation
  const submitReferralMutation = useMutation({
    mutationFn: (email: string) => referralService.submitReferral(referralCode, email),
    onSuccess: () => {
      toast({
        title: "Referral sent!",
        description: "Your invitation has been sent successfully.",
      });
      setEmail('');
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send referral",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    // If user has referrals, use the most recent one
    if (referrals && referrals.length > 0) {
      setReferralCode(referrals[0].referral_code);
      setReferralUrl(referrals[0].referral_url);
    } else if (session && !isLoading) {
      // If no referrals found, generate one
      generateReferralMutation.mutate();
    }
  }, [referrals, session, isLoading]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      toast({
        title: "Referral link copied!",
        description: "Share it with your network to earn rewards.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive"
      });
      return;
    }
    
    submitReferralMutation.mutate(email);
  };
  
  const rewardItems = [
    { 
      icon: <Gift className="w-5 h-5 text-primary" />, 
      title: 'Free Premium Features', 
      description: 'Unlock exclusive features for each successful referral' 
    },
    { 
      icon: <Users className="w-5 h-5 text-primary" />, 
      title: 'Community Access', 
      description: 'Join our VIP community after 3 successful referrals' 
    },
    { 
      icon: <Award className="w-5 h-5 text-primary" />, 
      title: 'Partner Status', 
      description: 'Become an official partner after 10 successful referrals' 
    }
  ];

  const successfulReferrals = referrals?.filter(r => r.status === 'completed') || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-b from-white to-primary/5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Refer & Earn Rewards</CardTitle>
          <CardDescription>
            Invite your network to join Guardian-IO and earn exclusive benefits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="referral-link" className="text-sm font-medium">
              Your Unique Referral Link
            </label>
            <div className="flex">
              <Input
                id="referral-link"
                value={referralUrl}
                readOnly
                className="rounded-r-none bg-muted/50"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="rounded-l-none border-l-0"
                disabled={!referralUrl}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">or invite directly</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || submitReferralMutation.isPending || !referralCode}
              >
                {submitReferralMutation.isPending ? 'Sending...' : 'Invite'}
              </Button>
            </div>
          </form>
          
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-3">Rewards You Can Earn</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rewardItems.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">{item.title}</h5>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Already referred {successfulReferrals.length} users. Keep sharing!</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
