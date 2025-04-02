
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Gift, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReferralProgram = () => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Generate a unique referral code
  const referralCode = 'GUARDIAN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  // Get current URL for sharing
  const referralUrl = `${window.location.origin}?ref=${referralCode}`;
  
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
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Referral sent!",
        description: "Your invitation has been sent successfully.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Invite'}
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
          <p>Already referred 0 users. Keep sharing!</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
