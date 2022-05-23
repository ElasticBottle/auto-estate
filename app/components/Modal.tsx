import { Dialog } from "@headlessui/react";
import { AnimatePresence, m } from "framer-motion";
import { fadeUpVariant, fadeVariant, transition } from "~/constants/animation";

export function Modal({
  isOpen,
  onClose,
  title,
  body,
  actionButton,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  actionButton: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          key={"modal"}
          initial={"initial"}
          animate={"animate"}
          exit={"initial"}
          transition={transition}
          as={m.div}
          className="relative z-10"
          static
          open={isOpen}
          onClose={onClose}
        >
          <m.div
            variants={fadeVariant}
            className="fixed inset-0 bg-black bg-opacity-50"
          />

          <m.div
            variants={fadeUpVariant}
            className="fixed inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                {body}

                <div className="flex justify-end w-full mt-4">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  {actionButton}
                </div>
              </Dialog.Panel>
            </div>
          </m.div>
        </Dialog>
      )}{" "}
    </AnimatePresence>
  );
}
