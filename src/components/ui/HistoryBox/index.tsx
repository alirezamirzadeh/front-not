import { useEffect } from 'react';
import { useHistoryStore } from '@/store/historyStore';
import { useProductsStore } from '@/store/productsStore';

import { HistoryList } from '@/components/ui/HistoryList';
import { HistorySkeleton } from '@/components/ui/HistorySkeleton';
import { EmptyHistory } from '@/components/ui/EmptyHistory';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useShallow } from 'zustand/react/shallow';

export default function HistoryBox() {

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


    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchHistory(), fetchProducts()]);
        };
        if (history.length === 0 || products.length === 0) {
            fetchData();
        }
    }, []);



    console.log('HistoryBox');

    return (
        <div className="flex-1 overflow-y-auto">
            {hLoading || pLoading ? (
                <HistorySkeleton />
            ) : hError || pError ? (
                <ErrorMessage message={hError || pError || ""} />
            ) : history.length === 0 ? (
                <EmptyHistory />
            ) : (
                <HistoryList history={history} products={products} />
            )}
        </div>
    );
}
