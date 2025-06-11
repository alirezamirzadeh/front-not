import { useState, useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(
  totalItems: number,
  itemsPerPage = 10,
  isLoading = false
) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && !isLoading && visibleCount < totalItems) {
      setIsLoadingMore(true);
      setVisibleCount((prev) =>
        Math.min(prev + itemsPerPage, totalItems)
      );
      setTimeout(() => setIsLoadingMore(false), 500);
    }
  }, [isLoadingMore, isLoading, visibleCount, itemsPerPage, totalItems]);

  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );
    observerRef.current.observe(sentinel);
    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  return { visibleCount, isLoadingMore, sentinelRef };
}
