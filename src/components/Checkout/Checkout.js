import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { commerce } from "../../lib/commerce";
import Form from "./Form";

const products = [
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  // More products...
];

export default function Checkout({ cart }) {
  const [checkoutToken, setCheckoutToken] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  console.log(cart, checkoutToken);

  return (
    <main className="-mt-32 pb-8">
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
                  {checkoutToken && <Form checkoutToken={checkoutToken} />}
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
                      {products.map((product) => (
                        <li
                          key={product.id}
                          className="flex items-start py-6 space-x-4"
                        >
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="flex-none w-20 h-20 rounded-md object-center object-cover"
                          />
                          <div className="flex-auto space-y-1">
                            <h3>{product.name}</h3>
                            <p className="text-gray-500">{product.color}</p>
                            <p className="text-gray-500">{product.size}</p>
                          </div>
                          <p className="flex-none text-base font-medium">
                            {product.price}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <dl className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Subtotal</dt>
                        <dd>$320.00</dd>
                      </div>

                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Shipping</dt>
                        <dd>$15.00</dd>
                      </div>

                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Taxes</dt>
                        <dd>$26.80</dd>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base">Total</dt>
                        <dd className="text-base">$361.80</dd>
                      </div>
                    </dl>

                    <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                      <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
                        <div className="max-w-lg mx-auto">
                          <Popover.Button className="w-full flex items-center py-6 font-medium">
                            <span className="text-base mr-auto">Total</span>
                            <span className="text-base mr-2">$361.80</span>
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
                                  <dd>$320.00</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                  <dt className="text-gray-600">Shipping</dt>
                                  <dd>$15.00</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                  <dt className="text-gray-600">Taxes</dt>
                                  <dd>$26.80</dd>
                                </div>
                              </dl>
                            </Popover.Panel>
                          </Transition.Child>
                        </div>
                      </Transition.Root>
                    </Popover>
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
