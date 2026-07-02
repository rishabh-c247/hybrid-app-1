import { useEffect } from 'react';
import { isAndroid } from '@/core/capacitor/platform';

/**
 * Handles the Android hardware back button.
 * No-op on iOS and web.
 */
export function useBackButton(handler: () => void): void {
    useEffect(() => {
        if (!isAndroid()) return;

        let removeListener: (() => void) | undefined;

        void import('@capacitor/app').then(({ App }) => {
            void App.addListener('backButton', handler).then((handle) => {
                removeListener = () => void handle.remove();
            });
        });

        return () => removeListener?.();
    }, [handler]);
}
