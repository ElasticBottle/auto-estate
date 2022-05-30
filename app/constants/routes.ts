export const enum CalculatorType {
  PROPERTY_INVESTMENT = "property-investment",
  PROPERTY_AFFORD = "property-afford",
  MORTGAGE_REFINANCING = "mortgage-refinancing",
  MORTGAGE_RENEWAL = "mortgage-renewal",
}

// calculator routes
export const ROUTE_CALC = "/calculator";
export const ROUTE_SPECIFIC_CALC = (type: string) => `${ROUTE_CALC}/${type}`;
export const ROUTE_SPECIFIC_REPORT = (type: string) =>
  `${ROUTE_CALC}/${type}/report`;

// specific calculator routes
export const ROUTE_CALC_PROPERTY_INVEST_FINANCIAL_DETAILS = `${ROUTE_CALC}/${CalculatorType.PROPERTY_INVESTMENT}/financial-details`;
export const ROUTE_CALC_PROPERTY_INVEST_GOVERNMENT_GRANTS = `${ROUTE_SPECIFIC_REPORT(
  CalculatorType.PROPERTY_INVESTMENT
)}/government-grants`;
export const ROUTE_CALC_PROPERTY_INVEST_TAX_BENEFITS = `${ROUTE_SPECIFIC_REPORT(
  CalculatorType.PROPERTY_INVESTMENT
)}/tax-benefits`;
