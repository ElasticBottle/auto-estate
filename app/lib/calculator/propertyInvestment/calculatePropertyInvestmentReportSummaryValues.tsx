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
  let ROI = (price - (1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price)) / (1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price)
  const revenue = calculateHasRevenue(propertyDetails);
  const residence = calculateResidence(propertyDetails);
  return {
    // todo: Fill out the values here
    monthlyNetIncomeFromProperty: 2350 - (mortgagePayments + propertyTaxPayments +
      insurancePayments + 200 + 200 + 100),
    // Monthly Cost Section
    totalMonthlyCost:
      mortgagePayments +
      propertyTaxPayments +
      insurancePayments +
      200 +
      200+
      100,
    monthlyMortgage: mortgagePayments,
    propertyTax: propertyTaxPayments,
    homeOwnerInsurance: insurancePayments,
    utilityBill: 200,
    maintenanceFee: 200,
    miscFees: 100,

    // Monthly Revenue Section
    averageMonthlyRevenue: 2350,
    pastMonthlyRevenue: {
      2017: 1275,
      2018: 1500,
      2019: 1750,
      2020: 1960,
      2021: 1875,
      2022: 2350,
    },
    // this is 60%
    increaseRent: 0.8431,
    yearlyIncrease: 0.1301,
    yearlyInflation: 0.0281,
    realYearlyIncrease: 0.0992,
    monthlyOperatingIncome: 2350 - (propertyTaxPayments + insurancePayments + 200 + 200 + 100),
    capRate: ((2350 - (propertyTaxPayments + insurancePayments + 200 + 200 + 100))*12) / price,

    // Closing Cost Section
    closingCosts: landTransferTax + 900 + (mortgageInsurance * 0.08) + 100 + 200 + 400 + 450 + 300,
    landTransferTax: landTransferTax,
    legalFees: 900,
    estoppelCertificateFees: 100,
    governmentRegistrationFees: 200,
    pstOnCMHC: mortgageInsurance * 0.08,
    titleInsurance: 400,
    homeInspection: 450,
    homeAppraisal: 300,
    other: 300,
    // ! Note, these stuff might need tweaking, but feel free to do calculation base on 30 years and I can hook them up in the right place later on

    // ROI section
    roi: ROI,
    averageYearlyReturn: (1+ROI)**(1/5) - 1,
    averageInflation: 0.0281,
    realYearlyReturn: (((1+ROI)**(1/5)) / (1.0281)) - 1,
    propertyPriceOverYears: {
      2017: Math.round(1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price),
      2018: Math.round(0.9686 * 0.8665 * 0.7627 * 0.7971 * price),
      2019: Math.round(0.8665 * 0.7627 * 0.7971 * price),
      2020: Math.round(0.7627 * 0.7971 * price),
      2021: Math.round(0.7971 * price),
      2022: price,
    },

    // Tax Benefits Section
    totalTaxBenefits: (((termInterest / 5) + (insurancePayments * 12) + (propertyTaxPayments * 12) + 200 + 200 + 400) * 5 * revenue) + ((2000 + 750 + mortgageInsurance) * residence),
    // Annual Tax breakdown
    annualTaxBenefits: (termInterest / 5) +(insurancePayments * 12)  + (propertyTaxPayments * 12) + 200 + 200 + 400,
    mortgageInterest: termInterest / 5,
    insurance: insurancePayments * 12,
    tax: (propertyTaxPayments * 12),
    advertizingCost: 200,
    utilities: 200,
    managementMaintenance: 400,
    workingFromHomeCredit: 0,

    // One time tax breakdown
    oneTimeTaxBenefits: 2000 + 750 + mortgageInsurance,
    movingExpenses: 2000,
    firstTimeHomeBuyersCredit: 750,
    mortgageInsurance: mortgageInsurance,

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
  const interest = 0.00281347;
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
  if (propertyDetails.firstTimeHomeBuyer === "Yes" && propertyDetails.propertyType === "I will live there") {
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
  const interest = 0.00281347;
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
  if ((propertyType === "I will live there") && propertyDetails.firstTimeHomeBuyer === "Yes") {
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

function calculateHasRevenue(propertyDetails: PropertyDetailsFormType) {
  if (propertyDetails.propertyType === "I will rent it out") {
    return 1;
  }
  else {
    return 0;
  }
}

function calculateResidence(propertyDetails: PropertyDetailsFormType) {
  if (propertyDetails.propertyType === "I will live there") {
    return 1;
  }
  else {
    return 0;
  }
}