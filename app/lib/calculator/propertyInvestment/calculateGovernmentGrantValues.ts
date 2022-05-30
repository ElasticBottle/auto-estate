import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
  UserDetailFormType,
} from "~/interface/calculator/PropertyInvestment";

export function calculateGovernmentGrantValues(
  userDetails: UserDetailFormType,
  propertyDetails: PropertyDetailsFormType,
  financialDetails: FinancialDetailsFormType
) {
  return {
    qualification: "GOOD NEWS: You qualify for this incentive",
    firstTimeIncentive: 25000,
    monthlyPaymentWithoutIncentive: 2100,
    monthlyPaymentWithIncentive: 1800,
    moneySavedOverTerm: 1800,
    // this is 14.2%
    percentageSaved: 0.142,
  };
}
