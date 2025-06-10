import { motion } from 'framer-motion';
import type { HistoryItem } from '@/store/historyStore';
import type { Product } from '@/types/Product';


interface HistoryItemCardProps {
    item: HistoryItem;
    product?: Product;
}
const formatDate = (ts: number) => {
    const date = new Date(ts * 1000)
    const [month, dayWithComma, year] = date
        .toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
        })
        .split(' ')
    return `${dayWithComma.replace(',', '')} ${month}  '${year}`
}


export function HistoryItemCard({ item, product }: HistoryItemCardProps) {


    return (

        <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="flex items-center gap-3 h-[68px] font-[590]"
        >
            <img
                src={product?.images?.[item.id - 1] ?? '/images/product.png'}
                alt={product?.name ?? 'product'}
                className="w-[60px] h-[60px] rounded-xl object-cover"

            />
            <div className="flex-1">
                <p className="text-xs text-gray-500">
                    {product?.category ?? 'Unknown'}
                </p>
                <p className="text-lg">{product?.name ?? 'N/A'}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500">
                    {formatDate(item.timestamp)}
                </p>
                <p className="text-lg">
                    {item.total.toLocaleString()} {item.currency}
                </p>
            </div>
        </motion.li>
    );
} 