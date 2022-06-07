import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import React from "react";
import { pageDirectionAtom } from "~/atoms/calculatorAtom";
import { ReactCharts } from "~/components/Graph";
import {
  defaultGraphDataOptions,
  defaultGraphOptions,
} from "~/constants/graph";
import {
  propertyTypeChoice,
} from "~/interface/calculator/PropertyInvestment";
import { ROUTE_CALC_PROPERTY_INVEST_ROI_ANALYSIS } from "~/constants/routes";
import { Direction } from "~/interface/calculator/PropertyInvestment";
import { formatPerc } from "~/lib/utils";
import classNames from "classnames";

export default function ROI() {
  const loaderData = useLoaderData();
  const location = useLocation();
  const [, setDirection] = useAtom(pageDirectionAtom);
  const [years, setYears] = React.useState(5);
  const [hasRevenue, setHasRevenue] = React.useState(
    loaderData?.propertyDetails.propertyType !== propertyTypeChoice[1]
  );
  return (
    <div className="flex flex-col items-center px-10 space-y-7">
      <div className="text-base font-bold text-center">
        ROI: <span
          className={`${classNames({
            "text-green-500": loaderData?.roi >= 0,
            "text-red-500": loaderData?.roi < 0,
          })}`}
        >
          {formatPerc(loaderData?.roi)}
        </span> Over past {years} years
      </div>
      {/* <input
        className="my-3 "
        type="range"
        min={0}
        max={50}
        step={1}
        value={years}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setYears(e.target.valueAsNumber);
        }}
      /> */}
      {/* TODO: Add in range slider */}
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-5">
        <ul className="p-0 list-none">
          <li>
            Average Yearly Return: {" "}
            {formatPerc(loaderData?.averageYearlyReturn)}
          </li>
          <li>
            Average Inflation: {formatPerc(loaderData?.averageInflation)}
          </li>
          <li>
            Real Yearly Return: {formatPerc(loaderData?.realYearlyReturn)}
          </li>
        </ul>
        <ReactCharts
          option={{
            type: "line",
            data: {
              labels: Object.keys(loaderData?.propertyPriceOverYears || []),
              datasets: [
                {
                  label: "Price of property",
                  data: Object.values(loaderData?.propertyPriceOverYears || []),
                  ...defaultGraphDataOptions({ colorCount: 1 }),
                },
              ],
            },
            options: {
              ...defaultGraphOptions,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Price of the property over time",
                },
              },
            },
          }}
        />
      </div>
      <Link
        to={{
          pathname: ROUTE_CALC_PROPERTY_INVEST_ROI_ANALYSIS,
          search: location.search,
        }}
        onClick={() => {
          setDirection(Direction.FORWARD);
        }}
        className="w-full mt-3 lowercase btn"
      >
        Click here for detailed comparison with other investments
      </Link>
    </div>
  );
}
