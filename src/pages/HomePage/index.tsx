// src/pages/HomePage.tsx

import { useEffect } from "react";
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useProductsStore } from "@/store/productsStore";
import { useShallow } from "zustand/react/shallow";
import Header from "@/components/layout/Header";
import GridProducts from "@/components/ui/GridProducts";
import ProductPage from "../ProductPage";
import FooterButton from "@/components/ui/FooterButton";

export default function HomePage() {
    const {
        products,
        fetchProducts,
        productToShowById,
        setProductToShowById,
        setSelectedProduct,
        selectedProduct
    } = useProductsStore(useShallow((s) => ({
        products: s.products,
        fetchProducts: s.fetchProducts,
        productToShowById: s.productToShowById,
        setProductToShowById: s.setProductToShowById,
        setSelectedProduct: s.setSelectedProduct,
        selectedProduct: s.selectedProduct
    })));


    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    useEffect(() => {
        if (productToShowById && products.length > 0) {
            const productFromUrl = products.find(p => p.id === productToShowById);
            if (productFromUrl) {
                setSelectedProduct(productFromUrl);
                setProductToShowById(null);
            }
        }
    }, [productToShowById, products, setProductToShowById]);


    return (
        <LayoutGroup>
            <Header />

            <motion.div
                animate={{ scale: selectedProduct ? 0.92 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
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
            <FooterButton />
        </LayoutGroup>
    );
}