export const enum CalculatorType {
  PROPERTY_INVESTMENT = "property-investment",
  PROPERTY_AFFORD = "property-afford",
  MORTGAGE_REFINANCING = "mortgage-refinancing",
  MORTGAGE_RENEWAL = "mortgage-renewal",
}

export const ROUTE_CALC = "/calculator";
export const ROUTE_SPECIFIC_REPORT = (type: string) =>
  `${ROUTE_CALC}/${type}/report`;
export const ROUTE_SPECIFIC_CALC = (type: string) => `${ROUTE_CALC}/${type}`;
export const ROUTE_CALC_PROPERTY_INVEST_FINANCIAL_DETAILS = `${ROUTE_CALC}/${CalculatorType.PROPERTY_INVESTMENT}/financial-details`;
