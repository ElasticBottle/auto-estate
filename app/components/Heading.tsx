import classNames from "classnames";
import React from "react";

interface HeadingProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

export function Heading<T extends React.ElementType = "h1">({
  as,
  ...props
}: HeadingProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof HeadingProps<T>>) {
  const _className = classNames({
    "text-2xl font-bold md:text-3xl": true,
    [props.className || ""]: true,
  });
  const Component = as || "h1";
  return <Component {...props} className={_className} />;
}
