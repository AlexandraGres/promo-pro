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
  '/manifest.json',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/static/media/forgot_pass_bg.1992df0155845ce98add.png',
  '/static/media/login_bg.b5770f719ce0e6957a52.png',
  '/static/media/sign_up_bg.ea329bb651660db3dea6.png',
  '/static/media/Roboto-Regular.5dd918926d41224c8142.ttf',
  '/static/media/search.03e6ee128336d2d5e384.svg',
  '/upload.svg',
  'post-img.png',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

this.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
