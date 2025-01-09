const cacheName = "UnknownCat2048-Minesweeper-1.1.1";
const contentToCache = [
    "Build/Minesweeper-v1.1.1-WebGL.loader.js",
    "Build/Minesweeper-v1.1.1-WebGL.framework.js.unityweb",
    "Build/Minesweeper-v1.1.1-WebGL.data.unityweb",
    "Build/Minesweeper-v1.1.1-WebGL.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});