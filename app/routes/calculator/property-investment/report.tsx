import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import ROI from "~/components/calculator/property-investment/display/ROI";
import Heading from "~/components/Heading";
import { formatCurrency, formatPerc } from "~/lib/utils";
import { objectFromFormData } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const term = objectFromFormData(url.searchParams);
  console.log("term", term);
  return json({
    mortgageSize: formatCurrency(124_000),
    mortgageInterest: formatPerc(0.103),
    totalMortgagePaid: formatCurrency(1_000_000),
  });
};

export default function ReportPage() {
  const loaderData = useLoaderData();
  return (
    <div className="p-5 space-y-6 md:p-10">
      <Heading>Your investment Evaluation Report</Heading>
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
          <p className="text-base font-bold text-center">Monthly Cost: </p>
          <p className="text-base">Monthly Mortgage</p>
          <p className="text-base">Property Tax</p>
          <p className="text-base">Homeowner's Insurance</p>
          <p className="text-base">PMI (If applicable)</p>
          <p className="text-base">HOA Fees (If applicable)</p>
          <p className="text-base">Utility Bill</p>
          <p className="text-base">Maintenance Fees</p>
        </div>
        <div className="grid grid-cols-1">
          <p className="text-base font-bold text-center">Monthly Revenue:</p>
          <p className="text-base">Month With best revenue</p>
          <p className="text-base">Month With Worst Revenue</p>
          <p className="text-base">Average Monthly Revenue</p>
          <p className="text-base">Average Occupancy</p>
          <p className="text-base">AverageDaily Rate</p>
        </div>
      </div>

      <div className="flex-col items-center px-10">
        <div className="text-base font-bold text-center">
          Closing/ One time Costs:{" "}
        </div>
        <div className="flex flex-col md:justify-center md:flex-row md:space-x-5">
          <div className="flex flex-col">
            <p className="text-base">Legal Fees</p>
            <p className="text-base">Land Transfer Tax: </p>
            <p className="text-base">New Build GST/HST: 5% + HST</p>
          </div>
          <div className="flex flex-col">
            <p className="text-base">Down Payment</p>
            <p className="text-base">Home Appraisal: </p>
            <p className="text-base">Title Insurance</p>
          </div>
          <div className="flex flex-col">
            <p className="text-base">Home Inspection: </p>
            <p className="text-base">Utility Hookups: </p>
            <p className="text-base">Closing Holdback: </p>
          </div>
        </div>
      </div>

      <ROI />

      <div className="flex flex-col items-center px-10 space-y-3">
        <div className="text-base font-bold text-center">
          Estimated Total Tax benefits
        </div>
        <div className="flex flex-col md:justify-center md:space-x-5 md:flex-row">
          <p className="text-base">Annual Tax benefits: </p>
          <p className="text-base">One Time Tax benefits: </p>
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
