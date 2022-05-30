import { Link, useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useAtom } from "jotai";
import React from "react";
import { pageDirectionAtom } from "~/atoms/calculatorAtom";
import ROI from "~/components/calculator/property-investment/display/ROI";
import {
  ROUTE_CALC_PROPERTY_INVEST_GOVERNMENT_GRANTS,
  ROUTE_CALC_PROPERTY_INVEST_TAX_BENEFITS,
} from "~/constants/routes";
import { Direction } from "~/interface/calculator/PropertyInvestment";
import { calculatePropertyInvestmentReportSummaryValues } from "~/lib/calculator/propertyInvestment/calculatePropertyInvestmentReportSummaryValues";
import {
  formatCurrency,
  formatPerc,
  getPropertyInvestmentCalculatorDetails,
} from "~/lib/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const { userDetails, propertyDetails, financialDetails } =
    getPropertyInvestmentCalculatorDetails(request.url);

  const result = calculatePropertyInvestmentReportSummaryValues(
    userDetails.data,
    propertyDetails.data,
    financialDetails.data
  );

  return json({
    ...result,
  });
};

export default function ReportPage() {
  const loaderData = useLoaderData();
  const location = useLocation();
  const [, setDirection] = useAtom(pageDirectionAtom);
  // TODO: Prevent the dissappearing of details when playing fade animation to another page

  return (
    <article>
      <h1>Your investment Evaluation Report</h1>
      <p className="text-base font-bold">
        Monthly Net Operating Income from property:
      </p>

      <div className="flex flex-col justify-between p-5 px-10 space-y-5 border-2 border-gray-600 rounded-lg md:space-y-0 md:flex-row md:justify-evenly dark:border-gray-300 md:items-start">
        <ul className="list-none p-0">
          <li className="text-base font-bold text-center">
            Total Monthly Cost: {formatCurrency(loaderData?.totalMonthlyCost)}
          </li>
          <li>Monthly Mortgage: {formatCurrency(loaderData?.monthlyMortgage)}</li>
          <li>Property Tax: {formatCurrency(loaderData?.propertyTax)}</li>
          <li>
            Homeowner's Insurance:{" "}
            {formatCurrency(loaderData?.homeOwnerInsurance)}
          </li>
          <li>Utility Bill: {formatCurrency(loaderData?.utilityBill)}</li>
          <li>
            Maintenance Fees: {formatCurrency(loaderData?.maintenanceFee)}
          </li>
          <li>Misc Fees: {formatCurrency(loaderData?.miscFees)}</li>
        </ul>
        <ul className="list-none p-0">
          <li className="text-base font-bold text-center">
            Average Monthly Revenue:{" "}
            {formatCurrency(loaderData?.averageMonthlyRevenue)}
          </li>
          <li>Average Occupancy: {formatPerc(loaderData?.averageOccupancy)}</li>
          <li>
            Average Daily Rate: {formatCurrency(loaderData?.averageDailyRate)}
          </li>
          <li>Month With Highest Revenue: {loaderData?.bestRevenueMonth}</li>
          <li>Month With Lowest Revenue: {loaderData?.worstRevenueMonth}</li>
        </ul>
      </div>

      <div className="flex-col items-center px-10">
        <div className="text-base font-bold text-center">
          Closing/ One time Costs: {loaderData?.closingCosts}
        </div>
        <div className="flex flex-col md:justify-center md:flex-row md:space-x-5">
          <div className="flex flex-col">
            <p>Legal Fees: {loaderData?.legalFees}</p>
            <p>Land Transfer Tax: {loaderData?.landTransferTax}</p>
            <p>New Build GST/HST: {loaderData?.newBuildGst}</p>
          </div>
          <div className="flex flex-col">
            <p>Down Payment: {loaderData?.downPayment}</p>
            <p>Home Appraisal: {loaderData?.homeAppraisal}</p>
            <p>Title Insurance: {loaderData?.titleInsurance}</p>
          </div>
          <div className="flex flex-col">
            <p>Home Inspection: {loaderData?.homeInspection}</p>
            <p>Utility Hookups: {loaderData?.utilityHookups}</p>
            <p>Closing Holdback: {loaderData?.closingHoldback}</p>
          </div>
        </div>
      </div>

      <ROI />

      <div className="flex flex-col items-center px-10 space-y-3">
        <div className="text-base font-bold text-center">
          Estimated Total Tax benefits: {loaderData?.estimatedTotalTaxBenefits}
        </div>
        <div className="flex flex-col md:justify-center md:space-x-5 md:flex-row">
          <p className="text-base">
            Annual Tax benefits: {loaderData?.annualTaxBenefits}
          </p>
          <p className="text-base">
            One Time Tax benefits: {loaderData?.oneTimeTaxBenefits}
          </p>
        </div>
        <Link
          to={{
            pathname: ROUTE_CALC_PROPERTY_INVEST_TAX_BENEFITS,
            search: location.search,
          }}
          onClick={() => {
            setDirection(Direction.FORWARD);
          }}
          className="btn"
        >
          Click here for a detailed and accurate tax benefit analysis
        </Link>
      </div>

      <div className="flex flex-col items-center px-10 space-y-4">
        <div className="text-base font-bold text-center">
          Maximum Government Grants you could qualify for:{" "}
        </div>
        <Link
          to={{
            pathname: ROUTE_CALC_PROPERTY_INVEST_GOVERNMENT_GRANTS,
            search: location.search,
          }}
          onClick={() => {
            setDirection(Direction.FORWARD);
          }}
          className="btn"
        >
          Click for more details
        </Link>
      </div>

      <div className="flex flex-col items-center px-10">
        <div className="text-base font-bold text-center">
          Types of Available loan program recommended
        </div>
        <ul className="list-disc ">
          <li>
            <div className="flex justify-between">
              <p className="text-base">Conventional Mortgage</p>
              <Link to="#" className="active:underline md:hidden text-rose-800">
                Learn more
              </Link>
              <Link
                to="#"
                className="hidden md:inline-block text-rose-800 hover:underline"
              >
                Contact and agent to learn more
              </Link>
            </div>
          </li>
          <li>
            <div className="flex justify-between">
              <p className="">High Ratio</p>
              <Link
                to="#"
                className="active:underline md:hidden text-rose-800 "
              >
                Learn more
              </Link>
              <Link
                to="#"
                className="hidden md:inline-block text-rose-800 hover:underline"
              >
                Contact and agent to learn more
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <button className="w-full btn btn-primary">
        Click here to finalize report
      </button>
    </article>
  );
}
