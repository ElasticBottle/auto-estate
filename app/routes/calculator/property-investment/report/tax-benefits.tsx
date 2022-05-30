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
  });
};

export default function TaxBenefitsPage() {
  const loaderData = useLoaderData();

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
                      position: "top",
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
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
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
              By using the tax deductions, you effectivity can increase your net
              income by {formatPerc(loaderData?.netIncomeChangePercentage)}
            </p>
          </div>
          <ul className="font-bold">
            <li>
              Annual Tax Bill before Deductions:{" "}
              {formatCurrency(loaderData?.annualTaxBeforeDeductibles)}
            </li>
            <li>
              Eligible Deductions:{" "}
              {formatCurrency(loaderData?.eligibleDeductions)}
            </li>
            <li>
              Net Annual Income: {formatCurrency(loaderData?.netAnnualIncome)}
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
                <Th>Maximum Deduction</Th>
                <Th>Tax Credit</Th>
                <Th>Additional Comments</Th>
                <Th>Line on Tax form</Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Th isSticky>Rental Income Deductions</Th>
                <Td>Blue</Td>
                <Td>Blue</Td>
                <Td>Blue</Td>
                <Td>Blue</Td>
                <Td>Blue</Td>
              </Tr>
              <Tr>
                <Th isSticky>CMHC Insurance</Th>
                <Td>Purple</Td>
                <Td>Purple</Td>
                <Td>Purple</Td>
                <Td>Purple</Td>
                <Td>Purple</Td>
              </Tr>
              <Tr>
                <Th isSticky>First Time Home Buyer’s Credit</Th>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
              </Tr>
              <Tr>
                <Th isSticky>Moving Expenses</Th>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
              </Tr>
              <Tr>
                <Th isSticky>GST/HST Rebate</Th>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
              </Tr>
              <Tr>
                <Th isSticky>
                  Working from <wbr />
                  Home Credits
                </Th>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
                <Td>Red</Td>
              </Tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
