import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AuthFormField = ({ label, id, type = "text", ...props }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} {...props} />
    </div>
  );
};

export default AuthFormField;