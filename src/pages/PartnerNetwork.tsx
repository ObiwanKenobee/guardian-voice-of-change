
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Building2, Globe, Network, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const PartnerNetwork = () => {
  const industries = [
    { name: "Technology", count: 83, icon: <Network className="h-5 w-5 text-primary/80" /> },
    { name: "Renewable Energy", count: 47, icon: <Globe className="h-5 w-5 text-primary/80" /> },
    { name: "Conservation", count: 62, icon: <Globe className="h-5 w-5 text-primary/80" /> },
    { name: "Manufacturing", count: 38, icon: <Building2 className="h-5 w-5 text-primary/80" /> },
    { name: "Research", count: 29, icon: <Network className="h-5 w-5 text-primary/80" /> },
    { name: "Logistics", count: 41, icon: <Network className="h-5 w-5 text-primary/80" /> },
  ];

  const featuredPartners = [
    { 
      name: "EcoTech Solutions", 
      type: "Technology", 
      description: "Pioneering sustainable technology solutions for global challenges.",
      location: "San Francisco, USA"
    },
    { 
      name: "GreenEnergy Innovations", 
      type: "Renewable Energy", 
      description: "Leading provider of renewable energy technologies and solutions.",
      location: "Copenhagen, Denmark"
    },
    { 
      name: "BioDiversity Alliance", 
      type: "Conservation", 
      description: "Global coalition dedicated to preserving biodiversity and ecosystems.",
      location: "Nairobi, Kenya"
    },
    { 
      name: "SustainableTech Corp", 
      type: "Technology", 
      description: "Creating technological solutions for sustainability challenges.",
      location: "Tokyo, Japan"
    },
  ];

  const successStories = [
    {
      title: "Amazon Basin Restoration Project",
      partners: ["BioDiversity Alliance", "EcoTech Solutions"],
      impact: "Restored 25,000 hectares of rainforest and protected 120+ endangered species",
      year: 2023
    },
    {
      title: "Sustainable Urban Development Initiative",
      partners: ["GreenEnergy Innovations", "SustainableTech Corp"],
      impact: "Reduced urban carbon footprint by 35% across 12 major cities",
      year: 2022
    },
    {
      title: "Ethical Supply Chain Transformation",
      partners: ["EcoTech Solutions", "Global Logistics Partners"],
      impact: "Eliminated child labor from supply chains of 28 global corporations",
      year: 2024
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <SEOHead 
        title="Partner Network | Guardian-IO"
        description="Explore Guardian-IO's global network of partners working together to create sustainable and ethical supply chains worldwide."
        keywords={[
          "sustainability partners",
          "ethical supply chain network",
          "environmental business alliance",
          "corporate responsibility partners",
          "global sustainability network"
        ]}
        ogType="website"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">Global Partner Network</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Our worldwide alliance of forward-thinking organizations committed to creating 
            transparent, ethical supply chains that protect vulnerable ecosystems and communities.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">500+</CardTitle>
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardDescription>Active Partners</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Organizations across sectors committed to our shared mission of sustainability
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">150+</CardTitle>
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardDescription>Countries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Global reach with local expertise across six continents
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">85%</CardTitle>
                <Network className="h-6 w-6 text-primary" />
              </div>
              <CardDescription>Collaboration Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Partners actively collaborating on multiple sustainability initiatives
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="featured" className="space-y-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="featured">Featured Partners</TabsTrigger>
            <TabsTrigger value="industry">By Industry</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredPartners.map((partner, index) => (
                <Card key={index} className="transition-transform hover:scale-[1.02]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <Badge variant="outline" className="w-fit">{partner.type}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{partner.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="h-3.5 w-3.5 mr-1" /> {partner.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Link to="/workspace/partners">
                <Button variant="outline" className="group">
                  View All Partners
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="industry" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => (
                <Card key={index} className="transition-transform hover:scale-[1.02]">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div className="mr-2">{industry.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{industry.name}</CardTitle>
                      <CardDescription>{industry.count} partners</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link 
                      to={`/workspace/partners?industry=${industry.name.toLowerCase()}`}
                      className="text-sm text-primary hover:underline inline-flex items-center"
                    >
                      View partners <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="success" className="space-y-6">
            <div className="space-y-6">
              {successStories.map((story, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription>
                      Partners: {story.partners.join(", ")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">{story.year}</Badge>
                      <p className="text-muted-foreground">{story.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold">Join Our Partner Network</h2>
          <p className="text-muted-foreground">
            Become part of our global alliance and help create a more sustainable and ethical future.
          </p>
          <div className="pt-4">
            <Link to="/partner">
              <Button size="lg" className="px-8">
                Apply to Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerNetwork;
