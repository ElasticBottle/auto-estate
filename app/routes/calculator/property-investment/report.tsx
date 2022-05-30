import { Outlet } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import React from "react";

export const meta: MetaFunction = () => ({
  title: "Property Investment Report",
});

export default function ReportLayoutPage() {
  return <Outlet />;
}
