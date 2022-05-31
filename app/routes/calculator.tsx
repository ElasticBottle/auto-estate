import type { MetaFunction } from "@remix-run/node";
import { useLocation, useOutlet } from "@remix-run/react";
import { AnimatePresence, m } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";
import { pageDirectionAtom } from "~/atoms/calculatorAtom";
import { calculatorFormVariant } from "~/constants/animation";
import { Direction } from "~/interface/calculator/PropertyInvestment";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Auto Estate Calculators",
});

export default function CalculatorLayout() {
  const outlet = useOutlet();
  const [direction, setDirection] = useAtom(pageDirectionAtom);
  const location = useLocation();

  React.useEffect(() => {
    const onBackButton = () => {
      setDirection(Direction.BACKWARD);
    };
    window.addEventListener("popstate", onBackButton);
    return () => window.removeEventListener("popstate", onBackButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimatePresence exitBeforeEnter custom={{ direction }}>
        <m.main
          key={location.key}
          variants={calculatorFormVariant}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          custom={{ direction }}
          className="max-w-4xl mx-auto"
        >
          {outlet}
        </m.main>
      </AnimatePresence>
    </>
  );
}
