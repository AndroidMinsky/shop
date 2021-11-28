import React from "react";
import { Helmet } from "react-helmet";

export default function Confirmation({ order }) {
  console.log(order);
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
                <div className="p-6 flex lg:p-0 lg:my-24">
                  <div className="lg:col-start-1 lg:w-2/3 m-auto">
                    <h1 className="text-l font-medium text-dark">
                      Payment successful
                    </h1>
                    <div className="mt-6 xs:text-left text-center">
                      <p className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl inline-block align-middle ">
                        Thanks for ordering
                      </p>{" "}
                      <img
                        className="ml-3 h-10 inline-block xs:mt-0 mt-4"
                        src={`${process.env.PUBLIC_URL}/croi-white.png`}
                        alt="Logo"
                      />
                    </div>
                    <p className="mt-6 text-base text-gray-500">
                      We appreciate your order, we’re currently processing it.
                      So hang tight and we’ll send you confirmation very soon!
                    </p>
                    <dl className="py-6 text-sm font-medium">
                      <dt className="text-gray-900">Order reference</dt>
                      <dd className="mt-2 text-dark text-lg">
                        {order.customer_reference}
                      </dd>
                    </dl>
                    <dl className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 text-sm text-gray-600 border-t border-gray-200 py-6">
                      <div>
                        <dt className="font-medium text-gray-900">
                          Shipping Address
                        </dt>
                        <dd className="mt-2">
                          <address className="not-italic">
                            <span className="block">{order.shipping.name}</span>
                            <span className="block">
                              {order.shipping.street}
                            </span>
                            <span className="block">
                              {order.shipping.town_city},{" "}
                              {order.shipping.county_state}{" "}
                              {order.shipping.postal_zip_code}
                            </span>
                            <span className="block">Ireland</span>
                          </address>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900 xs:mt-0 mt-6">
                          Payment Information
                        </dt>
                        <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                          <div className="flex-none">
                            <svg
                              aria-hidden="true"
                              width={36}
                              height={24}
                              viewBox="0 0 36 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-auto"
                            >
                              <rect
                                width={36}
                                height={24}
                                rx={4}
                                fill="#606155"
                              />
                              <path
                                d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                                fill="#fff"
                              />
                            </svg>
                            <p className="sr-only">Visa</p>
                          </div>
                          <div className="flex-auto">
                            <p className="text-gray-900">Ending with 4242</p>
                          </div>
                        </dd>
                      </div>
                    </dl>
                    <div className="border-t border-gray-200 pt-6 text-left text-gray-500">
                      If you have any questions or concerns, please{" "}
                      <span>
                        <a
                          href="/"
                          className="text-l font-medium text-dark hover:text-light"
                        >
                          contact us.
                        </a>
                      </span>
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
                <div className="p-6">
                  <div className="max-w-lg mx-auto lg:max-w-none">
                    <h2
                      id="summary-heading"
                      className="text-lg font-medium text-gray-900"
                    >
                      Order summary
                    </h2>

                    <ul className="text-sm font-medium text-gray-900 divide-y divide-gray-200">
                      {order.order.line_items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-start py-6 space-x-4"
                        >
                          <img
                            src={item.image.url}
                            alt={item.product_name}
                            className="flex-none w-20 h-20 rounded-md object-center object-cover"
                          />
                          <div className="flex-auto space-y-1">
                            <h3>{item.product_name}</h3>
                            <div className="mt-6 flex-1 flex items-end">
                              <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                                <div className="flex">
                                  <dt className="font-medium text-gray-500">
                                    Qty
                                  </dt>
                                  <dd className="ml-2 text-gray-500">
                                    {item.quantity}
                                  </dd>
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
                        <dd>{order.order.subtotal.formatted_with_symbol}</dd>
                      </div>

                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Shipping</dt>
                        <dd>
                          {order.order.shipping.price.formatted_with_symbol}
                        </dd>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base">Total</dt>
                        <dd className="text-base">
                          {order.order.total_paid.formatted_with_symbol}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
