import React from "react";
import { Heading } from "~/components/Heading";

export default function RoiAnalysis() {
  return (
    <section className="space-y-8">
      <Heading>ROI Analysis</Heading>
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
        <table className="table table-zebra  w-full">
          <thead>
            <tr>
              <th></th>
              <th>
                Your Real Estate <wbr /> Investment
              </th>
              <th>S&P 500</th>
              <th>TSX Composite</th>
              <th>
                High Interest <wbr /> Savings Account
              </th>
              <th>5 year Bond</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">
                Gross ROI <wbr /> (Capital Gains)
              </th>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">Annual Income</th>
              <td>Purple</td>
              <td>Purple</td>
              <td>Purple</td>
              <td>Purple</td>
              <td>Purple</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">
                First Time Home <wbr /> Capital Gains <wbr /> over term
              </th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">
                EBITA over term
              </th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">Tax Obligation</th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">
                Tax Deductions <wbr /> Available
              </th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">NET Gains</th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">
                NET Rate of Return <wbr /> over term
              </th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">
                Inflation Rate <wbr /> over term
              </th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
            <tr>
              <th className="md:text-base text-xs max-w-xs ">
                Real Rate of Return
              </th>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full h-40 bg-green-400"></div>
    </section>
  );
}
