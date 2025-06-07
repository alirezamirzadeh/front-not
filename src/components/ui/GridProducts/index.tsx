import { AnimatePresence } from "motion/react";
import type { Product } from "@/types/Product";
import { useCartStore } from "@/store/cartStore";
import { useState, useMemo } from "react";
import { ProductCard } from "../ProductCard";

export default function GridProducts({ products }: { products: Product[] }) {
    const { items: cartItems } = useCartStore();
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const handleImageLoad = (productId: number) => {
        setLoadedImages(prev => ({ ...prev, [productId]: true }));
    };

    // Memoize cart items check to prevent unnecessary re-renders
    const cartItemIds = useMemo(() =>
        new Set(cartItems.map(item => item.id)),
        [cartItems]
    );

    return (
        <div className="grid grid-cols-2 gap-4 px-4 mt-1 mb-20">
            <AnimatePresence mode="popLayout">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isInCart={cartItemIds.has(String(product.id))}
                        onImageLoad={handleImageLoad}
                        isImageLoaded={loadedImages[product.id] || false}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
