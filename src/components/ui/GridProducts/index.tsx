import { useMemo } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useProductsStore } from "@/store/productsStore";
import SkeletonProducts from "@/components/ui/SkeletonProducts";
import NotFoundProducts from "@/components/ui/NotFoundProducts";
import { useShallow } from 'zustand/react/shallow';
import type { Product } from "@/types/Product";

export default function GridProducts() {
    const { loading, error, products, filters } = useProductsStore(
        useShallow((s) => ({
            loading: s.loading,
            error: s.error,
            products: s.products,
            filters: s.filters,
        }))
    );

    const filteredProducts = useMemo(() => {
        const searchTextLower = filters.searchText.toLowerCase();
        const hasCategories = filters.categories.length > 0;
        const [minPrice, maxPrice] = filters.priceRange;

        return products.filter((item: Product) => {
            if (searchTextLower && !item.name.toLowerCase().includes(searchTextLower)) return false;
            if (hasCategories && !filters.categories.includes(item.category)) return false;
            if (item.price < minPrice || item.price > maxPrice) return false;
            return true;
        });
    }, [products, filters]);

    if (loading) return <SkeletonProducts />;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    if (filteredProducts.length === 0) return <NotFoundProducts />;

    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 px-4 pb-40">
                {filteredProducts.map((product, index) => (
 
                        <ProductCard 
                        key={product.id}
                            product={product}
                            positionInGrid={index % 2 === 0 ? 'left' : 'right'}
                        />
                ))}
        </div>
    );
}