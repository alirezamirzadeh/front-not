import { useParams } from "react-router";
import { useCartStore } from "@/store/cartStore";
import { useProductsStore } from "@/store/productsStore";
import { motion } from 'framer-motion';

import { useEffect, useState } from "react";
import NotFoundProducts from "@/components/ui/NotFoundProducts";

import { ProductInfo } from "@/components/ui/ProductInfo";
import { ProductImage } from "@/components/ui/ProductImage";
import { CartControls } from "@/components/ui/CartControls";
import { LoadingSkeletonSingleProduct } from "@/components/ui/LoadingSkeletonSingleProduct";

import useBackButton from "@/hooks/useBackButton";
const preloadComponent = () => {
    import("@/components/ui/ProductImage");
};

export default function ProductPage() {
    const { id } = useParams();
    const products = useProductsStore(state => state.products);
    const loading = useProductsStore(state => state.loading);
    const error = useProductsStore(state => state.error);
    const getSelectedImageIndex = useProductsStore(state => state.getSelectedImageIndex);

    const items = useCartStore(state => state.items);
    const addItem = useCartStore(state => state.addItem);
    const removeItem = useCartStore(state => state.removeItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    const product = products.find(p => p.id.toString() === id);
    const [mainImage, setMainImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        preloadComponent
    }, [])


    useBackButton();

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            const storedIndex = getSelectedImageIndex(product.id);
            setMainImage(product.images[storedIndex]);
        } else {
            setMainImage(undefined);
        }
    }, [product, getSelectedImageIndex]);

    if (loading) {
        return <LoadingSkeletonSingleProduct />;
    }

    if (error || !product) {
        return <div>{error || <NotFoundProducts />}</div>;
    }

    const isInCart = items.some(item => item.id === product.id.toString());
    const cartItem = items.find(item => item.id === product.id.toString());

    const handleCartAction = () => {
        if (!isInCart) {
            addItem({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.images[0],
                category: product.category
            });
        }
    };

    const handleAddCart = () => {
        if (cartItem) {
            updateQuantity(product.id.toString(), cartItem.quantity + 1);
        } else {
            addItem({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.images[0],
                category: product.category
            });
        }
    };

    const handleRemoveCart = () => {
        if (cartItem && cartItem.quantity > 1) {
            updateQuantity(product.id.toString(), cartItem.quantity - 1);
        } else if (cartItem && cartItem.quantity === 1) {
            removeItem(product.id.toString());
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="container   mx-auto h-screen overflow-y-hidden flex flex-col">
                <ProductInfo product={product} />
                <ProductImage
                    id={Number(id)}
                    mainImage={mainImage}
                    product={product}
                    onThumbnailClick={setMainImage}
                />
                <CartControls
                    product={product}
                    isInCart={isInCart}
                    cartItem={cartItem}
                    onAddToCart={handleCartAction}
                    onAddQuantity={handleAddCart}
                    onRemoveQuantity={handleRemoveCart}
                />
            </div>
        </motion.div>
    );
} 