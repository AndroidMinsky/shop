import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import Cart from "../Cart/Cart";
import "./Header.css";

export default function Header(props) {
  const location = useLocation();
  const [openCart, setOpenCart] = useState(false);

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
                    onClick={() => setOpenCart(true)}
                  >
                    <BiShoppingBag
                      className="flex-shrink-0 h-7 w-7 text-black group-hover:text-gray-300"
                      aria-hidden="true"
                    />
                    <span class="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xl font-bold leading-none text-white bg-pink-dark rounded">
                      {props.totalItems}
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
                <button class="bg-dark hover:bg-pink text-white font-bold py-2 px-4 rounded text-xl mr-2">
                  All Products
                </button>
                <button class="bg-light hover:bg-pink-dark text-white font-bold py-2 px-4 rounded text-xl mr-2">
                  Skincare
                </button>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                  to="/"
                  class="bg-dark hover:bg-pink text-white font-bold py-2 px-4 rounded text-xl mr-2"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            )}
          </header>
        </div>
      </div>
      <Cart
        open={openCart}
        setOpen={setOpenCart}
        cart={props.cart}
        onUpdateQuantity={props.onUpdateQuantity}
        onRemoveFromCart={props.onRemoveFromCart}
      />
    </>
  );
}
