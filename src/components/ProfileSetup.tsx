import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

interface ProfileSetupProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ProfileSetup = ({ open, onClose, onComplete }: ProfileSetupProps) => {
  const industries = [
    "Manufacturing",
    "Retail",
    "Technology",
    "Agriculture",
    "Transportation",
    "Energy",
    "Healthcare",
    "Other"
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-2">
              Let's Set Up Your Profile
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              Help us customize your Guardian IO experience by providing a few details about your organization.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            onComplete();
          }} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyLogo">Company Logo</Label>
                <Input
                  id="companyLogo"
                  type="file"
                  accept="image/*"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry.toLowerCase()}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Areas of Focus</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {["Supply Chain Transparency", "Human Rights", "ESG Compliance", "Wildlife Protection"].map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                      <span>{area}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Complete Profile Setup
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSetup;