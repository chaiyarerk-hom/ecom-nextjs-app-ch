"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
    const {clearCart} = useCartStore();
    useEffect(() => {
        clearCart();
    }, [clearCart])

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl">
                Payment Successful!
            </h1>
            <p className="mt-2">
                Thank you for your purchase. Your order is being processed.
            </p>
            <Link href="/products" className="mt-2 text-sm text-violet-400">
                Continue Shopping
            </Link>
        </div>
    )
}