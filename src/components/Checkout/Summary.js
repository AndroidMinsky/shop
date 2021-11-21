import React from "react";

export default function Summary({ liveObject }) {
  return (
    <div className="max-w-lg mx-auto lg:max-w-none">
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <ul className="text-sm font-medium text-gray-900 divide-y divide-gray-200">
        {liveObject.line_items.map((item) => (
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

      <dl className=" text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Subtotal</dt>
          <dd>{liveObject.subtotal.formatted_with_symbol}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Shipping</dt>
          <dd>{liveObject.shipping.price.formatted_with_symbol}</dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt className="text-base">Total</dt>
          <dd className="text-base">
            {liveObject.total_due.formatted_with_symbol}
          </dd>
        </div>
      </dl>
    </div>
  );
}
