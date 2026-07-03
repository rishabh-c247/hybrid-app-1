import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { applyTheme, getSystemTheme } from '@/core/theme/apply-theme';
import { THEME_STORAGE_KEY, type ResolvedTheme, type Theme } from '@/core/theme/constants';

interface ThemeState {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

function resolveTheme(theme: Theme): ResolvedTheme {
    if (theme === 'system') {
        return getSystemTheme();
    }

    return theme;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'system',
            resolvedTheme: 'light',
            setTheme: (theme) => {
                const resolvedTheme = resolveTheme(theme);
                applyTheme(resolvedTheme);
                set({ theme, resolvedTheme });
            },
            toggleTheme: () => {
                const current = get().resolvedTheme;
                const next: Theme = current === 'dark' ? 'light' : 'dark';
                get().setTheme(next);
            },
        }),
        {
            name: THEME_STORAGE_KEY,
            partialize: (state) => ({ theme: state.theme }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const resolvedTheme = resolveTheme(state.theme);
                    applyTheme(resolvedTheme);
                    state.resolvedTheme = resolvedTheme;
                }
            },
        },
    ),
);

export function syncSystemTheme(): () => void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (): void => {
        const { theme, setTheme } = useThemeStore.getState();

        if (theme === 'system') {
            setTheme('system');
        }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
}
