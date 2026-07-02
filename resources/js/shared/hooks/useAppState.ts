import { useEffect, useState } from 'react';
import { isNative } from '@/core/capacitor/platform';

interface AppState {
    isActive: boolean;
}

/**
 * Tracks whether the app is in the foreground (active) or background.
 * Always active on web.
 */
export function useAppState(): AppState {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!isNative()) return;

        let removeListener: (() => void) | undefined;

        void import('@capacitor/app').then(({ App }) => {
            void App.addListener('appStateChange', ({ isActive: active }) => {
                setIsActive(active);
            }).then((handle) => {
                removeListener = () => void handle.remove();
            });
        });

        return () => removeListener?.();
    }, []);

    return { isActive };
}
