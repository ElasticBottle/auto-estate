import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
  UserDetailFormType,
} from "~/interface/calculator/PropertyInvestment";
import { formatCurrency, formatPerc } from "~/lib/utils";

export function calculateGovernmentGrantValues(
  userDetails: UserDetailFormType,
  propertyDetails: PropertyDetailsFormType,
  financialDetails: FinancialDetailsFormType
) {
  return {
    qualification: "GOOD NEWS: You qualify for this incentive",
    firstTimeIncentive: formatCurrency(25000),
    monthlyPaymentWithoutIncentive: formatCurrency(2100),
    monthlyPaymentWithIncentive: formatCurrency(1800),
    moneySavedOverTerm: formatCurrency(1800),
    percentageSaved: formatPerc(0.142),
  };
}
