import { useEffect, type ReactNode } from 'react';
import { syncSystemTheme, useThemeStore } from '@/shared/stores/theme-store';

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    useEffect(() => {
        const { theme, setTheme } = useThemeStore.getState();
        setTheme(theme);
        return syncSystemTheme();
    }, []);

    return <div className="transition-theme min-h-full">{children}</div>;
}
