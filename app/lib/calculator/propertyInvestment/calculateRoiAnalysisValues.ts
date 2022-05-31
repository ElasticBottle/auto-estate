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
  return {};
}

async function getGraphData(investmentType: typeof roiAnalysisInvestmentType) {}
