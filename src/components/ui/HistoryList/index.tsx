import { motion, AnimatePresence } from 'framer-motion';
import type { HistoryItem } from '@/store/historyStore';
import type { Product } from '@/types/Product';
import { HistoryItemCard } from '../HistoryItem';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

interface HistoryListProps {
    history: HistoryItem[];
    products: Product[];
}

export function HistoryList({ history, products }: HistoryListProps) {



    const Row = ({ index, style }: ListChildComponentProps) => (
        <div key={index} style={style}>
            <HistoryItemCard 
                item={history[index]}
                product={products.find((p) => p.id === history[index].id)} />
        </div>
    );

    console.log("HistoryList");

    return (
        <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className=" h-full "
        >
            <AnimatePresence mode="popLayout">
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            width={width}
                            height={height}
                            itemCount={history.length}
                            itemSize={70}
                            className='flex flex-col gap-40'
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
            </AnimatePresence>
        </motion.ul>
    );
} 