import { fetchGet } from "@/services/apiService";
import type { ProductsState, Product } from "@/types/Product";
import { create } from "zustand";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  searchText: string;
}

interface ProductsStore extends ProductsState {
  filters: FilterState;
  tempFilters: FilterState;
  isFiltering: boolean;
  setSearchText: (text: string) => void;
  setTempPriceRange: (range: [number, number]) => void;
  toggleTempCategory: (category: string) => void;
  applyFilters: () => Promise<void>;
  resetTempFilters: () => void;
  getFilteredProducts: () => Product[];
  getMaxPrice: () => number;
  fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  isFiltering: false,
  filters: {
    categories: [],
    priceRange: [0, 0],
    searchText: "",
  },
  tempFilters: {
    categories: [],
    priceRange: [0, 0],
    searchText: "",
  },

  getMaxPrice: () => {
    const { products } = get();
    if (products.length === 0) return 0;
    return Math.max(...products.map(product => product.price));
  },

  setSearchText: (text: string) =>
    set((state) => ({
      filters: { ...state.filters, searchText: text },
      tempFilters: { ...state.tempFilters, searchText: text }
    })),

  setTempPriceRange: (range: [number, number]) =>
    set((state) => ({
      tempFilters: { ...state.tempFilters, priceRange: range }
    })),

  toggleTempCategory: (category: string) =>
    set((state) => {
      const currentCategories = state.tempFilters.categories;
      const newCategories = currentCategories.includes(category)
        ? currentCategories.filter(c => c !== category)
        : [...currentCategories, category];

      return {
        tempFilters: { ...state.tempFilters, categories: newCategories }
      };
    }),

  applyFilters: async () => {
    set({ isFiltering: true });
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    set((state) => ({
      filters: { ...state.tempFilters },
      isFiltering: false
    }));
  },

  resetTempFilters: () =>
    set((state) => ({
      tempFilters: { ...state.filters }
    })),

  getFilteredProducts: () => {
    const { products, filters } = get();
    const searchTextLower = filters.searchText.toLowerCase();
    const hasCategories = filters.categories.length > 0;
    const [minPrice, maxPrice] = filters.priceRange;

    return products.filter((item) => {
      // Early return if any condition fails
      if (searchTextLower && !item.name.toLowerCase().includes(searchTextLower)) {
        return false;
      }
      if (hasCategories && !filters.categories.includes(item.category)) {
        return false;
      }
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }
      return true;
    });
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchGet<{ data: Product[] }>("items.json");

      if (res.success && res.data?.data) {
        const products = res.data.data;
        const maxPrice = Math.max(...products.map(product => product.price));
        const initialFilters: FilterState = {
          categories: [],
          priceRange: [0, maxPrice] as [number, number],
          searchText: "",
        };
        set({
          products,
          loading: false,
          filters: initialFilters,
          tempFilters: initialFilters
        });
      } else {
        throw new Error(res.error || 'Failed to fetch products');
      }
    } catch (err: unknown) {
      console.error("[ProductsStore] fetchItems error:", err);
      set({ error: err instanceof Error ? err.message : "Unknown error", loading: false });
    }
  },
}));
