import React from "react";

export default function ROI() {
  const [years, setYears] = React.useState(30);
  return (
    <div className="flex flex-col items-center px-10">
      <div className="text-base font-bold text-center">
        ROI: xxx% Over past {years} years
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
          <p className="text-base">Average Yearly Return: </p>
          <p className="text-base">Average Inflation: </p>
          <p className="text-base">Real Yearly Return: </p>
          <p className="text-base">Cap Rate: </p>
        </div>
        <div className="flex flex-col">
          <p className="text-base">Total Revenue from Property</p>
          <p className="text-base">Total Profit from Property</p>
        </div>
      </div>
      <button className="mt-3 btn">
        Click here for detailed comparison with other investments
      </button>
    </div>
  );
}
