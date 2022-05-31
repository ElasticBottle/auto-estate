import { Link } from "@remix-run/react";
import React from "react";
import { ROUTE_CALC } from "~/constants/routes";

export default function index() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full mx-auto">
      <section className="p-10">
        <p>
          Say goodbye to all the number crunching and months of property
          research.
        </p>
        <p>
          Make your Real Estate Investment decisions easier with AutoEstate's
          products
        </p>
      </section>
      <Link to={`${ROUTE_CALC}`} className="btn">
        View products
      </Link>
    </main>
  );
}
