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