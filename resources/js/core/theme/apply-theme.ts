import type { ResolvedTheme } from './constants';

export function applyTheme(theme: ResolvedTheme): void {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
}

export function getSystemTheme(): ResolvedTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
