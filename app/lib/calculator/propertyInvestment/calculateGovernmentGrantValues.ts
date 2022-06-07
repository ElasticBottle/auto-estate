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
  const price = propertyDetails.propertyPrice;
  const firstTimeIncentive = 0.05 * price;
  const mortgagePayment = calculateMonthlyMortgage(propertyDetails);
  const newMortgagePayment = calculateNewMonthlyMortgage(propertyDetails);
  
  return {
    qualification: "GOOD NEWS: You qualify for this incentive",
    firstTimeIncentive: firstTimeIncentive,
    monthlyPaymentWithoutIncentive: mortgagePayment,
    monthlyPaymentWithIncentive: newMortgagePayment,
    moneySavedEveryMonth: mortgagePayment - newMortgagePayment,
    moneySavedOverTerm: (mortgagePayment - newMortgagePayment) * 60,
    // this is 14.2%
    percentageSaved: (mortgagePayment - newMortgagePayment) / mortgagePayment,
  };
}


//Functions to calculate monthly mortgage
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

function calculateMortgageSize(propertyDetails: PropertyDetailsFormType) {
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

function calculateNewMortgageInsurance(propertyDetails: PropertyDetailsFormType) {
  const price = propertyDetails.propertyPrice;
  const downPayment = propertyDetails.intendedDownPaymentDollars;
  const newDownPayment = downPayment + (0.05 * price);
  const loan = price - newDownPayment;
  const ltv = loan / price;
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

function calculateNewMortgageSize(propertyDetails: PropertyDetailsFormType) {
  const insurance = calculateMortgageInsurance(propertyDetails)
  const price = propertyDetails.propertyPrice;
  const downPayment = propertyDetails.intendedDownPaymentDollars;
  const newDownPayment = downPayment + (0.05 * price);
  const size =
   price - newDownPayment + insurance;
  return size;
}

function calculateNewMonthlyMortgage(propertyDetails: PropertyDetailsFormType) {
  const interest = 0.002833;
  const mortgage = calculateNewMortgageSize(propertyDetails);
  const time = parseInt(propertyDetails.loanPeriod);
  const monthlyMortgage =
    (mortgage * interest) / (1 - (1 + interest) ** (-12 * time));
  return monthlyMortgage;
}