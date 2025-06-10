import { useEffect, useState } from 'react';
import { useHistoryStore } from '@/store/historyStore';
import { useProductsStore } from '@/store/productsStore';
import { useShallow } from 'zustand/react/shallow';

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
    
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (history.length === 0 || products.length === 0) {
                await Promise.all([fetchHistory(), fetchProducts()]);
            }
        };
        fetchData();
    }, [fetchHistory, fetchProducts, history.length, products.length]);

    useEffect(() => {
        if (hLoading || pLoading) {
            setStatus('loading');
        } else if (hError || pError) {
            setStatus('error');
            setErrorMessage(hError || pError);
        } else {
            setStatus('success');
            setErrorMessage(null);
        }
    }, [hLoading, pLoading, hError, pError]);

    return { status, errorMessage, history, products };
};