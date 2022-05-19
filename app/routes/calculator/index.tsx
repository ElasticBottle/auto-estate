import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";
import { Link, useLocation } from "@remix-run/react";
import { m } from "framer-motion";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { fadeRightVariant, transition } from "~/constants/animation";

const enum CalculatorType {
  PROPERTY_INVESTMENT = "property-investment",
  PROPERTY_AFFORD = "property-afford",
  MORTGAGE_REFINANCING = "mortgage-refinancing",
  MORTGAGE_RENEWAL = "mortgage-renewal",
}

export default function CalculatorIndexPage() {
  const defaultSelection = CalculatorType.PROPERTY_INVESTMENT;
  const [selection, setSelection] = React.useState(defaultSelection);
  const location = useLocation();

  return (
    <div className="overflow-x-hidden">
      <m.div
        variants={fadeRightVariant}
        initial="initial"
        animate="animate"
        exit="initial"
        transition={transition}
        className="grid w-full h-full grid-cols-1 p-5 space-y-5 overflow-x-hidden"
      >
        <h1 className="text-2xl font-bold text-center">Investor Evaluator</h1>
        <div className="space-y-2 text-sm text-center">
          <p>Welcome to our evaluator, let’s get you started </p>
          <p>What service are you looking for?</p>
        </div>

        <RadioGroup
          className="space-y-4"
          aria-label="investment choice"
          defaultValue={defaultSelection}
          value={selection}
          onValueChange={(value) => setSelection(value as CalculatorType)}
        >
          <RadioItem
            label={"Property Investment Evaluation"}
            value={CalculatorType.PROPERTY_INVESTMENT}
          />
          <RadioItem
            label={"Property Affordability Evaluation (coming soon)"}
            value={CalculatorType.PROPERTY_AFFORD}
            disabled
          />
          <RadioItem
            label={"Mortgage Refinancing Evaluation (coming soon)"}
            value={CalculatorType.MORTGAGE_REFINANCING}
            disabled
          />
          <RadioItem
            label={"Mortgage Renewal Evaluation (coming soon)"}
            value={CalculatorType.MORTGAGE_RENEWAL}
            disabled
          />
        </RadioGroup>
        <input
          name="calculatorType"
          className="hidden"
          value={selection}
          readOnly
        />
        <Link
          to={{
            pathname: `${location.pathname}/${selection}`,
          }}
          className="btn"
        >
          Next
        </Link>
      </m.div>
    </div>
  );
}

export function RadioItem({
  label,
  value,
  disabled = false,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  const id = label.split(" ").join("-");
  return (
    <div className="flex items-center">
      <RadioGroupItem value={value} id={id} disabled={disabled} asChild>
        <button className="flex items-center justify-start w-full m-1 px-3 py-8 transition-all border-2 border-red-900 rounded-xl hover:scale-[1.01] active:scale-[0.98] hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-1 focus:ring-red-800 focus:ring-offset-2  dark:focus:ring-red-50 dark:disabled:hover:bg-gray-700 dark:disabled:bg-gray-700 disabled:bg-gray-300 disabled:active:scale-100 disabled:hover:scale-100">
          <label htmlFor={id}>{label}</label>
          <RadioGroupIndicator asChild={true}>
            <m.div layoutId="check" className="pl-6">
              <FaCheckCircle />
            </m.div>
          </RadioGroupIndicator>
        </button>
      </RadioGroupItem>
    </div>
  );
}
