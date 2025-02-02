import { Github, Link2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function GithubIntegration() {
  const connectedRepositories = [
    { name: "supply-chain-app", status: "connected", lastSync: "2 hours ago" },
    { name: "compliance-tools", status: "connected", lastSync: "1 day ago" },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">GitHub Integration</h1>
          <p className="text-muted-foreground">Manage your GitHub connections and repositories</p>
        </div>
        <Button>
          <Github className="mr-2 h-4 w-4" />
          Connect Repository
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Repositories</CardTitle>
            <CardDescription>
              Manage your connected GitHub repositories and their sync status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedRepositories.map((repo) => (
                <div
                  key={repo.name}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Github className="h-5 w-5" />
                    <div>
                      <h3 className="font-semibold">{repo.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last synced: {repo.lastSync}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Connected
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Link2 className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}