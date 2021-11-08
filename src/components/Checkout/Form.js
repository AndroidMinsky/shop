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
            <div class="relative">
              <input
                id="email"
                name="email"
                type="email"
                className="peer h-10 w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent focus:outline-none"
                placeholder="."
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Email address
              </label>
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

        <section aria-labelledby="shipping-heading" className="mt-10">
          <h2
            id="shipping-heading"
            className="text-lg font-medium text-gray-900"
          >
            Shipping address
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div className="sm:col-span-3 relative">
              <input
                id="name"
                name="name"
                type="text"
                className="peer h-10 w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-none"
                placeholder="."
              />
              <label
                htmlFor="name"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Full Name
              </label>
            </div>

            <div className="sm:col-span-3 relative">
              <input
                id="address"
                name="address"
                type="text"
                className="peer h-10 w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white"
                placeholder="."
              />
              <label
                for="address"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Address
              </label>
            </div>

            <div className="sm:col-span-3 relative">
              <input
                id="city"
                name="city"
                type="text"
                className="peer h-10 w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white"
                placeholder="."
              />
              <label
                htmlFor="city"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                City
              </label>
            </div>

            <div className="relative">
              <input
                id="country"
                name="country"
                type="text"
                className="pointer-events-none peer h-10 w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white"
                placeholder="."
                value="Ireland"
              />
              <label
                htmlFor="country"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Country
              </label>
            </div>

            <div className="relative">
              <input
                id="county"
                name="county"
                type="text"
                className="peer h-10 w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white"
                placeholder="."
              />
              <label
                htmlFor="county"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                County
              </label>
            </div>

            <div className="relative">
              <input
                id="postal"
                name="postal"
                type="text"
                className="peer h-10 w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white"
                placeholder="."
              />
              <label
                htmlFor="postal"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Postal Code
              </label>
            </div>
          </div>
        </section>

        <section aria-labelledby="payment-heading" className="mt-10">
          <h2
            id="payment-heading"
            className="text-lg font-medium text-gray-900"
          >
            Payment details
          </h2>

          <div className="mt-6">
            <div className="flex -space-x-px">
              <div class="relative w-5/6 flex-1 -space-x-px">
                <input
                  id="card"
                  name="card"
                  type="text"
                  className="peer h-10 w-full rounded-l-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent focus:outline-none "
                  placeholder="."
                />
                <label
                  htmlFor="card"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  Card Number
                </label>
              </div>

              <div class="relative w-1/6 inline-block -space-x-px">
                <input
                  id="expiry"
                  name="expiry"
                  type="text"
                  className="peer h-10 w-full border-gray-300 shadow-sm text-gray-900 placeholder-transparent focus:outline-none"
                  placeholder="."
                />
                <label
                  htmlFor="expiry"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  MM / YY
                </label>
              </div>

              <div class="relative w-1/6 inline-block text-xl">
                <input
                  id="cvc"
                  name="cvc"
                  type="text"
                  className="peer h-10 w-full rounded-r-md border-gray-300 shadow-sm text-gray-900 placeholder-transparent focus:outline-none"
                  placeholder="."
                />
                <label
                  htmlFor="cvc"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  CVC
                </label>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-dark hover:bg-pink text-white font-bold py-2 px-4 rounded text-xl mr-2"
          >
            Submit Order
          </button>
          {/* <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
            You won't be charged until the next step.
          </p> */}
        </div>
      </div>
    </form>
  );
}
