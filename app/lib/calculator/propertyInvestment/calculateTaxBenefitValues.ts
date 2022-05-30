import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
  UserDetailFormType,
} from "~/interface/calculator/PropertyInvestment";

export function calculateTaxBenefitValues(
  userDetails: UserDetailFormType,
  propertyDetails: PropertyDetailsFormType,
  financialDetails: FinancialDetailsFormType
) {
  return {
    annualPropertyIncome: 1000,
    annualOtherIncome: 4000,
    totalAnnualIncome: 5000,
    annualTaxBeforeDeductibles: 2100,
    eligibleDeductions: 2000,
    netAnnualIncome: 4900,
    // this is 10%
    netIncomeChangePercentage: 0.1,
    // should be totalAnnualIncome - annualTaxBeforeDeductibles?
    netIncomeBeforeDeductibles: 2900,
    // should be the same as netAnnual Income?
    netIncomeAfterDeductibles: 4900,
    // should be the same as annualTaxBeforeDeductibles?
    taxedBillBeforeDeductibles: 2100,
    // should be annualTaxBeforeDeductibles - eligibleDeductions??
    taxedBillAfterDeductibles: 100,
  };
}
