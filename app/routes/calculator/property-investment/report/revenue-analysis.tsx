import React from "react";
import { Td, Th, Tr } from "~/components/Tables";

export default function RevenueAnalysisPage() {
  return (
    <article>
      <h1>Revenue Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2>Average Monthly Revenue: {}</h2>
          <div>
            <h3>Historical Average Monthly Revenue by Year</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full">
              <thead>
                <Tr className="whitespace-nowrap !bg-base-200">
                  <Th>Year</Th>
                  <Th>Monthly Revenue</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Blue</Td>
                  <Td>Blue</Td>
                </Tr>
                <Tr>
                  <Td>Blue</Td>
                  <Td>Blue</Td>
                </Tr>
                <Tr>
                  <Td>Blue</Td>
                  <Td>Blue</Td>
                </Tr>
                <Tr>
                  <Td>Blue</Td>
                  <Td>Blue</Td>
                </Tr>
                <Tr>
                  <Td>Blue</Td>
                  <Td>Blue</Td>
                </Tr>
                <Tr>
                  <Td>Blue</Td>
                  <Td>Blue</Td>
                </Tr>
                <Tr>
                  <Td>Blue</Td>
                  <Td>Blue</Td>
                </Tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-green-400 w-full h-40"></div>
      </div>
    </article>
  );
}
