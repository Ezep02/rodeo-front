import { Label } from "@/components/ui/label";
import React from "react";

type Props = {
    label: string
    info_text:string
}

const PersonalInfoBox:React.FC<Props> = ({label, info_text}) => {
  return (
    <div className="rounded-2xl p-4 bg-gray-100/95 border border-gray-50">
      <Label htmlFor="name" className="text-sm font-medium text-gray-400 w-40">
        {label}
      </Label>
      <p className="text-sm font-medium text-foreground">
        {info_text}
      </p>
    </div>
  );
};

export default PersonalInfoBox;
