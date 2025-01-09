import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoFieldsProps {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoFields = ({
  email,
  password,
  confirmPassword,
  fullName,
  onChange,
}: PersonalInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={onChange}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={onChange}
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={onChange}
        />
      </div>

      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          required
          value={fullName}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfoFields;