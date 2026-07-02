import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Mobile build for Capacitor.
 *
 * Produces a self-contained build in mobile/www/ with relative asset paths.
 * Run: npm run build:mobile && npx cap sync
 */
export default defineConfig({
    root: 'mobile',
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, 'resources/js'),
        },
    },
    build: {
        outDir: path.resolve(import.meta.dirname, 'mobile/www'),
        emptyOutDir: true,
    },
});
