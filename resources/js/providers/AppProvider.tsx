import type { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

interface AppProviderProps {
    children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <QueryProvider>
            <ThemeProvider>
                {children}
                <ToastProvider />
            </ThemeProvider>
        </QueryProvider>
    );
}
