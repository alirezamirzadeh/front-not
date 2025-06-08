import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useHistoryStore } from '@/store/historyStore';
import { useProductsStore } from '@/store/productsStore';
import { backButton } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router';
import Profile from '@/components/ui/Profile';
import { HistoryList } from '@/components/ui/HistoryList';
import { HistorySkeleton } from '@/components/ui/HistorySkeleton';
import { LoadingMore } from '@/components/ui/LoadingMore';
import { EmptyHistory } from '@/components/ui/EmptyHistory';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
const ITEMS_PER_PAGE = 10;


export default function AccountPage() {
  const { history, loading: hLoading, error: hError, fetchHistory } = useHistoryStore();
  const { products, loading: pLoading, error: pError, fetchProducts } = useProductsStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
    fetchProducts();
    window.scrollTo(0, 0);
  }, [fetchHistory, fetchProducts]);

  useEffect(() => {
    backButton.show();
    const off = backButton.onClick(() => navigate(-1));
    return () => {
      off();
      backButton.hide();
    };
  }, [navigate]);

  const loading = hLoading || pLoading;
  const error = hError || pError;

  const { visibleCount, isLoadingMore, sentinelRef } = useInfiniteScroll(
    history.length,
    ITEMS_PER_PAGE,
    loading
  );

  return (
    <motion.div
      className="px-4 pb-[83px] w-screen min-h-screen overflow-y-auto flex flex-col"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Profile />

      <h2 className="mt-6 mb-4 text-xl font-semibold">History</h2>

      {loading && visibleCount === ITEMS_PER_PAGE ? (
        <HistorySkeleton />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : history.length === 0 ? (
        <EmptyHistory />
      ) : (
        <HistoryList
          history={history}
          products={products}
          visibleItems={visibleCount}
        />
      )}

      {visibleCount < history.length && history.length !==0 &&(
        <LoadingMore ref={sentinelRef} isLoading={isLoadingMore} />
      )}
    </motion.div>
  );
}
