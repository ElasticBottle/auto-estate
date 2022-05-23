import { useSearchParams } from "@remix-run/react";
import { useAtom } from "jotai";
import React from "react";
import {
  downPaymentDollarAtom,
  propertyDetailsErrorAtom,
} from "~/atoms/calculatorAtom";
import InputWithLabel from "~/components/InputWithLabel";

export default function DownPayment() {
  const [searchParams] = useSearchParams();
  const [downPayment, setDownPayment] = useAtom(downPaymentDollarAtom);
  // const [downPaymentPerc, setDownPaymentPerc] = useAtom(downPaymentPercAtom);
  // const [propertyPrice] = useAtom(propertyPriceAtom);
  const [error] = useAtom(propertyDetailsErrorAtom);
  React.useEffect(() => {
    setDownPayment(searchParams.get("intendedDownPaymentDollars") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   const downPaymentDollar = parseFloat(downPayment);
  //   const propertyPriceFloat = parseFloat(propertyPrice);

  //   if (!propertyPriceFloat) {
  //     return;
  //   }
  //   if (downPaymentDollar) {
  //     setDownPaymentPerc(
  //       ((downPaymentDollar / propertyPriceFloat) * 100).toString()
  //     );
  //     return;
  //   }
  // }, [downPayment, propertyPrice, setDownPaymentPerc]);

  //   React.useEffect(() => {
  //     const downPaymentPercentage = parseFloat(downPaymentPerc);
  //     const propertyPriceFloat = parseFloat(propertyPrice);
  //     if (downPaymentPercentage) {
  //       setDownPayment(
  //         ((downPaymentPercentage / 100) * propertyPriceFloat).toString()
  //       );
  //       return;
  //     }
  //   }, [downPaymentPerc, propertyPrice, setDownPayment]);
  return (
    <fieldset>
      {/* <legend className="mt-5 text-sm text-gray-600">
        Intended Down Payment
      </legend> */}
      <div className="flex flex-col items-center justify-between w-full md:flex-row">
        <InputWithLabel
          type="text"
          inputMode="decimal"
          name="intendedDownPaymentDollars"
          id="intended-down-payment-dollars"
          label="Intended Down Payment (CAD)"
          value={downPayment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDownPayment(e.target.value);
          }}
          error={error?.intendedDownPaymentDollars?._errors[0]}
          required
        />
        {/* <span className="px-5 pt-2">Or</span>
        <InputWithLabel
          type="text"
          inputMode="decimal"
          name="intendedDownPaymentPercentage"
          id="intended-down-payment-percentage"
          label="As a % of Property Price"
          value={ downPaymentPerc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDownPaymentPerc(e.target.value);
          }}
          error={error?.intendedDownPaymentPercentage?._errors[0]}
        /> */}
      </div>
    </fieldset>
  );
}
