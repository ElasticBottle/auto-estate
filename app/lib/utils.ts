import { json } from "@remix-run/server-runtime";
import {
  FinancialDetailsFormSchema,
  PropertyDetailsFormSchema,
  UserDetailFormSchema,
} from "~/interface/calculator/PropertyInvestment";

export function formatCurrency(value: number, currency = "CAD") {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export function formatPerc(value: number) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export function URLSearchParamsFromFormData(data: FormData) {
  const convertedFormEntries = Array.from(data, ([key, value]) => [
    key,
    typeof value === "string" ? value : value.name,
  ]);
  const searchParams = new URLSearchParams(convertedFormEntries);
  return searchParams;
}
export function objectFromFormData<T>(formData: FormData): T {
  const toReturn: Record<string, any> = {};
  for (const [k, v] of formData.entries()) {
    toReturn[k] = v;
  }
  return toReturn as T;
}

export function getPropertyInvestmentCalculatorDetails(rawUrl: string) {
  const url = new URL(rawUrl);
  const term = objectFromFormData(url.searchParams);
  const userDetails = UserDetailFormSchema.safeParse(term);
  const propertyDetails = PropertyDetailsFormSchema.safeParse(term);
  const financialDetails = FinancialDetailsFormSchema.safeParse(term);
  if (!userDetails.success) {
    console.log("userDetails.error.format()", userDetails.error.format());
    throw json({ parseError: userDetails.error.format() });
  }
  if (!propertyDetails.success) {
    console.log(
      "propertyDetails.error.format()",
      propertyDetails.error.format()
    );
    throw json({ parseError: propertyDetails.error.format() });
  }
  if (!financialDetails.success) {
    console.log(
      "financialDetails.error.format()",
      financialDetails.error.format()
    );
    throw json({ parseError: financialDetails.error.format() });
  }
  return {
    userDetails,
    propertyDetails,
    financialDetails,
  };
}
