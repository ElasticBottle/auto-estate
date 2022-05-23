import { Form, Link, useLocation, useSearchParams } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { useAtom } from "jotai";
import React from "react";
import type { ZodFormattedError } from "zod";
import {
  financialDetailsErrorAtom,
  pageDirectionAtom,
} from "~/atoms/calculatorAtom";
import { Dropdown } from "~/components/Dropdown";
import Heading from "~/components/Heading";
import InputWithLabel from "~/components/InputWithLabel";
import {
  CalculatorType,
  ROUTE_CALC,
  ROUTE_SPECIFIC_CALC,
} from "~/constants/routes";
import type { FinancialDetailsFormType } from "~/interface/calculator/PropertyInvestment";
import {
  creditScoreChoice,
  Direction,
  employmentStatusChoice,
  FinancialDetailsFormSchema,
} from "~/interface/calculator/PropertyInvestment";
import { objectFromFormData } from "~/utils";

type ActionDataType = {
  error?: ZodFormattedError<FinancialDetailsFormType, string>;
};
export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const toParse = objectFromFormData(data);
  const financialDetailsResult = FinancialDetailsFormSchema.safeParse(toParse);
  if (!financialDetailsResult.success) {
    console.log(
      "financialDetailsResult.error.format()",
      financialDetailsResult.error.format()
    );
    return json<ActionDataType>(
      {
        error: financialDetailsResult.error.format(),
      },
      {
        status: 400,
      }
    );
  }
  // todo validate prev values.
  console.log("data", Array.from(data.keys()));
  console.log("data.propertyType", data.get("propertyType"));
  return redirect(ROUTE_CALC);
};

export default function PropertyInvestmentInputPage() {
  const location = useLocation();
  const [, setDirection] = useAtom(pageDirectionAtom);
  const [queryParams] = useSearchParams();
  const prevInputs: React.ReactChild[] = [];
  queryParams.forEach((value, key) => {
    prevInputs.push(<input key={key} name={key} defaultValue={value} hidden />);
  });
  const [errors, setErrors] = useAtom(financialDetailsErrorAtom);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    const formData: Record<string, any> = objectFromFormData(data);
    const result = FinancialDetailsFormSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      e.preventDefault();
      return;
    }
  };
  return (
    <Form method="post" onSubmit={onSubmit}>
      {...prevInputs}
      <div className="grid max-w-4xl grid-cols-1 p-6 mx-auto space-y-4 md:p-10">
        <Heading>Financial Details</Heading>
        <InputWithLabel
          name={"grossIncome"}
          label="Gross Income (CAD)"
          inputMode="decimal"
          error={errors?.grossIncome?._errors[0]}
        />
        <Dropdown
          name={"creditScore"}
          label="Credit Score"
          placeholder="Select your credit score range"
          items={creditScoreChoice}
          error={
            errors?.creditScore?._errors[0]
              ? "Please select a credit score"
              : ""
          }
        />
        <InputWithLabel
          name={"currentDebt"}
          label="Current Debt (CAD)"
          inputMode="decimal"
          error={errors?.currentDebt?._errors[0]}
        />
        <Dropdown
          name={"employmentStatus"}
          label="Employment Status"
          placeholder="Select a status"
          items={employmentStatusChoice}
          error={
            errors?.employmentStatus?._errors[0]
              ? "Please select an employment status"
              : ""
          }
        />
        <div className="flex justify-end w-full space-x-3">
          <Link
            to={{
              pathname: ROUTE_SPECIFIC_CALC(CalculatorType.PROPERTY_INVESTMENT),
              search: location.search,
            }}
            onClick={() => {
              setDirection(Direction.BACKWARD);
              setErrors(undefined);
            }}
            className="btn btn-ghost"
          >
            back
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              setDirection(Direction.FORWARD);
              setErrors(undefined);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Form>
  );
}
