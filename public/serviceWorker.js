const CACHE_NAME = 'app-cache-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/forgot-pass',
  '/sign-up',
  '/terms',
  '/login',
  '/add-article',
  '/edit-profile',
  '/favicon.ico',
  '/google.svg',
  '/hand.svg',
  '/facebook.svg',
  '/logo192.png',
  '/logo.svg',
  '/logo-white.svg',
  '/arrow_l.svg',
  '/dashboard.svg',
  '/dashboard-disabled.svg',
  '/manifest.json',
  '/upload.svg',
  'post-img.png',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }),
  );
});

this.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

this.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/static/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((fetchResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      }),
    );
  } else {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  }
});
