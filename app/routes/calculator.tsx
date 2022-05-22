import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLocation, useOutlet } from "@remix-run/react";
import { AnimatePresence, m } from "framer-motion";
import { useAtom } from "jotai";
import React from "react";
import { pageDirectionAtom } from "~/atoms/calculatorAtom";
import { calculatorFormVariant, transition } from "~/constants/animation";
import { Direction } from "~/interface/calculator/PropertyInvestment";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Auto Estate Calculators",
});

const navbarVariant = {
  initial: { y: -100 },
  animate: {
    y: 0,
    transition: {
      ...transition,
      when: "beforeChildren",
    },
  },
};
const navItemsVariant = {
  initial: { x: -20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ...transition,
    },
  },
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("formData", formData.keys().next());
  return json({});
};

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
      <header>
        <m.nav
          initial={"initial"}
          animate={"animate"}
          variants={navbarVariant}
          className="px-4 py-3 shadow-sm w-ful md:px-10"
        >
          <div className="max-w-4xl mx-auto">
            <m.a
              variants={navItemsVariant}
              href="#"
              className="block text-xl font-semibold"
            >
              AutoEstate
            </m.a>
          </div>
        </m.nav>
      </header>
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
