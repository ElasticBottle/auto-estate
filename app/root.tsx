import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { domMax, LazyMotion, m } from "framer-motion";
import { transition } from "./constants/animation";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Auto Estate",
  viewport: "width=device-width,initial-scale=1",
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

export default function App() {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen" data-theme="light">
        <LazyMotion features={domMax}>
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
                  href="/"
                  className="block text-xl font-semibold"
                >
                  AutoEstate
                </m.a>
              </div>
            </m.nav>
          </header>
          <Outlet />
        </LazyMotion>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
