import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { bootstrapCapacitor } from '@/core/capacitor/bootstrap';
import { getPlatform } from '@/core/capacitor/platform';
import { applyTheme, getSystemTheme } from '@/core/theme/apply-theme';
import { THEME_STORAGE_KEY, type Theme } from '@/core/theme/constants';

function initTheme(): void {
    try {
        const raw = localStorage.getItem(THEME_STORAGE_KEY);

        if (!raw) {
            return;
        }

        const parsed = JSON.parse(raw) as { state?: { theme?: Theme } };
        const theme = parsed.state?.theme ?? 'system';
        applyTheme(theme === 'system' ? getSystemTheme() : theme);
    } catch {
        // Ignore malformed storage entries
    }
}

initTheme();

// ── Service Worker (PWA) ───────────────────────────────────────────────────────
// Registered only on web; Capacitor native serves assets from disk.
if ('serviceWorker' in navigator && getPlatform() === 'web') {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .catch((err) => console.warn('[SW] Registration failed:', err));
    });
}

// ── Capacitor native bootstrap ────────────────────────────────────────────────
// No-op on web; configures status bar, keyboard, and hides splash on native.
bootstrapCapacitor().catch((err) => console.warn('[Capacitor] Bootstrap error:', err));

// ── Apply platform class to <html> for platform-specific CSS ─────────────────
document.documentElement.classList.add(`capacitor-${getPlatform()}`);

// ── Mount React ───────────────────────────────────────────────────────────────
const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element #root not found. Check app.blade.php.');
}

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
