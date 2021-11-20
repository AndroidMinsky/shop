import React from "react";

export default function Confirmation() {
  return (
    <div className="lg:col-start-2">
      <h1 className="text-sm font-medium text-indigo-600">
        Payment successful
      </h1>
      <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Thanks for ordering
      </p>
      <p className="mt-2 text-base text-gray-500">
        We appreciate your order, we’re currently processing it. So hang tight
        and we’ll send you confirmation very soon!
      </p>

      <dl className="mt-16 text-sm font-medium">
        <dt className="text-gray-900">Tracking number</dt>
        <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
      </dl>

      <div className="mt-16 border-t border-gray-200 py-6 text-right">
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Continue Shopping<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
