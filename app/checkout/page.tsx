"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
    const { items, addItem, removeItem, clearCart } = useCartStore();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    if (total === 0 || items.length === 0) {
        return <div>Your Cart is Empty.</div>
    }
    
    return (
    <div>
        <h1>Checkout</h1>
        <Card>
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {items.map((item, key) => (
                        <li key="key" className="flex flex-col gap-2 border-b pb-2">
                            <div className="flex justify-between">
                                <span className="font-medium">{item.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold mr-4">{(item.price * item.quantity) / 100} THB</span>
                                    <Button variant="outline" className="font-bold" onClick={() => removeItem(item.id)}>-</Button>
                                    <span className="ml-4 mr-4 font-bold">{item.quantity}</span>
                                    <Button variant="outline" size="sm" className="font-bold text-white bg-black" onClick={() => addItem({...item, quantity: 1})}>+</Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 border-t pt-2 text-lg font-semibold">
                    Total: {(total / 100)} THB
                </div>
                <form action={checkoutAction} className="max-w-md mx-auto">
                    <input type="hidden" name="items" value={JSON.stringify(items)} />
                    <Button variant="default" type="submit" className="w-full">
                        Proceed to Payment
                    </Button>
                </form>
                <Button variant="default" onClick={() => clearCart()} className="mt-4 flex flex-col max-w-md mx-auto w-full">
                        Clear Cart
                </Button>
            </CardContent>
        </Card>
    </div>
    )
};