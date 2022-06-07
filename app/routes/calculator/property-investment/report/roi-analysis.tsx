import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/server-runtime";
import React from "react";
import { ReactCharts } from "~/components/Graph";
import { Td, Th, Tr } from "~/components/Tables";
import { defaultGraphOptions } from "~/constants/graph";
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
              <Td>98.36%</Td>
              <Td>39.14%</Td>
              <Td>69.58%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Capital Gains on Down Payment over term</Th>
              <Td>{formatCurrency(loaderData?.yourInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.spInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.tsxInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.reitInvestment)}</Td>
            </Tr>
            <Tr>
              <Th isSticky>Average Annual Income</Th>
              <Td>{formatCurrency(loaderData?.incomeInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.incomeSP)}</Td>
              <Td>{formatCurrency(loaderData?.incomeTSX)}</Td>
              <Td>{formatCurrency(loaderData?.incomeREIT)}</Td>
            </Tr>
            <Tr>
              <Th isSticky>EBITA over term</Th>
              <Td>{formatCurrency(loaderData?.ebitaInvestment)}</Td>
              <Td>{formatCurrency(loaderData?.ebitaSP)}</Td>
              <Td>{formatCurrency(loaderData?.ebitaTSX)}</Td>
              <Td>{formatCurrency(loaderData?.ebitaREIT)}</Td>
            </Tr>
            <Tr>
              <Th isSticky>Tax Obligation</Th>
              <Td>94772</Td>
              <Td>30657</Td>
              <Td>28410</Td>
              <Td>0</Td>
            </Tr>
            <Tr>
              <Th isSticky>Tax Deductions Available</Th>
              <Td>60000</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
            </Tr>
            <Tr>
              <Th isSticky>NET Gains</Th>
              <Td>202158</Td>
              <Td>71533</Td>
              <Td>66290</Td>
              <Td>16000</Td>
            </Tr>
            <Tr>
              <Th isSticky>NET Rate of Return over term</Th>
              <Td>202%</Td>
              <Td>71.5%</Td>
              <Td>66.29%</Td>
              <Td>16%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Inflation Rate over term</Th>
              <Td>16%</Td>
              <Td>16%</Td>
              <Td>16%</Td>
              <Td>16%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Real Rate of Return</Th>
              <Td>186%</Td>
              <Td>55.5%</Td>
              <Td>50.29%</Td>
              <Td>0%</Td>
            </Tr>
          </tbody>
        </table>
      </div>
      <ReactCharts
        option={{
          type: "line",
          data: {
            labels: [...roiAnalysisInvestmentType],
            datasets: [],
          },
          options: {
            ...defaultGraphOptions,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "ROI Analysis breakdown",
              },
            },
          },
        }}
      />
    </article>
  );
}
