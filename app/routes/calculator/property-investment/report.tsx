import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import ROI from "~/components/calculator/property-investment/display/ROI";
import Heading from "~/components/Heading";
import {
  FinancialDetailsFormSchema,
  PropertyDetailsFormSchema,
  UserDetailFormSchema,
} from "~/interface/calculator/PropertyInvestment";
import { calculatePropertyInvestmentValues } from "~/lib/calculator/propertyInvestment";
import { objectFromFormData } from "~/utils";

export const meta: MetaFunction = () => ({
  title: "Property Investment Report",
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const term = objectFromFormData(url.searchParams);
  const userDetails = UserDetailFormSchema.safeParse(term);
  const propertyDetails = PropertyDetailsFormSchema.safeParse(term);
  const financialDetails = FinancialDetailsFormSchema.safeParse(term);
  if (!userDetails.success) {
    console.log("userDetails.error.format()", userDetails.error.format());
    return json({ parseError: userDetails.error.format() });
  }
  if (!propertyDetails.success) {
    console.log(
      "propertyDetails.error.format()",
      propertyDetails.error.format()
    );
    return json({ parseError: propertyDetails.error.format() });
  }
  if (!financialDetails.success) {
    console.log(
      "financialDetails.error.format()",
      financialDetails.error.format()
    );
    return json({ parseError: financialDetails.error.format() });
  }

  const result = calculatePropertyInvestmentValues(
    userDetails.data,
    propertyDetails.data,
    financialDetails.data
  );

  return json({
    ...result,
  });
};

export default function ReportPage() {
  const loaderData = useLoaderData();

  return (
    <div className="p-5 space-y-6 md:p-10">
      <Heading>Your Investment Evaluation Report</Heading>
      <div className="space-y-3">
        <p className="text-base font-bold">
          Monthly Net Operating Income from property:
        </p>
        <div className="flex flex-col justify-between space-y-1 md:flex-row">
          <p className="text-base font-bold">
            Mortgage Size: {loaderData.mortgageSize}
          </p>
          <p className="text-base font-bold">
            Mortgage Interest: {loaderData.mortgageInterest}
          </p>
          <p className="text-base font-bold">
            Total Mortgage Paid: {loaderData.totalMortgagePaid}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between p-5 px-10 space-y-5 border-2 border-gray-600 rounded-lg md:space-y-0 md:flex-row md:justify-evenly dark:border-gray-300 md:items-start">
        <div className="grid grid-cols-1">
          <p className="text-base font-bold text-center">
            Monthly Cost: {loaderData.monthlyCost}
          </p>
          <p className="text-base">
            Monthly Mortgage{loaderData.monthlyMortgage}
          </p>
          <p className="text-base">Property Tax: {loaderData.propertyTax}</p>
          <p className="text-base">
            Homeowner's Insurance: {loaderData.homeOwnerInsurance}
          </p>
          <p className="text-base">PMI (If applicable): {loaderData.pmi}</p>
          <p className="text-base">
            HOA Fees (If applicable): {loaderData.hoaFees}
          </p>
          <p className="text-base">Utility Bill: {loaderData.utilityBill}</p>
          <p className="text-base">
            Maintenance Fees: {loaderData.maintenanceFee}
          </p>
        </div>
        <div className="grid grid-cols-1">
          <p className="text-base font-bold text-center">
            Monthly Revenue: {loaderData.monthlyRevenue}
          </p>
          <p className="text-base">
            Month With Best Revenue: {loaderData.bestRevenueMonth}
          </p>
          <p className="text-base">
            Month With Worst Revenue: {loaderData.worstRevenueMonth}
          </p>
          <p className="text-base">
            Average Monthly Revenue: {loaderData.averageMonthlyRevenue}
          </p>
          <p className="text-base">
            Average Occupancy: {loaderData.averageOccupancy}
          </p>
          <p className="text-base">
            AverageDaily Rate: {loaderData.averageDailyRate}
          </p>
        </div>
      </div>

      <div className="flex-col items-center px-10">
        <div className="text-base font-bold text-center">
          Closing/ One time Costs: {loaderData.closingCosts}
        </div>
        <div className="flex flex-col md:justify-center md:flex-row md:space-x-5">
          <div className="flex flex-col">
            <p className="text-base">Legal Fees: {loaderData.legalFees}</p>
            <p className="text-base">
              Land Transfer Tax: {loaderData.landTransferTax}
            </p>
            <p className="text-base">
              New Build GST/HST: {loaderData.newBuildGst}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base">Down Payment: {loaderData.downPayment}</p>
            <p className="text-base">
              Home Appraisal: {loaderData.homeAppraisal}
            </p>
            <p className="text-base">
              Title Insurance: {loaderData.titleInsurance}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base">
              Home Inspection: {loaderData.homeInspection}
            </p>
            <p className="text-base">
              Utility Hookups: {loaderData.utilityHookups}
            </p>
            <p className="text-base">
              Closing Holdback: {loaderData.closingHoldback}
            </p>
          </div>
        </div>
      </div>

      <ROI />

      <div className="flex flex-col items-center px-10 space-y-3">
        <div className="text-base font-bold text-center">
          Estimated Total Tax benefits: {loaderData.estimatedTotalTaxBenefits}
        </div>
        <div className="flex flex-col md:justify-center md:space-x-5 md:flex-row">
          <p className="text-base">
            Annual Tax benefits: {loaderData.annualTaxBenefits}
          </p>
          <p className="text-base">
            One Time Tax benefits: {loaderData.oneTimeTaxBenefits}
          </p>
        </div>
        <button className="btn">
          Click here for a detailed and accurate tax benefit analysis
        </button>
      </div>

      <div className="flex flex-col items-center px-10 space-y-4">
        <div className="text-base font-bold text-center">
          Maximum Government Grants you could qualify for:{" "}
        </div>
        <button className="btn">Click for more details</button>
      </div>

      <div className="flex flex-col items-center px-10">
        <div className="text-base font-bold text-center">
          Types of Available loan program recommended
        </div>
        <ul className="list-disc ">
          <li>
            <div className="flex justify-between">
              <p className="text-base">Conventional Mortgage</p>
              <Link to="#" className="active:underline md:hidden text-rose-800">
                Learn more
              </Link>
              <Link
                to="#"
                className="hidden md:inline-block text-rose-800 hover:underline"
              >
                Contact and agent to learn more
              </Link>
            </div>
          </li>
          <li>
            <div className="flex justify-between">
              <p className="">High Ratio</p>
              <Link
                to="#"
                className="active:underline md:hidden text-rose-800 "
              >
                Learn more
              </Link>
              <Link
                to="#"
                className="hidden md:inline-block text-rose-800 hover:underline"
              >
                Contact and agent to learn more
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <button className="w-full btn btn-primary">
        Click here to finalize report
      </button>
    </div>
  );
}
