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
  const income = (financialDetails.grossIncome)*12;
  return {
    annualPropertyIncome: 28200,
    annualOtherIncome: income,
    totalAnnualIncome: 28200 + income,
    annualTaxBeforeDeductibles: 43860,
    annualIncomeWithoutDeductions: 104340,
    eligibleDeductions: 20483,
    netAnnualIncome: 113232,
    // this is 10%
    netIncomeChangePercentage: 0.0852,
    // should be totalAnnualIncome - annualTaxBeforeDeductibles?
    netIncomeBeforeDeductibles: 104340,
    // should be the same as netAnnual Income?
    netIncomeAfterDeductibles: 113232,
    // should be the same as annualTaxBeforeDeductibles?
    taxedBillBeforeDeductibles: 43860,
    // should be annualTaxBeforeDeductibles - eligibleDeductions??
    taxedBillAfterDeductibles: 34968,
  };
}
