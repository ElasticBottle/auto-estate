import { Label } from "@radix-ui/react-label";
import React from "react";

export default function FormLabel({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <Label asChild={true}>
      <label htmlFor={id} className="text-sm text-gray-600 ">
        {children}
      </label>
    </Label>
  );
}
