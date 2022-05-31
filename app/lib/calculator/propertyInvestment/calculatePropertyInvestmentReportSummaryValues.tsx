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
  const mortgagePayments = calculateMonthlyMortgage(propertyDetails);
  const propertyTaxPayments = calculatePropertyTax(propertyDetails);
  const insurancePayments = calculateInsurance(propertyDetails);
  const landTransferTax = calculateLandTransferTax(propertyDetails);
  return {
    // todo: Fill out the values here
    monthlyNetIncomeFromProperty: 1000,

    // Monthly Cost Section
    totalMonthlyCost:
      mortgagePayments +
      propertyTaxPayments +
      insurancePayments +
      283 +
      488 +
      200,
    monthlyMortgage: mortgagePayments,
    propertyTax: propertyTaxPayments,
    homeOwnerInsurance: insurancePayments,
    utilityBill: 283,
    maintenanceFee: 488,
    miscFees: 200,

    // Monthly Revenue Section
    averageMonthlyRevenue: 10,
    forecastedMonthlyRevenue: {
      January: 10,
      February: 10,
      March: 10,
      April: 10,
      May: 10,
      June: 10,
      July: 10,
      August: 10,
      September: 10,
      October: 10,
      November: 10,
      December: 10,
    },
    // this is 60%
    averageOccupancy: 0.6,
    averageDailyRate: 10,
    bestRevenueMonth: "March",
    worstRevenueMonth: "December",

    // Closing Cost Section
    closingCosts: 10,
    landTransferTax: landTransferTax,
    legalFees: 10,
    propertyTaxAdjustment: 10,
    gst: 10,
    titleInsurance: 200,
    homeInspection: 450,
    otherTaxes: 50,
    interestAdjustment: 100,
    homeAppraisal: 300,
    // ! Note, these stuff might need tweaking, but feel free to do calculation base on 30 years and I can hook them up in the right place later on

    // ROI section
    roi: 5.55,
    averageYearlyReturn: 0.0588,
    averageInflation: 0.0196,
    realYearlyReturn: 0.0392,
    capRate: 0.05,
    propertyPriceOverYears: {
      2018: 100,
      2019: 120,
      2020: 200,
      2021: 225,
      2022: 201,
    },

    // Tax Benefits Section
    totalTaxBenefits: 10,
    annualTaxBenefits: 10,
    oneTimeTaxBenefits: 10,

    // gov grant section
    maxGovernmentGrants: 45000,
    homeBuyerGrant: 35000,
    firstTimeBuyerIncentive: 10000,
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
  const time = parseInt(propertyDetails.loanPeriod);
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
};

function calculateInsurance(propertyDetails: PropertyDetailsFormType) {
  const insurance =
    propertyInsuranceMapping[propertyDetails.propertyLocation] / 12;
  return insurance;
}

function calculateLandTransferTax(propertyDetails: PropertyDetailsFormType) {
  const price = propertyDetails.propertyPrice;
  let tax = 0;
  if (price <= 55000) {
    tax = price * 0.0005;
  } else if (price > 55000 && price <= 250000) {
    tax = 55000 * 0.005 + (price - 55000) * 0.01;
  } else if (price > 250000 && price <= 400000) {
    tax = 55000 * 0.005 + 195000 * 0.01 + (price - 250000) * 0.015;
  } else if (price > 400000 && price <= 2000000) {
    tax =
      55000 * 0.005 + 195000 * 0.01 + 150000 * 0.015 + (price - 400000) * 0.02;
  } else if (price > 2000000) {
    tax =
      55000 * 0.005 +
      195000 * 0.01 +
      150000 * 0.015 +
      1600000 * 0.02 +
      (price - 2000000) * 0.025;
  }
  return tax;
}
