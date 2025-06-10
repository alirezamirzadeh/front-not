import { useEffect, useTransition } from 'react';
import { useAccountData } from '@/hooks/useAccountData'; // ۱. ایمپورت کردن هوک جدید
import { HistoryList } from '@/components/ui/HistoryList';
import { HistorySkeleton } from '@/components/ui/HistorySkeleton';
import { EmptyHistory } from '@/components/ui/EmptyHistory';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function HistoryBox() {
    const [isPending, startTransition] = useTransition();
    
    const { history, products, isLoading, error, fetchHistory, fetchProducts } = useAccountData();

    useEffect(() => {
    
        const fetchData = () => {
            if (history.length === 0) {
            
                fetchHistory(startTransition);
            }
            if (products.length === 0) {
                fetchProducts(startTransition);
            }
        };
        fetchData();
    }, [fetchHistory, fetchProducts, history.length, products.length, startTransition]);

    console.log('HistoryBox rendered, using useAccountData hook.');


    const showSkeleton = isLoading || isPending;

    return (
        <div className="flex-1 overflow-y-auto pb-20">
            {showSkeleton ? (
                <HistorySkeleton />
            ) : error ? (
                <ErrorMessage message={error || "An error occurred."} />
            ) : history.length === 0 ? (
                <EmptyHistory />
            ) : (
                <HistoryList history={history} products={products} />
            )}
        </div>
    );
}