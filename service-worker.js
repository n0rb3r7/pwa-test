// Installing service worker
const CACHE_NAME = "PWA-Demo";

/* Add relative URL of all the static content you want to store in
 * cache storage (this will help us use our app offline)*/
let resourcesToCache = [
  "./",
  "./index.html",
  "./page2.html",
  "./manifest.json",
  "./service-worker.js",
  "./styles.css",
  "./ss-favicon.png",
  "./images/icons",
  "./images/icon-b.png",
  "./images/icon-w.png",
  "./images/ss-logo-w.png",
  "./images/cover-b.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(resourcesToCache);
    })
  );
});
// Cache and return requests
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Update a service worker
const cacheWhitelist = ["PWA-Demo"];
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
