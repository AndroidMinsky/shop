import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { commerce } from "../../lib/commerce";

export default function Form({
  checkoutToken,
  onCaptureCheckout,
  setLiveObject,
  isProcessing,
  setProcessingTo,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [stripeError, setStripeError] = useState(null);

  const onSubmit = async (data) => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);

    setProcessingTo(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setStripeError(error.message);
      setProcessingTo(false);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { email: data.email },
        shipping: {
          name: data.name,
          street: data.address,
          town_city: data.city,
          county_state: data.county,
          postal_zip_code: data.postal,
          country: data.country,
        },
        fulfillment: { shipping_method: shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
    }
  };

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  const checkShippingOption = async (
    checkoutTokenId,
    shippingOptionId,
    shippingSubdivision = "CO"
  ) => {
    const { live } = await commerce.checkout.checkShippingOption(
      checkoutTokenId,
      {
        shipping_option_id: shippingOptionId,
        country: shippingCountry,
        region: shippingSubdivision,
      }
    );
    setLiveObject(live);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
      fetchShippingOptions(checkoutToken.id, shippingCountry);
    }
  }, [shippingCountry, checkoutToken.id]);

  useEffect(() => {
    if (shippingOption) checkShippingOption(checkoutToken.id, shippingOption);
  }, [checkoutToken, shippingOption]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const counties = Object.entries(shippingSubdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  return (
    <form
      className="lg:row-start-1 lg:col-start-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-w-lg mx-auto lg:max-w-none">
        <section aria-labelledby="contact-info-heading">
          <h2
            id="contact-info-heading"
            className="text-lg font-medium text-gray-900"
          >
            Contact information
          </h2>

          <div className="mt-6">
            <div className="relative">
              <input
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                className={`peer h-10 w-full rounded-md ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } shadow-sm text-gray-900 placeholder-transparent focus:outline-none`}
                placeholder="."
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
              >
                Email address
              </label>
              {errors.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                Email address is required
              </p>
            )}
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
              <div className="relative">
                <input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  className={`peer h-10 w-full rounded-md ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-none`}
                  placeholder="."
                />
                <label
                  htmlFor="name"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  Full Name
                </label>
                {errors.name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Full Name is required
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <div className="relative">
                <input
                  {...register("address", { required: true })}
                  id="address"
                  name="address"
                  type="text"
                  className={`peer h-10 w-full rounded-md ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  } shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white`}
                  placeholder="."
                />
                <label
                  htmlFor="address"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  Address
                </label>
                {errors.address && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.address && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Address is required
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <div className="relative">
                <input
                  {...register("city", { required: true })}
                  id="city"
                  name="city"
                  type="text"
                  className={`peer h-10 w-full rounded-md ${
                    errors.city ? "border-red-300" : "border-gray-300"
                  } shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white`}
                  placeholder="."
                />
                <label
                  htmlFor="city"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  City
                </label>
                {errors.city && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.city && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  City is required
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <select
                  {...register("country", {
                    required: true,
                    value: shippingCountry,
                  })}
                  id="country"
                  name="country"
                  type="text"
                  className={`peer h-10 w-full rounded-md ${
                    errors.county ? "border-red-300" : "border-gray-300"
                  } shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white`}
                  placeholder="."
                  onChange={(e) => setShippingCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.label}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="country"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  Country
                </label>
                {errors.country && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.country && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Country is required
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <select
                  {...register("county", {
                    required: true,
                    value: shippingSubdivision,
                  })}
                  id="county"
                  name="county"
                  type="text"
                  className={`peer h-10 w-full rounded-md ${
                    errors.county ? "border-red-300" : "border-gray-300"
                  } shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white`}
                  placeholder="."
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                >
                  {counties.map((county) => (
                    <option key={county.id} value={county.id}>
                      {county.label}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="county"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  County
                </label>
                {errors.county && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.county && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  County is required
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  {...register("postal", { required: true })}
                  id="postal"
                  name="postal"
                  type="text"
                  className={`peer h-10 w-full rounded-md ${
                    errors.postal ? "border-red-300" : "border-gray-300"
                  } shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white`}
                  placeholder="."
                />
                <label
                  htmlFor="postal"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                >
                  Postal Code
                </label>
                {errors.postal && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.postal && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Postal Code is required
                </p>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="payment-heading" className="mt-10">
          <h2
            id="payment-heading"
            className="text-lg font-medium text-gray-900"
          >
            Shipping method
          </h2>
          <div className="mt-6">
            <div>
              <div className="relative">
                <select
                  {...register("shipping", {
                    required: true,
                    value: shippingOption,
                  })}
                  id="shipping"
                  name="shipping"
                  type="text"
                  className={`peer h-10 w-full rounded-md ${
                    errors.shipping ? "border-red-300" : "border-gray-300"
                  } shadow-sm text-gray-900 placeholder-transparent outline-none focus:outline-white`}
                  placeholder="."
                  onChange={(e) => setShippingOption(e.target.value)}
                >
                  {shippingOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.description} -{" "}
                      {option.price.formatted_with_symbol}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="shipping"
                  className="absolute left-2 -top-2 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text"
                ></label>
                {errors.shipping && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              {errors.shipping && (
                <p className="mt-2 text-sm text-red-600" id="shipping-error">
                  Shipping method is required
                </p>
              )}
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
            <CardElement />
            {stripeError && (
              <div className="flex items-center mt-4">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500 mr-1"
                  aria-hidden="true"
                />
                <p className="text-sm text-red-600" id="shipping-error">
                  {stripeError}
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <button
            disabled={isProcessing}
            type="submit"
            className="w-full bg-dark hover:bg-light text-white font-bold py-2 px-4 rounded text-xl mr-2 disabled:opacity-50 dissabled:cursor-not-allowed dissabled:hover:bg-dark"
          >
            {isProcessing ? "Processing..." : "Submit Order"}
          </button>
        </div>
      </div>
    </form>
  );
}
