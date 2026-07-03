import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createPlatformSnapshot, type PlatformSnapshot } from '@/core/platform';

const PlatformContext = createContext<PlatformSnapshot | null>(null);

interface PlatformProviderProps {
    children: ReactNode;
}

export default function PlatformProvider({ children }: PlatformProviderProps) {
    const snapshot = useMemo(() => createPlatformSnapshot(), []);

    return <PlatformContext.Provider value={snapshot}>{children}</PlatformContext.Provider>;
}

export function usePlatformContext(): PlatformSnapshot {
    const context = useContext(PlatformContext);

    if (context === null) {
        throw new Error('usePlatformContext must be used within a PlatformProvider');
    }

    return context;
}
