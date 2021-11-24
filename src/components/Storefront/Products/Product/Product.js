import React, { useState } from "react";
import ProductModal from "./ProductModal";

export default function Product({ product, onAddToCart }) {
  const [openModal, setOpenModal] = useState(false);

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
                onClick={() => onAddToCart(product.id, 1)}
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
      <ProductModal open={openModal} setOpen={setOpenModal} product={product} />
    </>
  );
}
