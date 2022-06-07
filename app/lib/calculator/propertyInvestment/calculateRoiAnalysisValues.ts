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
  let ROI = (price - (0.9354 * 0.7536 * 1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price)) / (0.9354 * 0.7536 * 1.0065 * 0.9686 * 0.8665 * 0.7627 * 0.7971 * price);
  const downPayment = propertyDetails.intendedDownPaymentDollars;
  const investmentValue1 = (downPayment * (1 + ROI)) - downPayment;
  const investmentValue2 = (downPayment * 1.9823) - downPayment;
  const investmentValue3 = (downPayment * 1.3914) - downPayment;
  const investmentValue4 = (downPayment * 1.6958) - downPayment;
  const div1 = 2500 * 12;
  const div2 = downPayment * 0.0197;
  const div3 = downPayment * 0.025;
  const div4 = downPayment * 0.0296;
  const ebita1 = (div1 * 7) + investmentValue1;
  const ebita2 = (div2 * 7) + investmentValue2;
  const ebita3 = (div3 * 7) + investmentValue3;
  const ebita4 = (div4 * 7) + investmentValue4;
  return {
    roi: ROI,
    //Capital Gains for each Investment
    yourInvestment: investmentValue1,
    spInvestment: investmentValue2,
    tsxInvestment: investmentValue3,
    reitInvestment: investmentValue4,
    //Annual Income for each Investment
    incomeInvestment: div1,
    incomeSP: div2,
    incomeTSX: div3,
    incomeREIT: div4,
    //EBITA over term
    ebitaInvestment: ebita1,
    ebitaSP: ebita2,
    ebitaTSX: ebita3,
    ebitaREIT: ebita4,

  };
}



async function getGraphData(investmentType: typeof roiAnalysisInvestmentType) {}
