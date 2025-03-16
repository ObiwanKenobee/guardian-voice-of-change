
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MFASetupProps {
  onComplete: (success: boolean) => void;
}

export const MFASetup = ({ onComplete }: MFASetupProps) => {
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('app');

  // Initialize TOTP (Time-based One-Time Password) setup
  const initializeTOTP = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });
      
      if (error) throw error;
      
      setFactorId(data.id);
      setQrCode(data.totp.qr_code);
    } catch (err: any) {
      console.error('MFA enrollment error:', err);
      setError(err.message || 'Failed to initialize MFA setup');
    } finally {
      setLoading(false);
    }
  };

  // Verify the MFA code
  const verifyTOTP = async () => {
    if (!factorId || !verifyCode) {
      setError('Please enter the verification code');
      return;
    }
    
    setEnrolling(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: verifyCode,
      });
      
      if (error) throw error;
      
      toast.success('MFA setup successfully!', {
        description: 'Your account is now protected with multi-factor authentication.',
      });
      
      onComplete(true);
    } catch (err: any) {
      console.error('MFA verification error:', err);
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  // Skip MFA setup
  const skipSetup = () => {
    onComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Set Up Two-Factor Authentication</h2>
        <p className="text-muted-foreground">
          Add an extra layer of security to your account
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="app">Authenticator App</TabsTrigger>
          <TabsTrigger value="sms">SMS Verification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="app" className="space-y-4 mt-4">
          {!qrCode ? (
            <Button 
              onClick={initializeTOTP} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : "Set Up Authenticator App"}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img 
                  src={qrCode} 
                  alt="QR Code for Authenticator App" 
                  className="border p-2 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="verifyCode">Enter verification code</Label>
                <Input
                  id="verifyCode"
                  placeholder="000000"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              
              <Button 
                onClick={verifyTOTP} 
                disabled={enrolling || verifyCode.length !== 6}
                className="w-full"
              >
                {enrolling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : "Verify"}
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sms" className="space-y-4 mt-4">
          <p className="text-muted-foreground">
            SMS verification is coming soon. Please use an authenticator app for now.
          </p>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button variant="ghost" onClick={skipSetup}>
          Skip for now
        </Button>
      </div>
    </div>
  );
};

export default MFASetup;
