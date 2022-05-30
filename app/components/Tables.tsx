import classNames from "classnames";

export function Th({
  isSticky = false,
  className,
  children,
}: {
  isSticky?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const _className = classNames({
    "sticky bg-inherit z-10 left-0": isSticky,
    "p-2 md:p-4": true,
    [className || ""]: true,
  });
  return <th className={_className}>{children}</th>;
}

export function Td({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const _className = classNames({
    "p-2 md:p-4": true,
    [className || ""]: true,
  });

  return <td className={_className}>{children}</td>;
}

export function Tr({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const _className = classNames({
    "odd:bg-base-100 even:bg-base-200": true,
    [className || ""]: true,
  });

  return <tr className={_className}>{children}</tr>;
}
