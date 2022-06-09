import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import { ReactCharts } from "~/components/Graph";
import { Td, Th, Tr } from "~/components/Tables";
import {
  defaultGraphDataOptions,
  defaultGraphOptions,
} from "~/constants/graph";
import { propertyTypeChoice } from "~/interface/calculator/PropertyInvestment";
import { calculateTaxBenefitValues } from "~/lib/calculator/propertyInvestment/calculateTaxBenefitValues";
import {
  formatCurrency,
  formatPerc,
  getPropertyInvestmentCalculatorDetails,
} from "~/lib/utils";

export const loader: LoaderFunction = ({ request }) => {
  const { userDetails, propertyDetails, financialDetails } =
    getPropertyInvestmentCalculatorDetails(request.url);
    

  const result = calculateTaxBenefitValues(
    userDetails.data,
    propertyDetails.data,
    financialDetails.data
  );

  return json({
    ...result,
    propertyDetails: propertyDetails.data,
  });
};

export default function TaxBenefitsPage() {
  const loaderData = useLoaderData();
  const [hasRevenue, setHasRevenue] = React.useState(
    loaderData?.propertyDetails.propertyType !== propertyTypeChoice[1]
  );
  const [hasNoRevenue] = React.useState(
    loaderData?.propertyDetails.propertyType !== propertyTypeChoice[0]
  );

  return (
    <article className="lg:min-w-[35rem]">
      <section className="space-y-5">
        <h2>Your Taxation with the Investment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 space-y-5 md:space-y-10">
          <div className="flex justify-center md:order-last">
            <ReactCharts
              className="w-full"
              option={{
                type: "pie",
                data: {
                  labels: ["Property Income", "Other Income"],
                  datasets: [
                    {
                      label: "Income Source",
                      data: [
                        loaderData?.annualPropertyIncome,
                        loaderData?.annualOtherIncome,
                      ],
                      ...defaultGraphDataOptions({ colorCount: 2 }),
                    },
                  ],
                },
                options: {
                  ...defaultGraphOptions,
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                    title: {
                      display: true,
                      text: "Income Source Breakdown",
                    },
                  },
                  layout: {
                    padding: 10,
                  },
                },
              }}
            />
          </div>
          <ul className="md:col-span-2 font-bold">
            <li>
              Annual Property Income:{" "}
              {formatCurrency(loaderData?.annualPropertyIncome)}
            </li>
            <li>
              Annual Income through other sources:{" "}
              {formatCurrency(loaderData?.annualOtherIncome)}
            </li>
            <li>
              Total Annual Income:{" "}
              {formatCurrency(loaderData?.totalAnnualIncome)}
            </li>
          </ul>
        </div>
        <div className=" flex flex-col md:flex-row md:space-y-10 ">
          <div className="md:order-last w-full flex flex-col items-center">
            <ReactCharts
              className="w-full "
              option={{
                type: "bar",
                data: {
                  labels: ["Before Deductibles", "After Deductibles"],
                  datasets: [
                    {
                      label: "Net Income",
                      data: [
                        loaderData?.netIncomeBeforeDeductibles,
                        loaderData?.netIncomeAfterDeductibles,
                      ],
                      ...defaultGraphDataOptions({ colorCount: 1 }),
                    },
                    {
                      label: "Taxed Bill",
                      data: [
                        loaderData?.taxedBillBeforeDeductibles,
                        loaderData?.taxedBillAfterDeductibles,
                      ],
                      ...defaultGraphDataOptions({ colorCount: 1, offset: 1 }),
                    },
                  ],
                },
                options: {
                  ...defaultGraphOptions,
                  aspectRatio: 1,
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                    title: {
                      display: true,
                      text: "Annual Income breakdown",
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                    },
                  },
                },
              }}
            />
            <p>
              By making use of the available tax deductions, you can effectively increase your net
              income by {formatPerc(loaderData?.netIncomeChangePercentage)}
            </p>
          </div>
          <ul className="font-bold">
            <li>
              Annual Tax Bill before Deductions:{" "}
              {formatCurrency(loaderData?.annualTaxBeforeDeductibles)}
            </li>
            <li>
              Net Income before Deductions:{" "}
              {formatCurrency(loaderData?.annualIncomeWithoutDeductions)}
            </li>
            <li>
              Eligible Deductions:{" "}
              {formatCurrency(loaderData?.eligibleDeductions)}
            </li>
            <li>
              Annual Tax Bill after Deductions :{" "}
              {formatCurrency(loaderData?.taxedBillAfterDeductibles)}
            </li>
            <li>
              Net Annual Income after Deductions: {formatCurrency(loaderData?.netAnnualIncome)}
            </li>
          </ul>
        </div>
      </section>
      <section className="space-y-5">
        <h2>Your Tax Deductibles Breakdown</h2>
        <div className="flex justify-center">
          <p className="max-w-prose">
            As the graphic above illustrates a lot of income can be saved by
            using all the tax deductions at your disposal. However, knowing what
            is tax deductible and how to report it on a income tax can be
            tedious. But thats where AutoEstate’s Tax deductibles Breakdown
            comes in. In the table below not only are all the Tax deductibles
            you are eligible for comes in but we also provide the line number
            where you should include each itemized deduction.
          </p>
        </div>
        <div className="overflow-x-auto w-full">
          <table className=" w-full">
            <thead>
              <Tr className="bg-base-200 whitespace-nowrap">
                <Th isSticky className="md:min-w-[140px]"></Th>
                <Th>Estimated Deduction</Th>
                <Th>Estimated Tax Credit</Th>
                <Th>Additional Comments</Th>
                <Th>Line on Tax form</Th>
              </Tr>
            </thead>
            <tbody>
              {hasRevenue && (
              <Tr>
                <Th isSticky>Rental Income Deductions</Th>
                <Td>CA$ 20483</Td>
                <Td>CA$ 0</Td>
                <Td>Includes all rental expenses and mortgage interest</Td>
                <Td>Form: T1 General   
                    Line: 12600
                </Td>
              </Tr>
             )}
              {hasNoRevenue && (
              <Tr>
                <Th isSticky>Home Buyer's Amount</Th>
                <Td>CA$ 0</Td>
                <Td>CA$ 750</Td>
                <Td>It is a non refundable tax credit for first time homebuyers</Td>
                <Td>Form: T1 General
                    Line: 31270</Td>
              </Tr>
              )}
              {hasNoRevenue && (
              <Tr>
                <Th isSticky>Moving Expenses</Th>
                <Td>CA$ 2000</Td>
                <Td>CA$ 0</Td>
                <Td>You can claim moving expenses upto CA$ 5000 and includes transportation and storage costs</Td>
                <Td>Form: T1 General
                    Line: 21900
                </Td>
              </Tr>
              )}
              
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
