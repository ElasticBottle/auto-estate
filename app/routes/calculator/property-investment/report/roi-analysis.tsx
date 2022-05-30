import React from "react";
import { Td, Th, Tr } from "~/components/Tables";

export default function RoiAnalysis() {
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
              <Th>Your Real Estate Investment</Th>
              <Th>S&P 500</Th>
              <Th>TSX Composite</Th>
              <Th>High Interest Savings Account</Th>
              <Th>5 year Bond</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Th isSticky>Gross ROI (Capital Gains)</Th>
              <Td>Blue</Td>
              <Td>Blue</Td>
              <Td>Blue</Td>
              <Td>Blue</Td>
              <Td>Blue</Td>
            </Tr>
            <Tr>
              <Th isSticky>Annual Income</Th>
              <Td>Purple</Td>
              <Td>Purple</Td>
              <Td>Purple</Td>
              <Td>Purple</Td>
              <Td>Purple</Td>
            </Tr>
            <Tr>
              <Th isSticky>First Time Home Capital Gains over term</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
            <Tr>
              <Th isSticky>EBITA over term</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
            <Tr>
              <Th isSticky>Tax Obligation</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
            <Tr>
              <Th isSticky>Tax Deductions Available</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
            <Tr>
              <Th isSticky>NET Gains</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
            <Tr>
              <Th isSticky>NET Rate of Return over term</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
            <Tr>
              <Th isSticky>Inflation Rate over term</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
            <Tr>
              <Th isSticky>Real Rate of Return</Th>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
              <Td>Red</Td>
            </Tr>
          </tbody>
        </table>
      </div>
      <div className=" mt-5 w-full h-40 bg-green-400"></div>
    </article>
  );
}
