import { useAccountData } from '@/hooks/useAccountData'; // ۱. استفاده از هوک سفارشی
import { HistoryList } from '@/components/ui/HistoryList';
import { HistorySkeleton } from '@/components/ui/HistorySkeleton';
import { EmptyHistory } from '@/components/ui/EmptyHistory';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function HistoryBox() {
    // ۲. تمام منطق پیچیده حالا در این یک خط خلاصه شده
    const { status, errorMessage, history, products } = useAccountData();

    console.log('HistoryBox rendered');

    return (
        <div className="flex-1 overflow-y-auto pb-20">
            {status === 'loading' && <HistorySkeleton />}
            {status === 'error' && <ErrorMessage message={errorMessage || "An error occurred."} />}
            {status === 'success' && (
                history.length === 0 
                    ? <EmptyHistory /> 
                    : <HistoryList history={history} products={products} />
            )}
        </div>
    );
}