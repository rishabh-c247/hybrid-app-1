import type { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import PlatformProvider from './PlatformProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

interface AppProviderProps {
    children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <QueryProvider>
            <PlatformProvider>
                <ThemeProvider>
                    {children}
                    <ToastProvider />
                </ThemeProvider>
            </PlatformProvider>
        </QueryProvider>
    );
}
