import React from "react";

export default function FormInput({
  id,
  ...props
}: { id?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const isEmptyPlaceholder = props.placeholder === " ";
  return (
    <input
      id={id}
      className={` ${
        isEmptyPlaceholder ? "placeholder-transparent" : ""
      } w-full h-10 bg-transparent border-b-2 focus:border-rose-900 focus:outline-none peer`}
      {...props}
    />
  );
}
