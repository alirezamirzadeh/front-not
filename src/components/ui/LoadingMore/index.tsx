import { forwardRef } from 'react';

interface LoadingMoreProps {
    isLoading: boolean;
}

export const LoadingMore = forwardRef<HTMLDivElement, LoadingMoreProps>(
    ({ isLoading }, ref) => {
        return (
            <div ref={ref} className="flex justify-center py-4">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 animate-spin text-gray-500"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                        />
                    </svg>
                    <span className="text-gray-500">
                        {isLoading ? 'Loading more' : 'Scroll for more'}
                    </span>
                </div>
            </div>
        );
    }
); 