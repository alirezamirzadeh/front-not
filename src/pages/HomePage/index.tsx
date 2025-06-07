import { lazy, useEffect, useState, Suspense } from "react";
import { useProductsStore } from "@/store/productsStore";
import SkeletonProducts from "@/components/ui/SkeletonProducts";
import NotFoundProducts from "@/components/ui/NotFoundProducts";
import GridProducts from "@/components/ui/GridProducts";
import { motion } from 'framer-motion';

const SearchOverlay = lazy(() => import('@/components/ui/Search'));
const Header = lazy(() => import('@/components/layout/Header'));

export default function HomePage() {
    const [isSearching, setIsSearching] = useState(false);
    const { loading, error, fetchProducts, getFilteredProducts, setSearchText, filters } = useProductsStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = getFilteredProducts();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
        >
            <Suspense fallback={null}>
                <SearchOverlay
                    isOpen={isSearching}
                    onClose={() => {
                        setIsSearching(false);
                        setSearchText("");
                    }}
                    onChange={setSearchText}
                    value={filters.searchText}
                />
            </Suspense>

            <Suspense fallback={null}>
                <Header setIsSearching={setIsSearching} />
            </Suspense>

            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {loading && <SkeletonProducts />}

                {error && (
                    <div className="p-4 text-center text-red-500">Error: {error}</div>
                )}

                {!loading && !error && (
                    filteredProducts.length <= 0 ?
                        <NotFoundProducts />
                        :
                        <GridProducts products={filteredProducts} />
                )}
            </motion.div>
        </motion.div>
    );
}
