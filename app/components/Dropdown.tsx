import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { HiOutlineSelector } from "react-icons/hi";
import ValidationErrorMessage from "./ValidationErrorMessage";

export function Dropdown({
  name,
  label,
  items,
  error,
  initialOption = "Select an option",
}: {
  name: string;
  label?: string;
  initialOption?: string;
  error?: string;
  items?: readonly string[];
}) {
  const [selected, setSelected] = useState(initialOption);

  return (
    <div>
      <Listbox name={name} value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Listbox.Label className={"text-sm text-gray-600"}>
            {label}
          </Listbox.Label>
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-transparent border-b-2 rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-900 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiOutlineSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items?.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-rose-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <ValidationErrorMessage error={error || ""} />
    </div>
  );
}
