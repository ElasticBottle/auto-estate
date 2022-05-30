import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
  UserDetailFormType,
} from "~/interface/calculator/PropertyInvestment";
import {
  creditScoreChoice,
  propertyLocationChoice,
} from "~/interface/calculator/PropertyInvestment";

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
  const mortgageSize = calculateMortgageSize(propertyDetails);
  const monthlyMortgage = calculateMonthlyMortgage(propertyDetails);
  const propertyTax = calculatePropertyTax(propertyDetails);

  const mortgagePayments = calculateMonthlyMortgage(propertyDetails);
  const propertyTaxPayments = calculatePropertyTax(propertyDetails);
  const insurancePayments = calculateInsurance(propertyDetails);
  return {
    // todo: Fill out the values here
    // I created some function to format currency and percentage, use as you see fit
    monthlyNetIncomeFromProperty: 1000,
    // mortgageSize: mortgageSize,
    // this is 10.3%
    // mortgageInterest: 0.103,
    // totalMortgagePaid: 1_000_000,
    // Monthly Cost Section
    totalMonthlyCost: (mortgagePayments + propertyTaxPayments + insurancePayments + 283 + 488 + 200),
    monthlyMortgage: mortgagePayments,
    propertyTax: propertyTaxPayments,
    homeOwnerInsurance: insurancePayments,
    utilityBill: 283,
    maintenanceFee: 488,
    miscFees: 200,

    // Monthly Revenue Section
    averageMonthlyRevenue: 10,
    // this is 60%
    averageOccupancy: 0.6,
    averageDailyRate: 10,
    bestRevenueMonth: "March",
    worstRevenueMonth: "December",

    // Closing Cost Section
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

    // ROI section
    roi: 80,
    averageYearlyReturn: 10,
    averageInflation: 10,
    realYearlyReturn: 10,
    capRate: 10,
    totalRevenueFromProperty: 10,
    totalProfitFromProperty: 10,

    // Tax Benefits Section
    estimatedTotalTaxBenefits: 10,
    annualTaxBenefits: 10,
    oneTimeTaxBenefits: 10,
  };
}

function calculateMortgageSize(propertyDetails: PropertyDetailsFormType) {
  // TODO: Calculation for mortgage size;
  const size =
    propertyDetails.propertyPrice - propertyDetails.intendedDownPaymentDollars;
  return size;
}

// Functions that calculate the values

function calculateMonthlyMortgage(propertyDetails: PropertyDetailsFormType) {
  const interest = 0.002833;
  const mortgage = calculateMortgageSize(propertyDetails);
  const time = propertyDetails.loanPeriod;
  const monthlyMortgage =
    (mortgage * interest) / (1 - (1 + interest) ** (-12 * time));
  return monthlyMortgage;
}
// TODO, create more functions as needed.

const propertyTaxMapping = {
  [propertyLocationChoice[0]]: 0.0111,
  [propertyLocationChoice[1]]: 0.0113,
};

function calculatePropertyTax(propertyDetails: PropertyDetailsFormType) {
  const price = propertyDetails.propertyPrice;
  const propertyTax =
    (propertyTaxMapping[propertyDetails.propertyLocation] * price) / 12;
  return propertyTax;
}

const propertyInsuranceMapping = {
  [propertyLocationChoice[0]]: 1524,
  [propertyLocationChoice[1]]: 1656,
}

function calculateInsurance(propertyDetails: PropertyDetailsFormType) {
  const insurance = propertyInsuranceMapping[propertyDetails.propertyLocation] / 12;
  return insurance;
}
