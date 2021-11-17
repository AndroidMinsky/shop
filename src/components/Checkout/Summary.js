import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function Summary({ summaryData }) {
  return (
    <div className="max-w-lg mx-auto lg:max-w-none">
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <ul className="text-sm font-medium text-gray-900 divide-y divide-gray-200">
        {summaryData.live.line_items.map((item) => (
          <li key={item.id} className="flex items-start py-6 space-x-4">
            <img
              src={item.image.url}
              alt={item.name}
              className="flex-none w-20 h-20 rounded-md object-center object-cover"
            />
            <div className="flex-auto space-y-1">
              <h3>{item.name}</h3>
              <div className="mt-6 flex-1 flex items-end">
                <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-500">Qty</dt>
                    <dd className="ml-2 text-gray-500">{item.quantity}</dd>
                  </div>
                  <div className="flex sm:pl-2">
                    <dd className="ml-2 text-gray-500">
                      {item.price.formatted_with_symbol}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className="flex-none text-base font-medium">
              {item.line_total.formatted_with_symbol}
            </p>
          </li>
        ))}
      </ul>

      <dl className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Subtotal</dt>
          <dd>{summaryData.live.subtotal.formatted_with_symbol}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Shipping</dt>
          <dd>{summaryData.live.shipping.price.formatted_with_symbol}</dd>
        </div>

        {/* <div className="flex items-center justify-between">
          <dt className="text-gray-600">Taxes</dt>
          <dd>$26.80</dd>
        </div> */}

        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt className="text-base">Total</dt>
          <dd className="text-base">
            {summaryData.live.total_due.formatted_with_symbol}
          </dd>
        </div>
      </dl>

      <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
        <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
          <div className="max-w-lg mx-auto">
            <Popover.Button className="w-full flex items-center py-6 font-medium">
              <span className="text-base mr-auto">Total</span>
              <span className="text-base mr-2">
                {summaryData.live.total_due.formatted_with_symbol}
              </span>
              <ChevronUpIcon
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
              />
            </Popover.Button>
          </div>
        </div>

        <Transition.Root as={Fragment}>
          <div>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                <dl className="max-w-lg mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd>{summaryData.live.subtotal.formatted_with_symbol}</dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd>
                      {summaryData.live.shipping.price.formatted_with_symbol}
                    </dd>
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Taxes</dt>
                    <dd>$26.80</dd>
                  </div> */}
                </dl>
              </Popover.Panel>
            </Transition.Child>
          </div>
        </Transition.Root>
      </Popover>
    </div>
  );
}
