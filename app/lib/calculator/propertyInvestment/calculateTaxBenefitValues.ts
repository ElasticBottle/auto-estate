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
    annualPropertyIncome:38400,
    annualOtherIncome: income,
    totalAnnualIncome: 38400 + income,
    annualTaxBeforeDeductibles: 55557,
    eligibleDeductions: 23400,
    netAnnualIncome: 113242,
    // this is 10%
    netIncomeChangePercentage: 0.1011,
    // should be totalAnnualIncome - annualTaxBeforeDeductibles?
    netIncomeBeforeDeductibles: 38400 + income - 55557,
    // should be the same as netAnnual Income?
    netIncomeAfterDeductibles: 113242,
    // should be the same as annualTaxBeforeDeductibles?
    taxedBillBeforeDeductibles: 55557,
    // should be annualTaxBeforeDeductibles - eligibleDeductions??
    taxedBillAfterDeductibles: 45158,
  };
}
