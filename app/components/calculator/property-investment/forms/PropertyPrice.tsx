import { useSearchParams } from "@remix-run/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  propertyDetailsErrorAtom,
  propertyPriceAtom,
} from "~/atoms/calculatorAtom";
import InputWithLabel from "~/components/InputWithLabel";

export default function PropertyPrice() {
  const [searchParams] = useSearchParams();
  const [propertyPrice, setPropertyPrice] = useAtom(propertyPriceAtom);
  const [error] = useAtom(propertyDetailsErrorAtom);
  useEffect(() => {
    setPropertyPrice(searchParams.get("propertyPrice") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
