import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function Cart({
  open,
  setOpen,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
}) {
  const decreaseQuantityHandler = (e, id, quantity) => {
    e.preventDefault();
    const newQuantity = quantity - 1;
    onUpdateQuantity(id, newQuantity);
  };

  const increaseQuantityHandler = (e, id, quantity) => {
    e.preventDefault();
    const newQuantity = quantity + 1;
    onUpdateQuantity(id, newQuantity);
  };

  const EmptyCart = () => <h1>Cart is empty!</h1>;
  const FilledCart = () => (
    <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
      {cart.line_items.map((item) => (
        <li key={item.id} className="flex py-6">
          <div className="flex-shrink-0">
            <img
              src={item.image.url}
              alt={item.name}
              className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
            />
          </div>

          <div className="ml-4 flex-1 flex flex-col sm:ml-6">
            <div>
              <div className="flex justify-between">
                <h4 className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-gray-700 hover:text-gray-800"
                  >
                    {item.name}
                  </a>
                </h4>
                <p className="ml-4 text-sm font-medium text-gray-900">
                  {item.line_total.formatted_with_symbol}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {item.price.formatted_with_symbol}
              </p>
            </div>

            <div className="mt-4 flex-1 flex items-end justify-between">
              <div className="flex items-center text-sm text-gray-700 space-x-3 border rounded-md p-2">
                <button
                  onClick={(e) =>
                    decreaseQuantityHandler(e, item.id, item.quantity)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span>
                  <p className="text-sm font-medium text-gray-900">
                    {item.quantity}
                  </p>
                </span>
                <button
                  onClick={(e) =>
                    increaseQuantityHandler(e, item.id, item.quantity)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="ml-4">
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  if (!cart.line_items) {
    return <></>;
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {!cart.line_items.length ? (
                          <EmptyCart />
                        ) : (
                          <FilledCart />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <section
                      aria-labelledby="summary-heading"
                      className="mt-10"
                    >
                      <h2 id="summary-heading" className="sr-only">
                        Order summary
                      </h2>

                      <div>
                        <dl className="space-y-4">
                          <div className="flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900">
                              Subtotal
                            </dt>
                            <dd className="ml-4 text-base font-medium text-gray-900">
                              {cart.subtotal.formatted_with_symbol}
                            </dd>
                          </div>
                        </dl>
                        <p className="mt-1 text-sm text-gray-500">
                          Shipping and taxes will be calculated at checkout.
                        </p>
                      </div>

                      <div className="mt-10">
                        <Link to="/checkout">
                          <button
                            disabled={!cart.line_items.length}
                            type="submit"
                            className="w-full bg-dark border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 disabled:opacity-50"
                            onClick={() => setOpen(false)}
                          >
                            Checkout
                          </button>
                        </Link>
                      </div>

                      <div className="mt-6 text-sm text-center">
                        <p>
                          or{" "}
                          <a
                            href="#"
                            className="text-indigo-600 font-medium hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </a>
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
