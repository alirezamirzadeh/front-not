import type { Product } from "./Product";

export type CartControlsProps = {
    product: Product;
    isInCart: boolean;
    cartItem: { quantity: number } | undefined;
    onAddToCart: () => void;
    onAddQuantity: () => void;
    onRemoveQuantity: () => void;
}