import { Link } from "@remix-run/react";
import React from "react";
import { ROUTE_CALC } from "~/constants/routes";

export default function index() {
  return <Link to={`${ROUTE_CALC}`}>go to calculator</Link>;
}
