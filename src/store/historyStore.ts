import { fetchGet } from "@/services/apiService";
import { create } from "zustand";
import type { TransitionStartFunction } from "react";

export interface HistoryItem {
    timestamp: number;
    id: number;
    total: number;
    currency: string;
}

interface HistoryState {
    history: HistoryItem[];
    loading: boolean;
    error: string | null;
    fetchHistory: (startTransition: TransitionStartFunction) => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
    history: [],
    loading: false,
    error: null,
    
    fetchHistory: async (startTransition) => {
        const { history, loading } = get();
        if (loading || history.length > 0) {
            return;
        }
        set({ loading: true, error: null });
        try {
            const res = await fetchGet<{ data: HistoryItem[] }>("history.json");

            if (res.success && res.data?.data) {
                // ۲. آپدیت state داخل startTransition انجام می‌شود تا UI هنگ نکند
                startTransition(() => {
                    set({ history: res.data!.data, loading: false });
                });
            } else {
                throw new Error(res.error || 'Failed to fetch history');
            }
        } catch (err: unknown) {
            console.error("[HistoryStore] fetchHistory error:", err);
            set({ error: err instanceof Error ? err.message : "Unknown error", loading: false });
        }
    },
}));