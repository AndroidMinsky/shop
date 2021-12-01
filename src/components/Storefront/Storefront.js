import React from "react";
import Products from "./Products/Products";
import Skeleton from "./Skeleton";

export default function Storefront({ products, onAddToCart }) {
  return (
    <main className="-mt-32">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          {products.length > 1 ? (
            <Products products={products} onAddToCart={onAddToCart} />
          ) : (
            <Skeleton num={6} />
          )}
        </div>
      </div>
    </main>
  );
}
