export function HistorySkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="flex gap-3 items-center h-[68px] py-2 rounded-xl animate-pulse"
                >
                    <div className="w-[60px] h-[60px] rounded-xl bg-gray-200 dark:bg-white/10" />
                    <div className="flex-1 space-y-2">
                        <div className="w-20 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                        <div className="w-32 h-4 bg-gray-200 dark:bg-white/10 rounded" />
                    </div>
                    <div className="text-right space-y-2">
                        <div className="w-16 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                        <div className="w-24 h-4 bg-gray-200 dark:bg-white/10 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
} 