import { Outlet } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import React from "react";

export const meta: MetaFunction = () => ({
  title: "Property Investment Report",
});

export default function ReportLayoutPage() {
  return (
    <div className="p-5 space-y-6 md:p-10 prose mx-auto md:!max-w-3xl">
      <Outlet />
    </div>
  );
}
