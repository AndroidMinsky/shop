import React from "react";
import Product from "./Product/Product";

export default function Products({ products, onAddToCart }) {
  return (
    <section aria-labelledby="products-heading" className="mt-1 pb-1">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
