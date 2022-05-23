import { useAtom } from "jotai";
import React from "react";
import {
  propertyDetailsErrorAtom,
  propertyPriceAtom,
} from "~/atoms/calculatorAtom";
import InputWithLabel from "~/components/InputWithLabel";

export default function PropertyPrice() {
  const [propertyPrice, setPropertyPrice] = useAtom(propertyPriceAtom);
  const [error] = useAtom(propertyDetailsErrorAtom);
  return (
    <InputWithLabel
      label="Property Price (CAD)"
      inputMode="decimal"
      name="propertyPrice"
      value={propertyPrice}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setPropertyPrice(e.target.value);
      }}
      error={error?.propertyPrice?._errors[0]}
      required
    />
  );
}
