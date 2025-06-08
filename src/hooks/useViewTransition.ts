import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { flushSync } from 'react-dom';

export function useViewTransition() {
    const navigate = useNavigate();

    const navigateWithTransition = useCallback((to: string) => {
        console.log(document.startViewTransition);

        if (!document.startViewTransition) {
            navigate(to);
            return;
        }

        document.startViewTransition(() => {
            flushSync(() => {
                navigate(to);
            });
        });
    }, [navigate]);

    return navigateWithTransition;
} 