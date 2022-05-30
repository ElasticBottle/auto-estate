import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import React from "react";
import { pageDirectionAtom } from "~/atoms/calculatorAtom";
import { ROUTE_CALC_PROPERTY_INVEST_ROI_ANALYSIS } from "~/constants/routes";
import { Direction } from "~/interface/calculator/PropertyInvestment";

export default function ROI() {
  const loaderData = useLoaderData();
  const location = useLocation();
  const [, setDirection] = useAtom(pageDirectionAtom);
  const [years, setYears] = React.useState(30);
  return (
    <div className="flex flex-col items-center px-10">
      <div className="text-base font-bold text-center">
        ROI: {loaderData?.roi}% Over past {years} years
      </div>
      <input
        className="my-3 "
        type="range"
        min={0}
        max={50}
        step={1}
        value={years}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setYears(e.target.valueAsNumber);
        }}
      />
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-5">
        <div className="flex flex-col">
          <p className="text-base">
            Average Yearly Return: : {loaderData?.averageYearlyReturn}
          </p>
          <p className="text-base">
            Average Inflation: : {loaderData?.averageInflation}
          </p>
          <p className="text-base">
            Real Yearly Return: : {loaderData?.realYearlyReturn}
          </p>
          <p className="text-base">Cap Rate: : {loaderData?.capRate}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-base">
            Total Revenue from Property: {loaderData?.totalRevenueFromProperty}
          </p>
          <p className="text-base">
            Total Profit from Property: {loaderData?.totalProfitFromProperty}
          </p>
        </div>
      </div>
      <Link
        to={{
          pathname: ROUTE_CALC_PROPERTY_INVEST_ROI_ANALYSIS,
          search: location.search,
        }}
        onClick={() => {
          setDirection(Direction.FORWARD);
        }}
        className="mt-3 btn"
      >
        Click here for detailed comparison with other investments
      </Link>
    </div>
  );
}
