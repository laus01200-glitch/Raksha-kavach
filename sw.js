// Service Worker — cache busted, always fetch fresh
const CACHE = 'raksha-kavach-v6';

// On install, skip waiting immediately
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

// On activate, delete ALL old caches and take control
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        return caches.delete(key);
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Always fetch from network, never from cache
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
