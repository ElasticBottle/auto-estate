import { Form, Link, useSearchParams } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import { useAtom } from "jotai";
import React from "react";
import {
  pageDirectionAtom,
  propertyDetailsErrorAtom,
} from "~/atoms/calculatorAtom";
import DownPayment from "~/components/calculator/property-investment/forms/DownPayment";
import PropertyPrice from "~/components/calculator/property-investment/forms/PropertyPrice";
import { Dropdown } from "~/components/Dropdown";
import { Heading } from "~/components/Heading";
import InputWithLabel from "~/components/InputWithLabel";
import {
  ROUTE_CALC,
  ROUTE_CALC_PROPERTY_INVEST_FINANCIAL_DETAILS,
} from "~/constants/routes";
import {
  Direction,
  PropertyDetailsFormSchema,
  propertyLocationChoice,
  propertyTypeChoice,
} from "~/interface/calculator/PropertyInvestment";
import { objectFromFormData } from "~/lib/utils";

export const meta: MetaFunction = () => ({
  title: "Property Investment Calculator",
});

export default function PropertyInvestmentInputPage() {
  const [searchParams] = useSearchParams();
  const [, setDirection] = useAtom(pageDirectionAtom);
  const [errors, setErrors] = useAtom(propertyDetailsErrorAtom);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    const formData: Record<string, any> = objectFromFormData(data);
    const result = PropertyDetailsFormSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      e.preventDefault();
    }
  };
  return (
    <Form
      method="get"
      action={ROUTE_CALC_PROPERTY_INVEST_FINANCIAL_DETAILS}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="grid max-w-4xl grid-cols-1 p-6 mx-auto space-y-4 md:p-10">
        <Heading>Property Details</Heading>

        <Dropdown
          name={"propertyType"}
          label="Property Type"
          initialOption={
            searchParams.get("propertyType") || "Select a Property Type"
          }
          items={propertyTypeChoice}
          error={
            errors?.propertyType?._errors[0]
              ? "Please select a property type"
              : ""
          }
        />
        <Dropdown
          name={"propertyLocation"}
          label="Property Location"
          initialOption={
            searchParams.get("propertyLocation") || "Select a location"
          }
          items={propertyLocationChoice}
          error={
            errors?.propertyLocation?._errors[0]
              ? "Please select a location"
              : ""
          }
        />
        <InputWithLabel
          label="Loan Period (years)"
          inputMode="decimal"
          name="loanPeriod"
          error={errors?.loanPeriod?._errors[0]}
          defaultValue={searchParams.get("loanPeriod") || ""}
          required
        />
        <PropertyPrice />
        <DownPayment />

        <div className="flex justify-end w-full space-x-3">
          <Link
            to={ROUTE_CALC}
            onClick={() => {
              setErrors(undefined);
              setDirection(Direction.BACKWARD);
            }}
            className="btn btn-ghost"
          >
            back
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              setErrors(undefined);
              setDirection(Direction.FORWARD);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Form>
  );
}
