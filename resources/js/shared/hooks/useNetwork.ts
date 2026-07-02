import { useEffect, useState } from 'react';
import { isNative } from '@/core/capacitor/platform';

interface NetworkState {
    isOnline: boolean;
    connectionType: string;
}

/**
 * Returns live network status.
 * Uses Capacitor Network plugin on native, browser events on web.
 */
export function useNetwork(): NetworkState {
    const [state, setState] = useState<NetworkState>({
        isOnline: navigator.onLine,
        connectionType: 'unknown',
    });

    useEffect(() => {
        if (isNative()) {
            let removeListener: (() => void) | undefined;

            void import('@capacitor/network').then(({ Network }) => {
                void Network.getStatus().then((status) => {
                    setState({ isOnline: status.connected, connectionType: status.connectionType });
                });

                void Network.addListener('networkStatusChange', (status) => {
                    setState({ isOnline: status.connected, connectionType: status.connectionType });
                }).then((handle) => {
                    removeListener = () => void handle.remove();
                });
            });

            return () => removeListener?.();
        }

        const onOnline = () => setState((s) => ({ ...s, isOnline: true }));
        const onOffline = () => setState((s) => ({ ...s, isOnline: false }));

        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);
        return () => {
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        };
    }, []);

    return state;
}
