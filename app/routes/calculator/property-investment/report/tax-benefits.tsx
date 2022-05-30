import React from "react";
import { Heading } from "~/components/Heading";

export default function TaxBenefitsPage() {
  return (
    <article className="space-y-10">
      <section className="grid grid-cols-1 space-y-5">
        <Heading as="h2" className="font-bold ">
          Your Taxation with the Investment
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-5 md:space-y-10">
          <div className="flex justify-center md:order-last">
            <div className="aspect-square h-20 w-20 bg-green-400 "></div>
          </div>
          <ul>
            <li className="font-bold">Annual Property Income: CA$ 38,400</li>
            <li className="font-bold">
              Annual Income through other sources: CA$ 120,000
            </li>
            <li className="font-bold">Total Annual Income: CA$ 158,400</li>
          </ul>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 space-y-10 ">
          <div className="md:order-last w-full flex flex-col items-center">
            <div className="aspect-square h-20 w-20 bg-green-400 "></div>
            <p>
              By using the tax deductions, you effectivity can increase your net
              income by 10.11%
            </p>
          </div>
          <ul>
            <li className="font-bold">
              Annual Tax Bill before Deductions: CA$ 55,557
            </li>
            <li className="font-bold">Eligible Deductions: CA$ 23,400</li>
            <li className="font-bold">Net Annual Income: CA$ 113,242</li>
          </ul>
        </div>
      </section>
      <section className="space-y-5">
        <Heading as="h2">Your Tax Deductibles Breakdown</Heading>
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
          <table className="table table-zebra  w-full">
            <thead>
              <tr>
                <th></th>
                <th>Estimated Deduction</th>
                <th>Maximum Deduction</th>
                <th>Tax Credit</th>
                <th>Additional Comments</th>
                <th>Line on Tax form</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="md:text-base text-xs max-w-xs ">
                  Rental Income <wbr /> Deductions
                </th>
                <td>Blue</td>
                <td>Blue</td>
                <td>Blue</td>
                <td>Blue</td>
                <td>Blue</td>
              </tr>
              <tr>
                <th className="md:text-base text-xs max-w-xs ">
                  CMHC Insurance
                </th>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th className="md:text-base text-xs max-w-xs ">
                  First Time Home <wbr /> Buyer’s Credit
                </th>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
              </tr>
              <tr>
                <th className="md:text-base text-xs max-w-xs ">
                  Moving Expenses
                </th>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
              </tr>
              <tr>
                <th className="md:text-base text-xs max-w-xs ">
                  GST/HST Rebate
                </th>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
              </tr>
              <tr>
                <th className="md:text-base text-xs max-w-xs ">
                  Working from <wbr />
                  Home Credits
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
      </section>
    </article>
  );
}
