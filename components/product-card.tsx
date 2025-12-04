import Link from "next/link";
import Stripe from "stripe"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
    product: Stripe.Product;
}

export const ProductCard = ({product}: Props) => {
    const price = product.default_price as Stripe.Price;
    return (
        <div>
            <Link href={`/products/${product.id}`}>
                <Card>
                    {product.images && product.images[0] && (
                    <div className="relative h-80 w-full">
                        <Image
                        alt={product.name}
                        src={product.images[0]}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-opacity duration-500 ease-in-out"
                        />
                    </div>
                    )}

                    <CardHeader>
                        <CardTitle>
                        {product.name}
                        </CardTitle>
                        <CardContent className="flex flex-col mt-2 text-sm text-neutral-500">
                        {product.description}
                        {price && price.unit_amount && <p className="text-xl mt-2 mb-2 text-neutral-800">THB {price.unit_amount / 100}</p>}
                        <Button>View Details</Button>
                        </CardContent>
                    </CardHeader>
                </Card>
            </Link>
        </div>
    )
}