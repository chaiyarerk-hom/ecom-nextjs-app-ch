"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
    product: Stripe.Product;
}

export const ProductDetail = ({product}: Props) => {
    const {items, addItem, removeItem, clearCart} = useCartStore();
    const price = product.default_price as Stripe.Price;
    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity: 0;
    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount as number,
            imageUrl: product.images ? product.images[0] : null,
            quantity: 1,
        });
    }
    return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:px-24 gap-8 items-center">
        {product.images && product.images[0] && (
            <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
                <Image
                alt={product.name}
                src={product.images[0]}
                fill
                style={{ objectFit: "cover" }}
                className="transition-opacity duration-300 hover:capacity-90"
                />
            </div>
            )}
            <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                {product.description && (<p className="text-gray-700 mb-4">{product.description}</p>)}
            {price && price.unit_amount && <p className="text-xl mt-2 mb-2 text-neutral-800">THB {price.unit_amount / 100}</p>}
            <div className="mt-2">
                <Button variant="outline" className="font-bold" onClick={() => removeItem(product.id)}>-</Button>
                <span className="ml-4 mr-4 font-bold">{quantity}</span>
                <Button variant="outline" className="font-bold text-white bg-black" onClick={onAddItem}>+</Button>
            </div>
            </div>
    </div>
    )
};