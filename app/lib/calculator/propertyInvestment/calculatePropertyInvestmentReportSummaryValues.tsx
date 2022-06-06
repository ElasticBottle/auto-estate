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
  const price = propertyDetails.propertyPrice;
  const mortgagePayments = calculateMonthlyMortgage(propertyDetails);
  const propertyTaxPayments = calculatePropertyTax(propertyDetails);
  const insurancePayments = calculateInsurance(propertyDetails);
  const landTransferTax = calculateFinalLandTransferTax(propertyDetails);
  const maintenanceFee = calculateMaintenanceFee(propertyDetails);
  const mortgageInsurance = calculateMortgageInsurance(propertyDetails);
  const termInterest = calculateTermInterest(propertyDetails);
  const firstTimeBuyerIncentive = calculatefirstTimeBuyerIncentive(propertyDetails,financialDetails)
  let ROI = (price - (0.9354 * 0.7536 * 1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price)) / (0.9354 * 0.7536 * 1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price)
  return {
    // todo: Fill out the values here
    monthlyNetIncomeFromProperty: (0.64 * 113 * 30) - (mortgagePayments + propertyTaxPayments +
      insurancePayments + 283 + maintenanceFee + 200),

    // Monthly Cost Section
    totalMonthlyCost:
      mortgagePayments +
      propertyTaxPayments +
      insurancePayments +
      283 +
      maintenanceFee +
      200,
    monthlyMortgage: mortgagePayments,
    propertyTax: propertyTaxPayments,
    homeOwnerInsurance: insurancePayments,
    utilityBill: 283,
    maintenanceFee: maintenanceFee,
    miscFees: 200,

    // Monthly Revenue Section
    averageMonthlyRevenue: 0.64 * 113 * 30,
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
    averageOccupancy: 0.64,
    averageDailyRate: 113,
    bestRevenueMonth: "October",
    worstRevenueMonth: "May",

    // Closing Cost Section
    closingCosts: landTransferTax + 900 + (mortgageInsurance * 0.08) + 900 + 100 + 200 + 1000,
    landTransferTax: landTransferTax,
    legalFees: 900,
    estoppelCertificateFees: 100,
    governmentRegistrationFees: 200,
    pstOnCMHC: mortgageInsurance * 0.08,
    titleInsurance: 250,
    homeInspection: 450,
    homeAppraisal: 300,
    other: 300,
    // ! Note, these stuff might need tweaking, but feel free to do calculation base on 30 years and I can hook them up in the right place later on

    // ROI section
    roi: ROI,
    averageYearlyReturn: (1+ROI)**(1/7) - 1,
    averageInflation: 0.0196,
    realYearlyReturn: ((1+ROI)**(1/7) - 1) - 0.0196,
    capRate: 0.05,
    propertyPriceOverYears: {
      2015: Math.round(0.9354 * 0.7536 * 1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price),
      2016: Math.round(0.7536 * 1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price),
      2017: Math.round(1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price),
      2018: Math.round(0.9686 * 0.8665 * 0.7627 * 0.7971 * price),
      2019: Math.round(0.8665 * 0.7627 * 0.7971 * price),
      2020: Math.round(0.7627 * 0.7971 * price),
      2021: Math.round(0.7971 * price),
      2022: price,
    },

    // Tax Benefits Section
    totalTaxBenefits: ((termInterest / 5) + insurancePayments + (propertyTaxPayments * 12) + 200 + 283 + maintenanceFee + 200 + 0)*5 + (2000 + 750 + mortgageInsurance + 24000),
    // Annual Tax breakdown
    annualTaxBenefits: (termInterest / 5) + insurancePayments + (propertyTaxPayments * 12) + 200 + 283 + maintenanceFee + 200 + 0,
    mortgageInterest: termInterest / 5,
    insurance: insurancePayments,
    tax: (propertyTaxPayments * 12),
    advertizingCost: 200,
    utilities: 283,
    managementMaintenance: maintenanceFee + 200,
    workingFromHomeCredit: 0,

    // One time tax breakdown
    oneTimeTaxBenefits: 2000 + 750 + mortgageInsurance + 24000,
    movingExpenses: 2000,
    firstTimeHomeBuyersCredit: 750,
    mortgageInsurance: mortgageInsurance,
    gsthstNewHousingRebate: 24000,

    // gov grant section
    maxGovernmentGrants: firstTimeBuyerIncentive + 35000,
    homeBuyerGrant: 35000,
    firstTimeBuyerIncentive: firstTimeBuyerIncentive,
  };
}

// Functions that calculate the values


function calculateMortgageInsurance(propertyDetails: PropertyDetailsFormType) {
  const ltv = 1 - (propertyDetails.intendedDownPaymentDollars / propertyDetails.propertyPrice);
  const price = propertyDetails.propertyPrice;
  const downPayment = propertyDetails.intendedDownPaymentDollars;
  const loan = price - downPayment;
  let insurance = 0;
  if (price >= 1000000) {
    insurance = 0;
  }
  else if (ltv >= 0.95) {
    insurance = loan * 0.04;
  } 
  else if (ltv < 0.95 && ltv >= 0.90) {
    insurance = loan * 0.031;
  }
  else if (ltv < 0.90 && ltv >= 0.85) {
    insurance = loan * 0.028;
  }
  else if (ltv < 0.85 && ltv > 0.80) {
    insurance = loan * 0.024;
  }
  else {
    insurance = 0;
  }
  return insurance;
}

// Functions that calculate the values for the fields in the report

function calculateMortgageSize(propertyDetails: PropertyDetailsFormType) {
  // TODO: Calculation for mortgage size;
  const insurance = calculateMortgageInsurance(propertyDetails)
  const size =
    propertyDetails.propertyPrice - propertyDetails.intendedDownPaymentDollars + insurance;
  return size;
}

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

// Maintenance is fee is calculated using the 1% rule
// Which is that the annual maint fees is 1% of the purchase price of house
function calculateMaintenanceFee(propertyDetails: PropertyDetailsFormType) {
  const price = propertyDetails.propertyPrice;
  const maintenanceFee = (price * 0.01) / 12;
  return maintenanceFee;
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

function calculateFinalLandTransferTax(propertyDetails: PropertyDetailsFormType) {
  const price = propertyDetails.propertyPrice;
  const LandTransferTax = calculateLandTransferTax(propertyDetails);
  let tax = 0;
  if (propertyDetails.firstTimeHomeBuyer === "Yes") {
    if (price <= 368333) {
      tax = 0;
    } else {
      tax = LandTransferTax - 4000;
    }
  }
  else {
    tax= LandTransferTax;
  }
  return tax;
}

function calculateTermInterest(propertyDetails: PropertyDetailsFormType) {
  let mortgage = calculateMortgageSize(propertyDetails);
  const interest = 0.002833;
  const mortgagePayments = calculateMonthlyMortgage(propertyDetails)
  let month = 1;
  let termInterest = 0;
  while (month <= 60) {
    termInterest = termInterest + (mortgage * interest);
    mortgage = mortgage - (mortgagePayments - (mortgage * interest));
    month++;
  }
  return termInterest;
}

function calculatefirstTimeBuyerIncentive(propertyDetails: PropertyDetailsFormType,financialDetails: FinancialDetailsFormType) {
  const propertyType = propertyDetails.propertyType;
  const income = financialDetails.grossIncome;
  const price = propertyDetails.propertyPrice;
  const downPayment = propertyDetails.intendedDownPaymentDollars;
  const loan = price - downPayment;
  const newDownPayment = downPayment + 0.05*price;
  const ltv = 1 - (newDownPayment / price);
  let incentive = 0;
  if ((propertyType === "I will live there" || propertyType === "I will live there and rent out part of it") && propertyDetails.firstTimeHomeBuyer === "Yes") {
    if ((loan <= 48*income) && (ltv > 0.8) && (income <= 10000)){
      incentive = 0.05 * price;
    }
    else {
      incentive = 0;
    }
  }
  else{
    incentive = 0;
  }
  return incentive;
}