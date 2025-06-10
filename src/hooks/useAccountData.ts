import { useHistoryStore } from '@/store/historyStore';
import { useProductsStore } from '@/store/productsStore';
import { useShallow } from 'zustand/react/shallow';

/**
 * A custom hook to aggregate data and states from multiple Zustand stores
 * for the Account page. It simplifies data access in the component.
 */
export const useAccountData = () => {
    const { history, hLoading, hError, fetchHistory } = useHistoryStore(
        useShallow((s) => ({
            history: s.history,
            hLoading: s.loading,
            hError: s.error,
            fetchHistory: s.fetchHistory,
        }))
    );

    const { products, pLoading, pError, fetchProducts } = useProductsStore(
        useShallow((s) => ({
            products: s.products,
            pLoading: s.loading,
            pError: s.error,
            fetchProducts: s.fetchProducts,
        }))
    );
    
    return {
        history,
        products,
        isLoading: hLoading || pLoading,
        error: hError || pError,
        fetchHistory,
        fetchProducts,
    };
};