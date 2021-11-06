import React from "react";
import { useForm, formProvider } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export default function Form() {
  const methods = useForm();
  return (
    <form className="lg:row-start-1 lg:col-start-1">
      <div className="max-w-lg mx-auto lg:max-w-none">
        <section aria-labelledby="contact-info-heading">
          <h2
            id="contact-info-heading"
            className="text-lg font-medium text-gray-900"
          >
            Contact information
          </h2>

          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                placeholder="you@example.com"
                defaultValue=""
                aria-invalid="true"
                aria-describedby="email-error"
              />
              {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div> */}
            </div>
            {/* <p className="mt-2 text-sm text-red-600" id="email-error">
              Your password must be less than 4 characters.
            </p> */}
          </div>
        </section>

        <section aria-labelledby="payment-heading" className="mt-10">
          <h2
            id="payment-heading"
            className="text-lg font-medium text-gray-900"
          >
            Payment details
          </h2>

          <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
            <div className="col-span-3 sm:col-span-4">
              <label
                htmlFor="name-on-card"
                className="block text-sm font-medium text-gray-700"
              >
                Name on card
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name-on-card"
                  name="name-on-card"
                  autoComplete="cc-name"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-3 sm:col-span-4">
              <label
                htmlFor="card-number"
                className="block text-sm font-medium text-gray-700"
              >
                Card number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  autoComplete="cc-number"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-3">
              <label
                htmlFor="expiration-date"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration date (MM/YY)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="expiration-date"
                  id="expiration-date"
                  autoComplete="cc-exp"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-gray-700"
              >
                CVC
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  autoComplete="csc"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="shipping-heading" className="mt-10">
          <h2
            id="shipping-heading"
            className="text-lg font-medium text-gray-900"
          >
            Shipping address
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="apartment"
                className="block text-sm font-medium text-gray-700"
              >
                Apartment, suite, etc.
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700"
              >
                Province
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="province"
                  name="province"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700"
              >
                Postal code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="postal-code"
                  name="postal-code"
                  autoComplete="postal-code"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="billing-heading" className="mt-10">
          <h2
            id="billing-heading"
            className="text-lg font-medium text-gray-900"
          >
            Billing information
          </h2>

          <div className="mt-6 flex items-center">
            <input
              id="same-as-shipping"
              name="same-as-shipping"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <div className="ml-2">
              <label
                htmlFor="same-as-shipping"
                className="text-sm font-medium text-gray-900"
              >
                Same as shipping information
              </label>
            </div>
          </div>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
          <button
            type="submit"
            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:ml-6 sm:order-last sm:w-auto"
          >
            Continue
          </button>
          <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
            You won't be charged until the next step.
          </p>
        </div>
      </div>
    </form>
  );
}
