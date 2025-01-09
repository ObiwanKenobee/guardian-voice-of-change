import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrganizationFieldsProps {
  organization: string;
  industry: string;
  role: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: string, value: string) => void;
}

const OrganizationFields = ({
  organization,
  industry,
  role,
  onInputChange,
  onSelectChange,
}: OrganizationFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="organization">Organization</Label>
        <Input
          id="organization"
          name="organization"
          required
          value={organization}
          onChange={onInputChange}
        />
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={role}
          onValueChange={(value) => onSelectChange("role", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Supply Chain Manager">Supply Chain Manager</SelectItem>
            <SelectItem value="ESG Officer">ESG Officer</SelectItem>
            <SelectItem value="CSR Leader">CSR Leader</SelectItem>
            <SelectItem value="Sustainability Director">Sustainability Director</SelectItem>
            <SelectItem value="Operations Manager">Operations Manager</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="industry">Industry</Label>
        <Select
          value={industry}
          onValueChange={(value) => onSelectChange("industry", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="agriculture">Agriculture</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
            <SelectItem value="energy">Energy</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrganizationFields;