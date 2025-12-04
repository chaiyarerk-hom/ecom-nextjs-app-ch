"use client";

import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const {items} = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    
    useEffect (() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false)
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    
    return (
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/">
                    Biot Ecommerce
                </Link>
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-violet-400">Home</Link>
                    <Link href="/products" className="hover:text-violet-400">Products</Link>
                    <Link href="/checkout" className="hover:text-violet-400">Checkout</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/checkout" className="relative inline-block">
                        <ShoppingCartIcon />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-[10px] text-white rounded-full flex flex-col items-center justify-center shadow-xl">{cartCount}</span>
                            )}
                    </Link>
                    <Button variant="ghost" className="md:hidden" onClick={() => setMobileOpen((prev) => (!prev))}>
                        {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6"/>}
                    </Button>
                </div>
            </div>
            {mobileOpen && (
                    <nav className="md:hidden bg-white shadow-md">
                        <ul className="flex flex-col p-4 space-y-2">
                            <li>
                                <Link href="/" className="block hover:text-violet-400">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="block hover:text-violet-400">Products</Link>
                            </li>
                            <li>
                                <Link href="/checkout" className="block hover:text-violet-400">Checkout</Link>
                            </li>
                        </ul>
                    </nav>
                )}
        </nav>
    )
};