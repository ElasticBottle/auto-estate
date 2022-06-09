import type {
  FinancialDetailsFormType,
  PropertyDetailsFormType,
  UserDetailFormType,
} from "~/interface/calculator/PropertyInvestment";
import { roiAnalysisInvestmentType } from "~/interface/calculator/PropertyInvestment";

export function calculateRoiAnalysisValues(
  userDetails: UserDetailFormType,
  propertyDetails: PropertyDetailsFormType,
  financialDetails: FinancialDetailsFormType
) {
  const graphData = getGraphData(roiAnalysisInvestmentType);
  const price = propertyDetails.propertyPrice;
  let ROI = (price - (1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price)) / (1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price);
  const downPayment = propertyDetails.intendedDownPaymentDollars;
  const investmentValue1 = (downPayment * (1 + ROI)) - downPayment;
  const investmentValue2 = (downPayment * 1.6925) - downPayment;
  const investmentValue3 = (downPayment * 1.3438) - downPayment;
  const investmentValue4 = (downPayment * 1.4146) - downPayment;
  return {
    roi: ROI,
    //Capital Gains for each Investment
    yourInvestment: investmentValue1,
    spInvestment: investmentValue2,
    tsxInvestment: investmentValue3,
    reitInvestment: investmentValue4,
    //Tax obligation
 


  };
}



async function getGraphData(investmentType: typeof roiAnalysisInvestmentType) {}
