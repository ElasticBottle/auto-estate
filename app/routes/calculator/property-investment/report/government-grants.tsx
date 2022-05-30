import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import React from "react";
import { calculateGovernmentGrantValues } from "~/lib/calculator/propertyInvestment/calculateGovernmentGrantValues";
import { getPropertyInvestmentCalculatorDetails } from "~/lib/utils";

export const loader: LoaderFunction = ({ request }) => {
  const { userDetails, propertyDetails, financialDetails } =
    getPropertyInvestmentCalculatorDetails(request.url);

  const result = calculateGovernmentGrantValues(
    userDetails.data,
    propertyDetails.data,
    financialDetails.data
  );

  return json({
    ...result,
  });
};

export default function GovernmentGrantPage() {
  // TODO: Type this
  const loaderData = useLoaderData();

  return (
    <article className="min-w-fit">
      <h1>Government Programs and Rebates</h1>
      <section>
        Buying a house is a big decision in your life. For most people a
        mortgage is the largest debt they would ever take on in their lives. To
        make the process easier the Government of Canada has a few financial
        tools and programs that help you with both saving up for down payments
        and help reduce your monthly payments.
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <h2 className="md:col-span-2">First Time Home Buyer's Incentive</h2>
        <div>
          <section>
            This program can be thought as a second mortgage in addition to your
            original mortgage. The program works in a way such that the
            Government becomes a 5 or 10% equity owner in your home and becomes
            a co-owner. This way either the amount is required to be returned
            after 25 years or the equity value of the house is to be returned to
            the Government upon sale.
          </section>
          <section>
            <h3>Eligibility Requirements:</h3>
            <ul>
              <li> Your annual income does not exceed CA$120,000</li>
              <li>
                Your total borrowing is no more that 4 times your annual income
              </li>
              <li>
                You or your spouse are a first time home buyer or have not owned
                a house for the last 4 years
              </li>
              <li>
                You meet the requirements to make a 5% down payment in the house
                without assistance
              </li>
              <li> Your mortgage LTV is greater than 80%</li>
              <li>
                You are a Canadian Citizen, PR or authorized to work in the
                country
              </li>
              <li>
                You are buying the house as your primary residence and must move
                in within 1 year of closing the purchase
              </li>
            </ul>
          </section>
          <section>
            <h3>Benefits of the Program:</h3>
            <ul>
              <li>
                The incentive allows you to reduce the LTV and thus reduce
                monthly payments
              </li>
              <li>
                The program works for Single Family Homes, Duplex, Triplex,
                fourplex, Town Houses, Condominium Units and semi-detached homes
              </li>
              <li>
                The incentive is interest free as the government shares equity
                in the house which means if you sell the house at a loss the
                government incurs a part of the loss proportional to its equity
              </li>
            </ul>
          </section>
        </div>
        <div className="space-y-10">
          <div className="text-green-600 font-bold">
            {loaderData?.qualification}
          </div>
          <div className="list-none">
            <p className="font-bold">
              First Time Home Buyer’s Incentive:{" "}
              {loaderData?.firstTimeIncentive}
            </p>
            <p className="font-bold">
              Monthly Payments without Incentive:{" "}
              {loaderData?.monthlyPaymentWithoutIncentive}
            </p>
            <p className="font-bold">
              Monthly Payments with Incentive:{" "}
              {loaderData?.monthlyPaymentWithIncentive}
            </p>
            <p className="font-bold">
              Money Saved over Term: {loaderData?.moneySavedOverTerm}
            </p>
            <p className="font-bold">
              Payments made cheaper by: {loaderData?.percentageSaved}
            </p>
          </div>
          <div className="aspect-square bg-green-400 min-h-16 min-w-[64px]"></div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-10">
        <h2 className="md:col-span-2">Home Buyer's Plan</h2>
        <section className="space-y-4">
          <p>
            The Home Buyer’s Plan is actually one of the few withdrawal clauses
            of the RRSP program. This plan allows Investors to withdraw upto CA$
            35,000 from their RRSP fund, which makes this amount essential tax
            free as all the funds in RRSP can be tax written off.
          </p>
          <section>
            <h3> Eligibility Requirements:</h3>
            <ul>
              <li>You must be considered a first time home buyer</li>
              <li>
                You are buying the house as your primary residence and must move
                in within 1 year of closing the purchase
              </li>
              <li>
                You must have a written agreement to buy or build a home for
                yourself or a person of disability
              </li>
            </ul>
          </section>
        </section>

        <section>
          <h3> Benefits of the Program:</h3>
          <ul>
            <li>
              This allows you to use your tax free savings to help with your
              down payment, remember the larger the down payment the lower the
              monthly mortgage
            </li>
            <li>
              The repayment to the RRSP can be done over a period over the next
              year, esentially making your RRSP provide you an interest free
              loan
            </li>
            <li>
              Both you and your spouse can withdraw from their respective RRSP,
              saving a lot in taxes and bringing the downpayment to 20% to
              eliminate the need for mortgage Insurance
            </li>
          </ul>
        </section>
      </section>
    </article>
  );
}
