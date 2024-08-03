// components/IconInput.tsx
import React from "react";
import { Input } from "@/components/ui/input";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const IconInput: React.FC<IconInputProps> = ({ icon, ...props }) => {
  return (
    <div className="relative">
      <Input {...props} className={`pl-10 ${props.className || ""}`} />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    </div>
  );
};

export default IconInput;
