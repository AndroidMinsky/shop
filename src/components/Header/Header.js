import { Link, useLocation } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";

import "./Header.css";

export default function Header({ totalItems, openCart }) {
  const location = useLocation();

  return (
    <>
      <div className="min-h-full">
        <div className="header-background pb-32">
          <nav className="header-background">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
              <div className="relative h-24 flex justify-between content-center">
                <div></div>
                <div className="items-middle justify-center self-center">
                  <img
                    className="absolute h-20 m-auto w-auto"
                    src={`${process.env.PUBLIC_URL}/logo.png`}
                    alt="Logo"
                  />
                </div>

                {/* Cart */}
                <div className="flow-root lg:ml-1 flex self-end">
                  <div
                    className="p-2 flex items-center cursor-pointer"
                    onClick={() => openCart(true)}
                  >
                    <BiShoppingBag
                      className="flex-shrink-0 h-7 w-7 text-black group-hover:text-gray-300"
                      aria-hidden="true"
                    />
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xl font-bold leading-none text-white bg-pink-dark rounded">
                      {totalItems ? totalItems : 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <header className="pb-6 pt-2">
            {location.pathname === "/" ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button className="bg-dark hover:bg-pink-light text-white font-bold py-2 px-4 rounded text-xl mr-2">
                  All Products
                </button>
                <button
                  disabled={true}
                  className="bg-dark hover:bg-light text-white font-bold py-2 px-4 rounded text-xl mr-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-dark"
                >
                  Skincare
                </button>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                  to="/"
                  className="bg-dark hover:bg-pink text-white font-bold py-2 px-4 rounded text-xl mr-2"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            )}
          </header>
        </div>
      </div>
    </>
  );
}
