import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { domMax, LazyMotion } from "framer-motion";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Auto Estate",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html
      lang="en"
      className="h-full text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-50"
      suppressHydrationWarning
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full min-h-screen" data-theme="light">
        <LazyMotion features={domMax}>
          <Outlet />
        </LazyMotion>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
