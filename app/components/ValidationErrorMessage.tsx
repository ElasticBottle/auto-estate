import { AnimatePresence, m } from "framer-motion";
import React from "react";
import { transition } from "~/constants/animation";

export default function ValidationErrorMessage({ error }: { error: string }) {
  const [show, setShow] = React.useState(!!error);

  React.useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError);
    });
    return () => clearTimeout(id);
  }, [error]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "1rem" }}
          exit={{ opacity: 0, height: 0 }}
          transition={transition}
          className=" text-rose-800"
        >
          {error}
        </m.div>
      )}
    </AnimatePresence>
  );
}
