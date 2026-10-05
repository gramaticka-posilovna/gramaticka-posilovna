// Offline: soubory appky jsou v cache. Nejdřív se zkusí síť (ať se nová verze
// ukáže hned), bez internetu se použije uložená kopie. Verzi není třeba ručně zvyšovat.
const CACHE = "gramaticka-posilovna";
const FILES = [
  "./",
  "index.html",
  "manifest.json",
  "favicon.png",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "fonts/fraunces-latin.woff2",
  "fonts/fraunces-latin-ext.woff2",
  "fonts/inter-latin.woff2",
  "fonts/inter-latin-ext.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
