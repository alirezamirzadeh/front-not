export type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    currency: string;
    left: number;
    tags: {
        fabric: string;
    };
    images: string[];
};

export type ProductsState = {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}

export type ProductInfoProps = {
    product: Product;
}



export type ProductImageProps ={
    mainImage: string | undefined;
    product: Product;
    onThumbnailClick: (image: string) => void;
    id: number
}


export type ProductCardProps = {
    product: Product;
    onImageLoad: (productId: number) => void;
    isImageLoaded: boolean;
}