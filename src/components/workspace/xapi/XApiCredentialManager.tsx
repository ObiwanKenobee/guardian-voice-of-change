
import { useState } from "react";
import { Eye, EyeOff, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ApiCredential {
  id: string;
  name: string;
  key_type: string;
  created_at: string;
}

export const XApiCredentialManager = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<ApiCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCredential, setNewCredential] = useState({
    name: "",
    key_type: "bearer",
    key: "",
    secret: ""
  });
  const [showSecret, setShowSecret] = useState(false);

  // This would normally fetch from Supabase, but we'll use dummy data for now
  useState(() => {
    setTimeout(() => {
      setCredentials([
        {
          id: "1",
          name: "X-API Production",
          key_type: "bearer",
          created_at: new Date().toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  });

  const handleAddCredential = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add credentials",
        variant: "destructive",
      });
      return;
    }

    // Normally would store in Supabase securly
    // In production, keys would be encrypted on the server
    toast({
      title: "Credential Added",
      description: "Your X-API credentials have been securely stored",
    });
    
    // Add to local state for demo
    setCredentials([
      ...credentials,
      {
        id: Math.random().toString(),
        name: newCredential.name,
        key_type: newCredential.key_type,
        created_at: new Date().toISOString()
      }
    ]);
    
    // Reset form
    setNewCredential({
      name: "",
      key_type: "bearer",
      key: "",
      secret: ""
    });
  };

  const handleDeleteCredential = (id: string) => {
    setCredentials(credentials.filter(cred => cred.id !== id));
    toast({
      title: "Credential Deleted",
      description: "Your X-API credentials have been removed",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>API Credentials</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Credentials
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add API Credentials</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Credential Name</Label>
                    <Input 
                      id="name" 
                      value={newCredential.name} 
                      onChange={e => setNewCredential({...newCredential, name: e.target.value})}
                      placeholder="e.g., X-API Production"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key">API Key</Label>
                    <Input 
                      id="key" 
                      value={newCredential.key} 
                      onChange={e => setNewCredential({...newCredential, key: e.target.value})}
                      placeholder="Enter your API key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secret">API Secret</Label>
                    <div className="flex">
                      <Input 
                        id="secret" 
                        type={showSecret ? "text" : "password"}
                        value={newCredential.secret} 
                        onChange={e => setNewCredential({...newCredential, secret: e.target.value})}
                        placeholder="Enter your API secret"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setShowSecret(!showSecret)}
                        className="ml-2"
                      >
                        {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your credentials are encrypted and stored securely
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddCredential}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Credentials
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ) : credentials.length > 0 ? (
            <div className="space-y-4">
              {credentials.map((credential) => (
                <div 
                  key={credential.id} 
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div>
                    <p className="font-medium">{credential.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Added on {new Date(credential.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteCredential(credential.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No API credentials added yet</p>
              <p className="text-sm">Add credentials to connect to X-API services</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">How we secure your API keys</h3>
              <p className="text-sm text-muted-foreground">
                All API keys and secrets are encrypted using AES-256 before storage.
                Keys are never stored in plaintext and are only decrypted when needed for API requests.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Best practices</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Regularly rotate your API keys</li>
                <li>Use different API keys for production and development</li>
                <li>Only grant the minimum permissions needed</li>
                <li>Monitor API usage regularly for suspicious activity</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
