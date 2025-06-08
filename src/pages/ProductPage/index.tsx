import { useParams } from "react-router";
import { useCartStore } from "@/store/cartStore";
import { useProductsStore } from "@/store/productsStore";

import { useEffect, useState } from "react";
import NotFoundProducts from "@/components/ui/NotFoundProducts";

import { ProductInfo } from "@/components/ui/ProductInfo";
import { ProductImage } from "@/components/ui/ProductImage";
import { CartControls } from "@/components/ui/CartControls";
import { LoadingSkeletonSingleProduct } from "@/components/ui/LoadingSkeletonSingleProduct";

import { backButton } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router";

export default function ProductPage() {
    const { id } = useParams();
    const products = useProductsStore(state => state.products);
    const loading = useProductsStore(state => state.loading);
    const error = useProductsStore(state => state.error);

    const items = useCartStore(state => state.items);
    const addItem = useCartStore(state => state.addItem);
    const removeItem = useCartStore(state => state.removeItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    const product = products.find(p => p.id.toString() === id);
    const [mainImage, setMainImage] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        backButton.show();
        const offClick = backButton.onClick(() => {
            navigate("/");
        });

        return () => {
            offClick();
            backButton.hide();
        };
    }, [navigate]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setMainImage(product.images[Number(id) - 1 || 0]);
        } else {
            setMainImage(undefined);
        }
    }, [product]);

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
        <div className="container  pt-[90px] mx-auto h-screen overflow-y-hidden flex flex-col">
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
    );
} 