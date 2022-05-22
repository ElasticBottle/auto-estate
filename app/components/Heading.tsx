import React from "react";

export default function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold md:text-3xl">{children}</h1>;
}
