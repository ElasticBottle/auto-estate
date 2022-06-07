import { Link, useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import classNames from "classnames";
import { useAtom } from "jotai";
import React from "react";
import { pageDirectionAtom } from "~/atoms/calculatorAtom";
import ROI from "~/components/calculator/property-investment/display/ROI";
import { ReactCharts } from "~/components/Graph";
import {
  defaultGraphDataOptions,
  defaultGraphOptions,
} from "~/constants/graph";
import {
  ROUTE_CALC_PROPERTY_INVEST_GOVERNMENT_GRANTS,
  ROUTE_CALC_PROPERTY_INVEST_TAX_BENEFITS,
} from "~/constants/routes";
import {
  Direction,
  propertyTypeChoice,
} from "~/interface/calculator/PropertyInvestment";
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
    propertyDetails: propertyDetails.data,
  });
};

export default function ReportPage() {
  const loaderData = useLoaderData();
  const location = useLocation();
  const [, setDirection] = useAtom(pageDirectionAtom);
  const [hasRevenue, setHasRevenue] = React.useState(
    loaderData?.propertyDetails.propertyType !== propertyTypeChoice[1]
  );
  const [hasNoRevenue] = React.useState(
    loaderData?.propertyDetails.propertyType !== propertyTypeChoice[0]
  );
  // TODO: Prevent the disappearing of details when playing fade animation to another page
  return (
    <article className="space-y-10">
      <h1>Your Investment Evaluation Report</h1>
      {hasRevenue && (
      <p className="text-base font-bold">
       Estimated Monthly Net Income from property:{" "}
        <span
          className={`${classNames({
            "text-green-500": loaderData?.monthlyNetIncomeFromProperty > 0,
            "text-red-500": loaderData?.monthlyNetIncomeFromProperty < 0,
          })}`}
        >
          {formatCurrency(loaderData?.monthlyNetIncomeFromProperty)}
        </span>
      </p>
      )}
      <div className="flex flex-col justify-between p-5 px-10 space-y-5 border-2 border-gray-600 rounded-lg md:space-y-0 md:flex-row md:justify-evenly md:items-start">
        <div>
        <ul className="p-0 list-none">
            <li className="text-base font-bold ">
              Total Monthly Cost: {formatCurrency(loaderData?.totalMonthlyCost)}
            </li>
        </ul>
          <ReactCharts
            option={{
              type: "doughnut",
              data: {
                labels: [
                  "Monthly Mortgage",
                  "Property Tax",
                  "Homeowner's Insurance",
                  "Utility Bill",
                  "Maintenance Fees",
                  "HOA Fees",
                ],
                datasets: [
                  {
                    label: "Cost breakdown",
                    data: [
                      loaderData?.monthlyMortgage,
                      loaderData?.propertyTax,
                      loaderData?.homeOwnerInsurance,
                      loaderData?.utilityBill,
                      loaderData?.maintenanceFee,
                      loaderData?.miscFees,
                    ],
                    ...defaultGraphDataOptions({ colorCount: 6 }),
                  },
                ],
              },
              options: {
                ...defaultGraphOptions,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  title: {
                    display: true,
                    text: "Monthly Cost Breakdown",
                  },
                },
              },
            }}
          />
          <ul className="p-0 list-none">
            <li>
              Monthly Mortgage {"(includes any mortgage insurance)"}: {formatCurrency(loaderData?.monthlyMortgage)}
            </li>
            <li>Property Tax: {formatCurrency(loaderData?.propertyTax)}</li>
            <li>
              Homeowner's Insurance:{" "}
              {formatCurrency(loaderData?.homeOwnerInsurance)}
            </li>
            <li>Utility Bill: {formatCurrency(loaderData?.utilityBill)}</li>
            <li>
              Maintenance Fees: {formatCurrency(loaderData?.maintenanceFee)}
            </li>
            <li>HOA Fees: {formatCurrency(loaderData?.miscFees)}</li>
          </ul>
        </div>
        {hasRevenue && (
          <div>
            <ul className="p-0 list-none">
              <li className="text-base font-bold ">
                Average Monthly Revenue:{" "}
                {formatCurrency(loaderData?.averageMonthlyRevenue)}
              </li>
            </ul>
            <ReactCharts
              option={{
                type: "line",
                data: {
                  labels: Object.keys(loaderData?.pastMonthlyRevenue || []),
                  datasets: [
                    {
                      label: "Rental Yield of Property",
                      data: Object.values(loaderData?.pastMonthlyRevenue || []),
                      ...defaultGraphDataOptions({ colorCount: 1 }),
                     
                    },
                  ],
                },
                options: {
                  ...defaultGraphOptions,
                  aspectRatio: 1,
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom"
                    },
                    title: {
                      display: true,
                      text: "Rental Yield of Property over the last 5 years",
                    },
                  },
                },
              }}
            />
            <ul className="p-0 list-none">
              <li>
                Increase in Rent over the last 5 years: {formatPerc(loaderData?.increaseRent)}
              </li>
              <li>
                Average Yearly Increase:{" "}
                {formatPerc(loaderData?.yearlyIncrease)}
              </li>
              <li>
                Average Yearly Inflation: {formatPerc(loaderData?.yearlyInflation)}
              </li>
              <li>
                Real Yearly Increase: {formatPerc(loaderData?.realYearlyIncrease)}
              </li>
              <li>
                Estimated Net Operating Income: {formatCurrency(loaderData?.monthlyOperatingIncome)}
              </li>
              <li>
                Estimated Cap Rate: {formatPerc(loaderData?.capRate)}
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex-col items-center px-10">
        <div className="text-base font-bold text-center">
          Estimated Closing Cost: {formatCurrency(loaderData?.closingCosts)}
        </div>
        <div className="flex flex-col md:justify-center md:flex-row md:space-x-5">
        <ul className="p-0 list-none">
            <li>
              Land Transfer Tax {"(including any rebate)"}: {formatCurrency(loaderData?.landTransferTax)}
            </li>
            <li>Legal Fees: {formatCurrency(loaderData?.legalFees)}</li>
            <li>
               Estoppel Certificate Fees:{" "}
              {formatCurrency(loaderData?.estoppelCertificateFees)}
            </li>
            <li>
              Government Registration Fees: {formatCurrency(loaderData?.governmentRegistrationFees)}
            </li>
          </ul>
          <ul className="p-0 list-none">
            <li>
              PST on Mortgage Insurance: {formatCurrency(loaderData?.pstOnCMHC)}
            </li>
            <li>
              Title Insurance: {formatCurrency(loaderData?.titleInsurance)}
            </li>
            <li>
              Home Inspection: {formatCurrency(loaderData?.homeInspection)}
            </li>
            <li>Home Appraisal: {formatCurrency(loaderData?.homeAppraisal)}</li>
          </ul>
          <ReactCharts
            option={{
              type: "doughnut",
              data: {
                labels: [
                  "Land Transfer Tax",
                  "PST on Mortgage Insurance",
                  "Legal Fees",
                  "Title Insurance",
                  "Home Inspection",
                  "Home Appraisal",
                  "Other"
                  
                ],
                datasets: [
                  {
                    label: "Closing Cost breakdown",
                    data: [
                      loaderData?.landTransferTax,
                      loaderData?.pstOnCMHC,
                      loaderData?.legalFees,
                      loaderData?.titleInsurance,
                      loaderData?.homeInspection,
                      loaderData?.homeAppraisal,
                      loaderData?.other,
                      
                    ],
                    ...defaultGraphDataOptions({ colorCount: 7 }),
                  },
                ],
              },
              options: {
                ...defaultGraphOptions,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  title: {
                    display: true,
                    text: "Closing Cost Breakdown",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <ROI />

      <div className="flex flex-col items-center px-10 space-y-3">
        <div className="text-base font-bold text-center">
          Total Tax benefits over the term (5 years):{" "}
          {formatCurrency(loaderData?.totalTaxBenefits)}
        </div>
        <div className="flex flex-col md:justify-center md:space-x-5 md:flex-row">
        {hasRevenue && (
          <ul className="p-0 list-none">
            <li className="text-base font-bold ">
              Average Annual Tax Deductables over Term:{" "}
              {formatCurrency(loaderData?.annualTaxBenefits)}
            </li>
            <li>
              Mortgage Interest: {formatCurrency(loaderData?.mortgageInterest)}
            </li>
            <li>
              HomeOwner's Insurance: {formatCurrency(loaderData?.insurance)}
            </li>
            <li>Property Tax: {formatCurrency(loaderData?.tax)}</li>
            <li>
              Advertising Cost: {formatCurrency(loaderData?.advertizingCost)}
            </li>
            <li>Utilities: {formatCurrency(loaderData?.utilities)}</li>
            <li>
              Maintenance and Management Cost:{" "}
              {formatCurrency(loaderData?.managementMaintenance)}
            </li>
          </ul>
        )}
        {hasNoRevenue && (
          <ul className="p-0 list-none">
            <li className="text-base font-bold ">
              One Time Tax benefits:{" "}
              {formatCurrency(loaderData?.oneTimeTaxBenefits)}
            </li>
            <li>
              Home Buyer's Amount:{" "}
              {formatCurrency(loaderData?.firstTimeHomeBuyersCredit)}
            </li>
            <li>
              Moving Expenses: {formatCurrency(loaderData?.movingExpenses)}
            </li>
          </ul>
        )}
        </div>
        <Link
          to={{
            pathname: ROUTE_CALC_PROPERTY_INVEST_TAX_BENEFITS,
            search: location.search,
          }}
          onClick={() => {
            setDirection(Direction.FORWARD);
          }}
          className="w-full lowercase btn"
        >
          Click here for a detailed and accurate tax benefit analysis
        </Link>
      </div>
      {hasNoRevenue && ( 
      <section className="px-10">
        <p>Did you know ?</p>
        <p>
          The Government of Canada has special programs and savings instruments
          that help with your down payment if you are buying a house for
          residing in it.
        </p>
        <p>
          Below we have mentioned the possible programs that would help make
          buying your house a lot easier and may help with your monthly
          payments.
        </p>
      </section>
      )}
      {hasNoRevenue && ( 
      <div className="flex flex-col items-center px-10 space-y-4">
        <div className="text-base font-bold text-center">
          Maximum Government Incentives and Programs you could qualify for:{" "}
          {formatCurrency(loaderData?.firstTimeBuyerIncentive)} {"+"} {"you can withdraw up to "}
           {formatCurrency(loaderData?.homeBuyerGrant)} {"of your tax free savings from your RRSP through Home Buyer's Plan"}
        </div>
        <section className="flex flex-col md:flex-row md:space-x-5">
          <p>Home Buyer’s Plan: {formatCurrency(loaderData?.homeBuyerGrant)}</p>
          <p>
            First Time Home Buyer’s Incentive:{" "}
            {formatCurrency(loaderData?.firstTimeBuyerIncentive)}
          </p>
        </section>
        <Link
          to={{
            pathname: ROUTE_CALC_PROPERTY_INVEST_GOVERNMENT_GRANTS,
            search: location.search,
          }}
          onClick={() => {
            setDirection(Direction.FORWARD);
          }}
          className="w-full lowercase btn"
        >
          Click here to learn more about these programs
        </Link>
      </div>
      )}
    </article>
  );
}
