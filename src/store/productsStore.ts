import { fetchGet } from "@/services/apiService";
import type { ProductsState, Product } from "@/types/Product";
import { create } from "zustand";

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchGet<{ data: Product[] }>("items.json");

      if (res.success && res.data?.data) {
        set({ products: res.data.data, loading: false });
      } else {
        throw new Error(res.error || 'Failed to fetch products');
      }
    } catch (err: unknown) {
      console.error("[ProductsStore] fetchItems error:", err);
      set({ error: err instanceof Error ? err.message : "Unknown error", loading: false });
    }
  },
}));
