import { useLoaderData } from "@remix-run/react";
import React from "react";
import { ReactCharts } from "~/components/Graph";
import { Td, Th, Tr } from "~/components/Tables";
import { defaultGraphOptions } from "~/constants/graph";
import { roiAnalysisInvestmentType } from "~/interface/calculator/PropertyInvestment";

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
          the mortgage to be the yearly investment into the asset class.
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
              <Td>44.93%</Td>
              <Td>68%</Td>
              <Td>32.22%</Td>
              <Td>16%</Td>
              <Td>0%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Annual Income</Th>
              <Td>38400</Td>
              <Td>7500</Td>
              <Td>12500</Td>
              <Td>0</Td>
              <Td>3000</Td>
            </Tr>
            <Tr>
              <Th isSticky>First Time Home Capital Gains over term</Th>
              <Td>44930</Td>
              <Td>64690</Td>
              <Td>32200</Td>
              <Td>16000</Td>
              <Td>0</Td>
            </Tr>
            <Tr>
              <Th isSticky>EBITA over term</Th>
              <Td>236930</Td>
              <Td>102190</Td>
              <Td>94700</Td>
              <Td>16000</Td>
              <Td>15000</Td>
            </Tr>
            <Tr>
              <Th isSticky>Tax Obligation</Th>
              <Td>94772</Td>
              <Td>30657</Td>
              <Td>28410</Td>
              <Td>0</Td>
              <Td>0</Td>
            </Tr>
            <Tr>
              <Th isSticky>Tax Deductions Available</Th>
              <Td>60000</Td>
              <Td>0</Td>
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
              <Td>15000</Td>
            </Tr>
            <Tr>
              <Th isSticky>NET Rate of Return over term</Th>
              <Td>202%</Td>
              <Td>71.5%</Td>
              <Td>66.29%</Td>
              <Td>16%</Td>
              <Td>15%</Td>
            </Tr>
            <Tr>
              <Th isSticky>Inflation Rate over term</Th>
              <Td>16%</Td>
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
              <Td>-1%</Td>
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
