import React, { useState } from "react";
import ProductModal from "./ProductModal";
import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

export default function Product({ product, onAddToCart }) {
  const [openModal, setOpenModal] = useState(false);

  const successMessage = (productName) => (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            {productName} successfully added to the cart!
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              onClick={() => toast.remove()}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const addToCartHandler = (productId) => {
    onAddToCart(productId, 1);
    toast.custom(successMessage(product.name));
    setOpenModal(false);
  };

  return (
    <>
      <div key={product.id} className="group">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={product.image.url}
            alt={product.name}
            className="transition-all duration-400 ease-in-out filter w-full h-full object-center object-cover group-hover:blur-sm"
          />
          <div className="transition-opacity duration-700 ease-in-out invisible opacity-0 group-hover:visible group-hover:opacity-100 flex justify-center items-center ">
            <div className="flex flex-col">
              <button
                className="bg-dark hover:bg-light text-white font-bold py-2 px-4 rounded text-xl mb-4"
                onClick={() => setOpenModal(true)}
              >
                Product Details
              </button>
              <button
                className="bg-pink-dark hover:bg-pink-light text-white font-bold py-2 px-4 rounded text-xl"
                onClick={() => addToCartHandler(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          {product.price.formatted_with_symbol}
        </p>
      </div>
      <ProductModal
        open={openModal}
        setOpen={setOpenModal}
        product={product}
        addToCart={addToCartHandler}
      />
    </>
  );
}
