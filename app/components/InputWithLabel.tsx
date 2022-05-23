import { Label } from "@radix-ui/react-label";
import React from "react";
import FormInput from "./FormInput";
import ValidationErrorMessage from "./ValidationErrorMessage";

export default function InputLabelWrapper({
  label,
  id,
  error,
  ...props
}: {
  label: string;
  id?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  let _id = id;
  if (!_id) {
    _id = label.split(/\s/).join("-").toLowerCase();
  }
  console.log("props.required", props.required);
  return (
    <div className="relative w-full pt-5">
      <FormInput id={_id} placeholder=" " {...props} />
      <Label asChild={true}>
        <label
          htmlFor={_id}
          className={`absolute top-0.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-[1.625rem] peer-placeholder-shown:left-0 ${
            props.required ? "after:text-rose-800 after:content-['_*']" : ""
          }`}
        >
          {label}
        </label>
      </Label>
      <ValidationErrorMessage error={error || ""} />
    </div>
  );
}
