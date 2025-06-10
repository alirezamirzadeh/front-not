import { memo } from 'react';
import type { HistoryItem } from '@/store/historyStore';
import type { Product } from '@/types/Product';

interface HistoryItemCardProps {
    item: HistoryItem;
    product: Product;
}

const formatDate = (ts: number) => {
    const date = new Date(ts * 1000);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    };
    const format= date.toLocaleDateString('en-US', options);

    return `${format.split(" ")[1].split(",")[0]} ${format.split(" ")[0]} '${format.split(" ")[2]}`
}

export const HistoryItemCard = memo(({ item, product }: HistoryItemCardProps) => {
    const imageUrl = product.images?.[item.id] || '/images/placeholder.png';

    return (
        <div className="flex items-center gap-3 h-full w-full font-[590]  rounded-xl">
            <img
                src={imageUrl}
                alt={product.name}
                className="w-[60px] h-[60px] rounded-lg object-cover flex-shrink-0"
                loading="lazy"
            />
            <div className="flex-1 min-w-0">
                <p className="text-xs text-block/50 dark:text-white/50 truncate">
                    {product.category}
                </p>
                <p className="text-lg truncate">{product.name}</p>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-xs text-block/50 dark:text-white/50 ">
                    {formatDate(item.timestamp)}
                </p>
                <p className="text-lg">
                    {item.total.toLocaleString()} {item.currency}
                </p>
            </div>
        </div>
    );
});