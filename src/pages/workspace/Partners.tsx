
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Globe, Network, Building2, ArrowUpRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  industry: string | null;
  location: string | null;
  partnership_type: string;
  status: 'active' | 'inactive' | 'pending';
  description: string | null;
  website_url: string | null;
  contact_email: string | null;
}

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Partner[];
    },
  });

  const activePartners = partners?.filter(p => p.status === 'active') || [];
  const filteredPartners = partners?.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Partner Network</h1>
          <p className="text-muted-foreground text-lg">
            Manage and collaborate with your sustainability partners
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/partner-network" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              View Public Network Page
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activePartners.length}</div>
                <p className="text-xs text-muted-foreground">Across multiple industries</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Reach</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(partners?.map(p => p.location).filter(Boolean)).size}
                </div>
                <p className="text-xs text-muted-foreground">Locations worldwide</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Joint Projects</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 launching soon</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Partners</CardTitle>
              <CardDescription>Latest organizations to join our network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners?.slice(0, 5).map(partner => (
                  <div key={partner.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {partner.logo_url ? (
                        <img 
                          src={partner.logo_url} 
                          alt={partner.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">{partner.industry}</p>
                    </div>
                    <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                      {partner.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="directory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Partner Directory</CardTitle>
                  <CardDescription>Browse and connect with partners</CardDescription>
                </div>
                <Input
                  placeholder="Search partners..."
                  className="w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading partners...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPartners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {partner.logo_url ? (
                              <img 
                                src={partner.logo_url} 
                                alt={partner.name}
                                className="w-6 h-6 rounded-full"
                              />
                            ) : (
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                            )}
                            {partner.name}
                          </div>
                        </TableCell>
                        <TableCell>{partner.industry}</TableCell>
                        <TableCell>{partner.location}</TableCell>
                        <TableCell>{partner.partnership_type}</TableCell>
                        <TableCell>
                          <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                            {partner.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {partner.website_url && (
                            <a 
                              href={partner.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              Visit <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collaborative Projects</CardTitle>
              <CardDescription>Track joint initiatives and projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-lg">Sustainable Supply Chain Initiative</CardTitle>
                      <CardDescription>With 3 partner organizations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge>In Progress</Badge>
                          <span className="text-sm text-muted-foreground">Started 2 months ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Collaborating to implement sustainable practices across the supply chain network.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Partners;
