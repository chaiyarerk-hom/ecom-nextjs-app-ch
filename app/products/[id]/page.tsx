import { ProductDetail } from "@/components/product-detail"
import { stripe } from "@/lib/stripe"

export default async function ProductPage({params}: any) {
    
    const { id } = await params;

    if (!id) {
        return <div>Invalid Product ID</div>
    }

    const product = await stripe.products.retrieve(id, {
        expand: ["default_price"],
    });

    const plainProduct = JSON.parse(JSON.stringify(product));
    return <ProductDetail product={plainProduct}/>
}