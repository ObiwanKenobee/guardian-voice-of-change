import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Handshake, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Partner = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    role: "",
    email: "",
    partnershipType: "",
    expertise: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Partnership request submitted",
      description: "Thank you for partnering with Guardian IO! We'll be in touch shortly to discuss next steps.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Handshake className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold gradient-text">
              Let's Build the Future Together
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join forces with Guardian IO to drive innovation, sustainability, and enterprise-grade solutions that make a difference. Whether you're a technology provider, sustainability expert, or thought leader, our partnership program empowers you to shape the future of global operations.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">Key Benefits</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                Collaborate with Fortune 500 enterprises
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                Gain access to cutting-edge ESG technologies and tools
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                Build a more sustainable and interconnected world
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  type="text"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter your role"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="partnershipType">Type of Partnership</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, partnershipType: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expertise">Brief Description of Expertise</Label>
                <Textarea
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  placeholder="Tell us about your expertise and how you'd like to partner with us"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Become a Partner 🚀
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Partner;