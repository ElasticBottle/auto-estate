import { z } from "zod";

export const enum Direction {
  FORWARD,
  BACKWARD,
}

export const propertyTypeChoice = [
  "I will rent it out",
  "I will live there",
  "I will live there and rent out part of it",
] as const;
export const propertyLocationChoice = [
  "Waterloo, Ontario, Canada",
  "Kitchener, Ontario, Canada",
] as const;

export const creditScoreChoice = [
  "750 - 850",
  "700 - 749",
  "650 - 699",
  "560 - 649",
  "300 - 559",
  "I do not know",
] as const;
export const employmentStatusChoice = [
  "Stable employment for the past 2 years",
  "Employed for less than 2 years",
  "Currently between jobs",
  "Self employed",
] as const;
const preprocessStringToFloat = <T extends z.ZodTypeAny>(type: T) => {
  return z.preprocess((arg) => {
    switch (typeof arg) {
      case "number":
        return +arg.toFixed(2);
      case "string":
        const parsedValue = +parseFloat(arg.split(/,\s*/).join("")).toFixed(2);
        return arg === ""
          ? undefined
          : typeof parsedValue === "number"
          ? parsedValue
          : "";
      default:
        return "";
    }
  }, type);
};
export const PropertyDetailsFormSchema = z
  .object({
    propertyType: z.enum(propertyTypeChoice),
    propertyLocation: z.enum(propertyLocationChoice),
    propertyPrice: preprocessStringToFloat(
      z
        .number({
          required_error: "Property Price is required",
          invalid_type_error: "Property Price must be a number",
        })
        .nonnegative()
    ),
    intendedDownPaymentDollars: preprocessStringToFloat(
      z
        .number({
          required_error: "Down Payment Amount is required",
          invalid_type_error: "Down Payment Amount must be a number",
        })
        .nonnegative()
    ),
    //   intendedDownPaymentPercentage: preprocessStringToFloat(
    //     z
    //       .number({
    //         required_error: "value is required",
    //         invalid_type_error: "value must be a number",
    //       })
    //       .nonnegative()
    //       .min(0)
    //       .max(100)
    //   ),
    loanPeriod: preprocessStringToFloat(
      z
        .number({
          required_error: "Loan period is required",
          invalid_type_error: "Loan period must be a number",
        })
        .nonnegative()
        .step(1, "Please round your loan period to the nearest year")
    ),
  })
  .superRefine((data, ctx) => {
    if (data.intendedDownPaymentDollars > data.propertyPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["intendedDownPaymentDollars"],
        message: "Down payment must be less than the property price",
      });
    }
  });

export type PropertyDetailsFormType = z.infer<typeof PropertyDetailsFormSchema>;

export const FinancialDetailsFormSchema = z
  .object({
    grossIncome: preprocessStringToFloat(z.number().nonnegative()),
    creditScore: z.enum(creditScoreChoice),
    currentDebt: preprocessStringToFloat(z.number().nonnegative().optional()),
    employmentStatus: z.enum(employmentStatusChoice),
  })
  .superRefine((data, ctx) => {
    if (
      data.creditScore === "I do not know" &&
      typeof data.currentDebt !== "number"
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currentDebt"],
        message: "Current debt is required",
      });
    }
  });

export type FinancialDetailsFormType = z.infer<
  typeof FinancialDetailsFormSchema
>;

export const UserDetailFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
export type UserDetailFormType = z.infer<typeof UserDetailFormSchema>;
