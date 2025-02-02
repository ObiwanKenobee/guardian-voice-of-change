import { Cloud, Key, RefreshCw, Copy, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function API() {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk_live_example_key_123456789");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard");
  };

  const regenerateKey = () => {
    // Here you would typically make an API call to regenerate the key
    toast.success("API key regenerated successfully");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Manage your API keys and access tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your API Key</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      readOnly
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button variant="outline" onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" onClick={regenerateKey}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Quick Start</h3>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm">Use this key in your API requests:</p>
                  <pre className="bg-background p-2 rounded text-sm">
                    {`curl -H "Authorization: Bearer ${apiKey.slice(0, 8)}..." \\
  https://api.example.com/v1/data`}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Rate Limits</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">1000</div>
                        <div className="text-sm text-muted-foreground">
                          Requests / Day
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">100</div>
                        <div className="text-sm text-muted-foreground">
                          Requests / Minute
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">5 MB</div>
                        <div className="text-sm text-muted-foreground">
                          Max Payload Size
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}