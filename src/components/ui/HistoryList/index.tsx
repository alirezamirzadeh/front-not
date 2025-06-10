import type { HistoryItem } from '@/store/historyStore';
import type { Product } from '@/types/Product';
import { HistoryItemCard } from '../HistoryItem';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';



interface HistoryListProps {
    history: HistoryItem[];
    products: Product[];
}

export function HistoryList({ history, products }: HistoryListProps) {



    const Row = ({ index, style }: ListChildComponentProps) => (
        <div key={index + history[index].timestamp} style={style}>
            <HistoryItemCard 
                item={history[index]}
                product={products.find((p) => p.id === history[index].id)} />
        </div>
    );

    console.log("HistoryList");

    return (
        <ul
           
            className=" h-full  "
        >
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            width={width}
                            height={height}
                            itemCount={history.length}
                            itemSize={70}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
        </ul>
    );
} 