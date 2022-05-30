import React from "react";
import { Td, Th, Tr } from "~/components/Tables";

export default function TaxBenefitsPage() {
  return (
    <article>
      <section className="space-y-5">
        <h2>Your Taxation with the Investment</h2>
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
