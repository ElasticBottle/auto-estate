import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, useOutlet } from "@remix-run/react";
import { AnimatePresence, m } from "framer-motion";
import React from "react";
import { transition } from "~/constants/animation";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Auto Estate Calculators",
});

const navbarVariant = {
  initial: { y: -100 },
  animate: {
    y: 0,
  },
};
const navItemsVariant = {
  initial: { x: -20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
  },
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("formData", formData);
};

export default function CalculatorLayout() {
  const outlet = useOutlet();
  return (
    <>
      <header>
        <m.nav
          variants={navbarVariant}
          initial={"initial"}
          animate={"animate"}
          transition={{ ...transition, delayChildren: 0.15 }}
          className="px-4 py-3 shadow-sm w-ful md:px-10"
        >
          <div className="max-w-4xl mx-auto">
            <m.a
              href="#"
              variants={navItemsVariant}
              key="test"
              className="text-xl font-semibold"
            >
              AutoEstate
            </m.a>
          </div>
        </m.nav>
      </header>
      <main className="max-w-4xl mx-auto">
        <Form>
          <AnimatePresence exitBeforeEnter>{outlet}</AnimatePresence>
        </Form>
      </main>
    </>
  );
}
