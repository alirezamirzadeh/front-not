import { AnimatePresence } from "motion/react";
import { useCartStore } from "@/store/cartStore";
import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "../ProductCard";
import { useProductsStore } from "@/store/productsStore";
import SkeletonProducts from "@/components/ui/SkeletonProducts";
import NotFoundProducts from "@/components/ui/NotFoundProducts";
import { useShallow } from 'zustand/react/shallow';

export default function GridProducts() {
    const { items: cartItems } = useCartStore();
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const handleImageLoad = (productId: number) => {
        setLoadedImages(prev => ({ ...prev, [productId]: true }));
    };

    const cartItemIds = useMemo(() =>
        new Set(cartItems.map(item => item.id)),
        [cartItems]
    );


    const {
        loading,
        error,
        getFilteredProducts, fetchProducts } = useProductsStore(
            useShallow((s) => ({
                loading: s.loading,
                error: s.error,
                fetchProducts: s.fetchProducts,
                getFilteredProducts: s.getFilteredProducts,

            }))
        );
    const filteredProducts = getFilteredProducts();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log("GridProducts");
    

    return (
        <>

            {loading && <SkeletonProducts />}

            {error && (
                <div className="p-4 text-center  text-red-500">Error: {error}</div>
            )}

            {!loading && !error && (
                filteredProducts.length <= 0 ?
                    <NotFoundProducts />
                    :
                    <div className="grid   grid-cols-2 gap-4 px-4 pb-40" style={{ viewTransitionName: 'product-grid' }}>
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
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
            )}</>
    );
}
