import { Label } from "@radix-ui/react-label";
import React from "react";

export default function PropertyInvestmentInputPage() {
  return (
    <div className="grid max-w-4xl grid-cols-1 mx-auto">
      <h1>Financial Details</h1>
      <div className="flex flex-wrap items-center px-4">
        <Label htmlFor="firstName" className="mr-4 leading-9">
          Property Type
        </Label>
        <input
          type="text"
          id="firstName"
          defaultValue="Pedro Duarte"
          className="w-40 h-8 px-2 mr-3 leading-4 shadow-md"
        />
      </div>
      <div className="flex flex-wrap items-center px-4">
        <Label htmlFor="firstName" className="mr-4 leading-9">
          Property Location
        </Label>
        <input
          type="text"
          id="firstName"
          defaultValue="Pedro Duarte"
          className="w-40 h-8 px-2 mr-3 leading-4 shadow-md"
        />
      </div>
      <div className="flex flex-wrap items-center px-4">
        <Label htmlFor="firstName" className="mr-4 leading-9">
          Property price (CAD)
        </Label>
        <input
          type="text"
          id="firstName"
          defaultValue="Pedro Duarte"
          className="w-40 h-8 px-2 mr-3 leading-4 shadow-md"
        />
      </div>
      <div className="flex flex-wrap items-center px-4">
        <Label htmlFor="firstName" className="mr-4 leading-9">
          Intended Down Payment (CAD)
        </Label>
        <input
          type="text"
          id="firstName"
          defaultValue="Pedro Duarte"
          className="w-40 h-8 px-2 mr-3 leading-4 shadow-md"
        />
      </div>
      <div className="flex flex-wrap items-center px-4">
        <Label htmlFor="firstName" className="mr-4 leading-9">
          Loan Period
        </Label>
        <input
          type="text"
          id="firstName"
          defaultValue="Pedro Duarte"
          className="w-40 h-8 px-2 mr-3 leading-4 shadow-md"
        />
      </div>
    </div>
  );
}
