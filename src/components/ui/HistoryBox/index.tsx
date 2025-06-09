import { useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchHistory(), fetchProducts()]);
      } catch (err: unknown) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (history.length === 0 || products.length === 0) {
      fetchData();
    } else {
      setLoading(false); 
    }
  }, [fetchHistory, fetchProducts, history.length, products.length]);

  const currentLoading = hLoading || pLoading || loading;
  const currentError = hError || pError || error;

  console.log('HistoryBox');

  return (
    <div className="flex-1 overflow-y-auto">
      {currentLoading ? (
        <HistorySkeleton />
      ) : currentError ? (
        <ErrorMessage message={currentError} />
      ) : history.length === 0 ? (
        <EmptyHistory />
      ) : (
        <HistoryList history={history} products={products} />
      )}
    </div>
  );
}
