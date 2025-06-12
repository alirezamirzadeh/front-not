import type { HistoryItem } from '@/store/historyStore';
import type { Product } from '@/types/Product';
import { HistoryItemCard } from '../HistoryItem';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface HistoryListProps {
    history: HistoryItem[];
    products: Product[];
}

type ProcessedHistoryItem = HistoryItem & { product: Product };

type RowData = {
    items: ProcessedHistoryItem[];
};

export function HistoryList({ history, products }: HistoryListProps) {
    const processedHistory = useMemo((): ProcessedHistoryItem[] => {
        const productsMap = new Map(products.map((p: Product) => [p.id, p]));
        return history
            .map((item: HistoryItem) => ({
                ...item,
                product: productsMap.get(item.id),
            }))
            .filter((item): item is ProcessedHistoryItem => Boolean(item.product));
    }, [history, products]);

    const Row = ({ index, style, data }: ListChildComponentProps<RowData>) => {
        const item = data.items[index];
        
        return (
            <motion.div 
                style={style}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 < 0.09 ? index * 0.03 : 0.03, ease: "easeOut" }}
            >
                <div className='h-full w-full p-1'>
                    <HistoryItemCard 
                        item={item}
                        product={item.product} 
                    />
                </div>
            </motion.div>
        );
    };

    console.log("HistoryList rendered");

    return (
        <div className="h-full w-full">
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        width={width}
                        height={height}
                        itemCount={processedHistory.length}
                        itemSize={78}
                        itemData={{ items: processedHistory }}
                        itemKey={(index, data) => `${data.items[index].id}-${data.items[index].timestamp}`}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
        </div>
    );
}