"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <div>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="border border-slate-500 rounded-md mt-6 mb-6 p-2 w-1/2 hover:outline-2 hover:outline-violet-400 focus:outline-2 focus:outline-violet-400"
        />
      </div>

      <ul className="md:grid grid-cols-3 gap-4">
        {filteredProduct.map((product, key) => {
          return (
            <li key={key} className="">
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
