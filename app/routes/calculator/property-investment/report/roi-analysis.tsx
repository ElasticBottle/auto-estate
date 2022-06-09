import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, json, redirect } from "@remix-run/server-runtime";
import React from "react";
import { ReactCharts } from "~/components/Graph";
import { Td, Th, Tr } from "~/components/Tables";
import { defaultGraphDataOptions, defaultGraphOptions } from "~/constants/graph";
import { roiAnalysisInvestmentType } from "~/interface/calculator/PropertyInvestment";
import { calculatePropertyInvestmentReportSummaryValues } from "~/lib/calculator/propertyInvestment/calculatePropertyInvestmentReportSummaryValues";
import { calculateRoiAnalysisValues } from "~/lib/calculator/propertyInvestment/calculateRoiAnalysisValues";
import { formatCurrency, formatPerc, getPropertyInvestmentCalculatorDetails } from "~/lib/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const { userDetails, propertyDetails, financialDetails } =
    getPropertyInvestmentCalculatorDetails(request.url);

  const result = calculateRoiAnalysisValues(
    userDetails.data,
    propertyDetails.data,
    financialDetails.data
  );

  return json({
    ...result,
    propertyDetails: propertyDetails.data,
  });
};

export default function RoiAnalysis() {
  const loaderData = useLoaderData();

  return (
    <article>
      <h1>ROI Analysis</h1>
      <div className="flex justify-center">
        <p className="max-w-prose">
          Here we help you see how your Real Estate Investment has performed
          over the past few years in comparison to some other popular
          investments. Note that for all the other investments we take the base
          investment to be the down payment and the yearly principal paid for
          the mortgage to be the yearly investment into the asset class
        </p>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead>
            <Tr className="whitespace-nowrap !bg-base-200">
              <Th isSticky className="md:min-w-[140px]" />
              {roiAnalysisInvestmentType.map((investment) => {
                return <Th key={investment}>{investment}</Th>;
              })}
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Th isSticky>Gross ROI (Capital Gains)</Th>
              <Td>{formatPerc(loaderData?.roi)}</Td>
              <Td>69.25%</Td>
              <Td>34.38%</Td>
              <Td>41.46%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Capital Gains on Down Payment over term</Th>
              <Td>{formatCurrency(loaderData?.yourInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.spInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.tsxInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.reitInvestment)}</Td>
            </Tr>
            <Tr>
              <Th isSticky>Average Yearly Return</Th>
              <Td>14.26%</Td>
              <Td>11.10%</Td>
              <Td>6.08%</Td>
              <Td>7.18%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Average Yearly Inflation Rate</Th>
              <Td>2.81%</Td>
              <Td>3.35%
                  {"(Inflation Rate in USA)"}
              </Td>
              <Td>2.81%</Td>
              <Td>2.81%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Average Real Rate of Return</Th>
              <Td>11.14%</Td>
              <Td>7.50%</Td>
              <Td>3.18%</Td>
              <Td>4.25%</Td>
            </Tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
