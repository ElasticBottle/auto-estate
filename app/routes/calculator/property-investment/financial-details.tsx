import {
  Form,
  Link,
  useLocation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import type { ActionFunction, MetaFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import console from "console";
import { useAtom } from "jotai";
import React from "react";
import type { ZodFormattedError } from "zod";
import {
  financialDetailsErrorAtom,
  pageDirectionAtom,
} from "~/atoms/calculatorAtom";
import { Dropdown } from "~/components/Dropdown";
import { Heading } from "~/components/Heading";
import InputWithLabel from "~/components/InputWithLabel";
import { Modal } from "~/components/Modal";
import {
  CalculatorType,
  ROUTE_SPECIFIC_CALC,
  ROUTE_SPECIFIC_REPORT,
} from "~/constants/routes";
import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
  UserDetailFormType,
} from "~/interface/calculator/PropertyInvestment";
import {
  creditScoreChoice,
  Direction,
  employmentStatusChoice,
  FinancialDetailsFormSchema,
  UserDetailFormSchema,
} from "~/interface/calculator/PropertyInvestment";
import { objectFromFormData, URLSearchParamsFromFormData } from "~/lib/utils";

export const meta: MetaFunction = () => ({
  title: "Property Investment Calculator - Financial Details",
});

type ActionDataType = {
  error?:
    | ZodFormattedError<FinancialDetailsFormType, string>
    | ZodFormattedError<PropertyDetailsFormType, string>
    | ZodFormattedError<UserDetailFormType, string>;
};
export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const searchParams = URLSearchParamsFromFormData(data);
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
  const userDetailResult = UserDetailFormSchema.safeParse(toParse);
  if (!userDetailResult.success) {
    console.log(
      "userDetailResult.error.format()",
      userDetailResult.error.format()
    );
    return json<ActionDataType>(
      { error: userDetailResult.error.format() },
      { status: 400 }
    );
  }

  // todo validate property details
  console.log("data", Array.from(data.keys()));

  return redirect(
    `${ROUTE_SPECIFIC_REPORT(
      CalculatorType.PROPERTY_INVESTMENT
    )}?${searchParams.toString()}`
  );
};

export default function PropertyInvestmentInputPage() {
  const [searchParams] = useSearchParams();
  const prevInputs: React.ReactChild[] = [];
  searchParams.forEach((value, key) => {
    prevInputs.push(<input key={key} name={key} defaultValue={value} hidden />);
  });

  const [, setDirection] = useAtom(pageDirectionAtom);
  const location = useLocation();

  const submit = useSubmit();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const formRef =
    React.useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;

  const [errors, setErrors] = useAtom(financialDetailsErrorAtom);

  const [name, setName] = React.useState(searchParams.get("name") || "");
  const [email, setEmail] = React.useState(searchParams.get("email") || "");

  const validateMainForm = (formElement: HTMLFormElement) => {
    const data = new FormData(formElement);
    const formData: Record<string, any> = objectFromFormData(data);
    const result = FinancialDetailsFormSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return true;
    }
    return false;
  };

  return (
    <Form ref={formRef} method="post" noValidate>
      <input
        type="text"
        className="hidden"
        value={name}
        name={"name"}
        readOnly
      />
      <input
        type="text"
        className="hidden"
        value={email}
        name={"email"}
        readOnly
      />
      {...prevInputs}

      <div className="grid max-w-4xl grid-cols-1 p-6 mx-auto space-y-4 md:p-10">
        <Heading>Financial Details</Heading>
        <InputWithLabel
          name={"grossIncome"}
          label="Monthly Gross Income (CAD)"
          defaultValue={searchParams.get("grossIncome") || ""}
          required
          inputMode="decimal"
          error={errors?.grossIncome?._errors[0]}
        />
        <Dropdown
          name={"creditScore"}
          label="Credit Score"
          initialOption={
            searchParams.get("creditScore") || "Select your credit score range"
          }
          items={creditScoreChoice}
          error={
            errors?.creditScore?._errors[0]
              ? "Please select a credit score"
              : ""
          }
        />
        <InputWithLabel
          name={"currentDebt"}
          label="Monthly Current Debt (CAD)"
          defaultValue={searchParams.get("currentDebt") || ""}
          inputMode="decimal"
          error={errors?.currentDebt?._errors[0]}
        />
        <Dropdown
          name={"employmentStatus"}
          label="Employment Status"
          initialOption={
            searchParams.get("employmentStatus") || "Select a status"
          }
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
            className="btn btn-primary"
            type="button"
            onClick={() => {
              const isError = validateMainForm(formRef.current);
              if (isError) {
                return;
              }
              setIsModalOpen(true);
              setDirection(Direction.FORWARD);
              setErrors(undefined);
            }}
          >
            submit
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Almost Done!"}
        body={
          <div className="mt-2 space-y-3">
            <p className="text-sm text-gray-500">
              We're a small and passionate team, drop us your details so that we
              can send you the most insightful report on financing a house.
            </p>
            <InputWithLabel
              label="Name"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              autoComplete="name"
            />
            <InputWithLabel
              label="Email"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              inputMode="email"
            />
          </div>
        }
        actionButton={
          <button
            className="ml-2 btn btn-primary"
            onClick={() => {
              setIsModalOpen(false);
              submit(formRef.current);
            }}
          >
            Get my report
          </button>
        }
      />
    </Form>
  );
}
