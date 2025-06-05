import { useEffect, useState } from "react";
import SearchOverlay from "@/components/ui/Search";
import { useProductsStore } from "@/store/productsStore";
import Header from "@/components/layout/Header";
import SkeletonProducts from "@/components/ui/SkeletonProducts";
import NotFoundProducts from "@/components/ui/NotFoundProducts";
import GridProducts from "@/components/ui/GridProducts";
import type { Product } from "@/types/Product";
import { motion } from 'framer-motion';

export default function HomePage() {
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState("");

    const { products, loading, error, fetchProducts } = useProductsStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts: Product[] = products.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}

            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
        >

            <SearchOverlay
                isOpen={isSearching}
                onClose={() => {
                    setIsSearching(false);
                    setSearchText("");
                }}
                onChange={setSearchText}
                value={searchText}
            />

            <motion.div
                initial={{ y: -10,opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}

                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            <Header setIsSearching={setIsSearching} />
        </motion.div>

            { loading && <SkeletonProducts /> }

    {
        error && (
            <div className="p-4 text-center text-red-500">Error: {error}</div>
        )
    }

    {
        !loading && !error && (
            filteredProducts.length <= 0 ?
                <NotFoundProducts />
                :
                <GridProducts products={filteredProducts} />

        )
    }
        </motion.div >
    );
}
