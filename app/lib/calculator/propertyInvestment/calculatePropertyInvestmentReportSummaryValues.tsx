import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
  UserDetailFormType,
} from "~/interface/calculator/PropertyInvestment";
import { creditScoreChoice } from "~/interface/calculator/PropertyInvestment";

export function calculatePropertyInvestmentReportSummaryValues(
  userDetails: UserDetailFormType,
  propertyDetails: PropertyDetailsFormType,
  financialDetails: FinancialDetailsFormType
) {
  // the three arguments contain all data from the previous forms. do userDetails.email to get the user email
  // Vs code should tell you what options are available when you use "." on any of the params above

  // use let variableName; when you need to reassign it. use const otherwise.

  // Refer to PropertyInvestment.ts in /app/interface/calculator/PropertyInvestment.ts for the possible values of the property type, property location, credit score etc (basically all the drop down options)
  // e,g. to check if credit score is "750 - 850", "700 - 749", or otherwise do something like
  switch (financialDetails.creditScore) {
    case creditScoreChoice[0]: {
      // c.s. is 750 -850, do something
      break;
    }
    case creditScoreChoice[1]: {
      // c.s. is 700 - 749 do something
      break;
    }
    default: {
      // c.s. not one of the two above, do something
      break;
    }
  }

  // TODO: Do the calculations here, edit function to pass in params if you need.
  // ! The types of the parameter are given by the value after ":" above
  const mortgageSize = calculateMortgageSize();
  return {
    // todo: Fill out the values here
    // I created some function to format currency and percentage, use as you see fit
    monthlyNetIncomeFromProperty: 1000,
    // mortgageSize: mortgageSize,
    // this is 10.3%
    // mortgageInterest: 0.103,
    // totalMortgagePaid: 1_000_000,
    totalMonthlyCost: 10,
    monthlyMortgage: 10,
    propertyTax: 10,
    homeOwnerInsurance: 10,
    utilityBill: 10,
    maintenanceFee: 10,
    miscFees: 1230,
    averageMonthlyRevenue: 10,
    // this is 60%
    averageOccupancy: 0.6,
    averageDailyRate: 10,
    bestRevenueMonth: "March",
    worstRevenueMonth: "December",
    closingCosts: 10,
    legalFees: 10,
    landTransferTax: 10,
    newBuildGst: 10,
    downPayment: "string works too",
    homeAppraisal: 10,
    titleInsurance: 10,
    homeInspection: 10,
    utilityHookups: 10,
    closingHoldback: 10,
    // ! Note, these stuff might need tweaking, but feel free to do calculation base on 30 years and I can hook them up in the right place later on
    roi: 80,
    averageYearlyReturn: 10,
    averageInflation: 10,
    realYearlyReturn: 10,
    capRate: 10,
    totalRevenueFromProperty: 10,
    totalProfitFromProperty: 10,
    estimatedTotalTaxBenefits: 10,
    annualTaxBenefits: 10,
    oneTimeTaxBenefits: 10,
  };
}

function calculateMortgageSize() {
  // TODO: Calculation for mortgage size
  return 1_000_000;
}

// TODO, create more functions as needed.
