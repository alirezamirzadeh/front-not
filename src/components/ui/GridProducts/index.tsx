import { ProductCard } from "@/components/ui/ProductCard";
import { useProductsStore } from "@/store/productsStore";
import SkeletonProducts from "@/components/ui/SkeletonProducts";
import NotFoundProducts from "@/components/ui/NotFoundProducts";
import { useShallow } from 'zustand/react/shallow';
import type { Product } from "@/types/Product";

export default function GridProducts({ onCardClick  }: { onCardClick: (product: Product) => void,    selectedProductId: number | null | undefined;
}) {
    const { loading, error, getFilteredProducts } = useProductsStore(
        useShallow((s) => ({
            loading: s.loading,
            error: s.error,
            getFilteredProducts: s.getFilteredProducts,
        }))
    );

    const filteredProducts = getFilteredProducts();

    if (loading) return <SkeletonProducts />;
    if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    if (filteredProducts.length === 0) return <NotFoundProducts />;

    return (
        <div className="grid grid-cols-2   gap-x-3 gap-y-7 px-4 pb-20 ">
            {filteredProducts.map((product) => (
                
                <ProductCard 
                    key={product.id}
                    product={product}
                    
                    onClick={() => onCardClick(product)}

                />
            ))}
        </div>
    );
}