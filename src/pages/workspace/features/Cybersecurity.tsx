import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { FeatureLayout } from '@/components/workspace/features/FeatureLayout';
import { Database } from '@/lib/database.types';

// Use typeof Database to get the correct type reference
type SecurityIncident = Database['public']['Tables']['security_incidents']['Row'];
type SecurityIncidentInsert = Database['public']['Tables']['security_incidents']['Insert'];

const Cybersecurity = () => {
  const [incident, setIncident] = useState<SecurityIncidentInsert>({
    user_id: '',
    title: '',
    description: '',
    category: 'phishing',
    severity: 'low',
    reported_date: new Date().toISOString(),
    status: 'open',
    affected_systems: [],
    potential_impact: '',
  });

  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: () => {
      // Placeholder for actual submission logic
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log('Submitting incident:', incident);
          resolve();
        }, 1000);
      });
    },
    onSuccess: () => {
      toast({
        title: "Incident submitted successfully",
        description: "We'll review the incident and take appropriate action.",
      });
      setIncident({
        user_id: '',
        title: '',
        description: '',
        category: 'phishing',
        severity: 'low',
        reported_date: new Date().toISOString(),
        status: 'open',
        affected_systems: [],
        potential_impact: '',
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting incident",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIncident(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setIncident(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <FeatureLayout
      title="Cybersecurity Management"
      description="Monitor and manage security incidents across your organization."
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Incident Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={incident.title}
              onChange={handleInputChange}
              placeholder="Enter incident title"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={incident.description}
              onChange={handleInputChange}
              placeholder="Enter incident description"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phishing">Phishing</SelectItem>
                <SelectItem value="malware">Malware</SelectItem>
                <SelectItem value="ransomware">Ransomware</SelectItem>
                <SelectItem value="data_breach">Data Breach</SelectItem>
                <SelectItem value="dos_ddos">DoS/DDoS</SelectItem>
                <SelectItem value="insider_threat">Insider Threat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="severity">Severity</Label>
            <Select onValueChange={(value) => handleSelectChange('severity', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="potential_impact">Potential Impact</Label>
            <Textarea
              id="potential_impact"
              name="potential_impact"
              value={incident.potential_impact}
              onChange={handleInputChange}
              placeholder="Enter potential impact"
              className="mt-1"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={submitMutation.isPending}
        >
          {submitMutation.isPending ? "Submitting..." : "Submit Incident"}
        </Button>
      </form>
    </FeatureLayout>
  );
};

export default Cybersecurity;
