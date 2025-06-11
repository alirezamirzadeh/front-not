import { useState, useEffect } from "react";
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import GridProducts from "@/components/ui/GridProducts";
import Header from '@/components/layout/Header';
import { useProductsStore } from "@/store/productsStore";
import { useShallow } from "zustand/react/shallow";
import type { Product } from "@/types/Product";
import ProductPage from "../ProductPage";

export default function HomePage() {
    const { fetchProducts, products } = useProductsStore(useShallow((s) => ({
        fetchProducts: s.fetchProducts,
        products: s.products
    })));
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (products.length === 0) fetchProducts();
    }, [fetchProducts, products.length]);

    return (
        <LayoutGroup>
            <motion.div
                animate={{ scale: selectedProduct ? 0.92 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <Header />
                <GridProducts
                    onCardClick={setSelectedProduct}
                    selectedProductId={selectedProduct?.id}
                />
            </motion.div>

            <AnimatePresence>
               
                {selectedProduct && (
                    <ProductPage
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
}