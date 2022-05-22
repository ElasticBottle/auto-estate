import { atom } from "jotai";
import type { ZodFormattedError } from "zod";
import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
} from "~/interface/calculator/PropertyInvestment";
import { Direction } from "~/interface/calculator/PropertyInvestment";

export const pageDirectionAtom = atom<Direction>(Direction.FORWARD);

export const downPaymentPercAtom = atom<string>("");
export const downPaymentDollarAtom = atom<string>("");
export const propertyPriceAtom = atom<string>("");

export const propertyDetailsErrorAtom = atom<
  ZodFormattedError<PropertyDetailsFormType, string> | undefined
>(undefined);
export const financialDetailsErrorAtom = atom<
  ZodFormattedError<FinancialDetailsFormType, string> | undefined
>(undefined);
