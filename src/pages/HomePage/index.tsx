// src/pages/HomePage.tsx

import { useState, useEffect } from "react";
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useProductsStore } from "@/store/productsStore";
import { useShallow } from "zustand/react/shallow";
import type { Product } from "@/types/Product";
import Header from "@/components/layout/Header";
import GridProducts from "@/components/ui/GridProducts";
import ProductPage from "../ProductPage";
import FooterButton from "@/components/ui/FooterButton";
// ... (بقیه ایمپورت‌ها)

export default function HomePage() {
    // از store هم productToShowById و هم تابع ریست آن را می‌خوانیم
    const { 
        products, 
        fetchProducts, 
        productToShowById, 
        setProductToShowById 
    } = useProductsStore(useShallow((s) => ({
        products: s.products,
        fetchProducts: s.fetchProducts,
        productToShowById: s.productToShowById,
        setProductToShowById: s.setProductToShowById,
    })));
    
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // واکشی اولیه محصولات
    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    // === تغییر اصلی: این useEffect مودال را بر اساس مقدار store باز می‌کند ===
    useEffect(() => {
        if (productToShowById && products.length > 0) {
            const productFromUrl = products.find(p => p.id === productToShowById);
            if (productFromUrl) {
                setSelectedProduct(productFromUrl);
                // بعد از باز کردن مودال، مقدار را در store ریست می‌کنیم
                setProductToShowById(null);
            }
        }
    }, [productToShowById, products, setProductToShowById]);


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
            <FooterButton />
        </LayoutGroup>
    );
}