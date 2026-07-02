import type { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import ToastProvider from './ToastProvider';

interface AppProviderProps {
    children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <QueryProvider>
            {children}
            <ToastProvider />
        </QueryProvider>
    );
}
