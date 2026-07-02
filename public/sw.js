/**
 * Service Worker — Hybrid App
 *
 * Strategy:
 *  - Navigation requests  → Network-first, fallback to cached shell
 *  - Static assets (JS/CSS/fonts/images) → Cache-first, update in background
 *  - API requests (/api/*)  → Network-only (never cached)
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `hybrid-app-${CACHE_VERSION}`;

const STATIC_EXT = /\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|webp|svg|ico|gif)(\?.*)?$/;

// ─── Install ──────────────────────────────────────────────────────────────────

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(['/'])
        ).then(() => self.skipWaiting())
    );
});

// ─── Activate ─────────────────────────────────────────────────────────────────

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// ─── Fetch ────────────────────────────────────────────────────────────────────

self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Only handle GET
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Skip: non-same-origin, API, Vite HMR, browser extensions
    if (
        url.origin !== self.location.origin ||
        url.pathname.startsWith('/api/') ||
        url.pathname.startsWith('/@') ||
        url.pathname.startsWith('/sanctum/') ||
        url.protocol === 'chrome-extension:'
    ) {
        return;
    }

    // Navigation → network-first, fallback to shell
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .catch(() =>
                    caches.match('/').then((res) => res ?? Response.error())
                )
        );
        return;
    }

    // Static assets → cache-first, update in background (stale-while-revalidate)
    if (STATIC_EXT.test(url.pathname)) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) =>
                cache.match(request).then((cached) => {
                    const networkFetch = fetch(request).then((response) => {
                        if (response.ok) {
                            cache.put(request, response.clone());
                        }
                        return response;
                    });
                    return cached ?? networkFetch;
                })
            )
        );
    }
});
