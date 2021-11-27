import React from "react";
import { Helmet } from "react-helmet";

export default function Confirmation() {
  return (
    <main className="-mt-32 pb-8 flex-grow">
      <Helmet>
        <title>Confirmation</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  <div className="lg:col-start-2">
                    <h1 className="text-sm font-medium text-indigo-600">
                      Payment successful
                    </h1>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                      Thanks for ordering
                    </p>
                    <p className="mt-2 text-base text-gray-500">
                      We appreciate your order, we’re currently processing it.
                      So hang tight and we’ll send you confirmation very soon!
                    </p>

                    <dl className="mt-16 text-sm font-medium">
                      <dt className="text-gray-900">Tracking number</dt>
                      <dd className="mt-2 text-indigo-600">
                        51547878755545848512
                      </dd>
                    </dl>

                    <div className="mt-16 border-t border-gray-200 py-6 text-right">
                      <a
                        href="/"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4 sticky top-0">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">Summary Here</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
