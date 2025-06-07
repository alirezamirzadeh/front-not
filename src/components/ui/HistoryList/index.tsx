import { motion, AnimatePresence } from 'framer-motion';
import type { HistoryItem } from '@/store/historyStore';
import type { Product } from '@/types/Product';
import { HistoryItemCard } from '../HistoryItem';

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
    visibleItems: number;
}

export function HistoryList({ history, products, visibleItems }: HistoryListProps) {
    return (
        <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
        >
            <AnimatePresence mode="popLayout">
                {history.slice(0, visibleItems).map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    return (
                        <HistoryItemCard
                            key={item.timestamp}
                            item={item}
                            product={product}
                        />
                    );
                })}
            </AnimatePresence>
        </motion.ul>
    );
} 