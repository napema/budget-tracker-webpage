/* Registro — service worker. ALZA LA VERSIONE a ogni modifica dei file. */
const CACHE = "registro2-v3";
const ASSETS = ["./", "./index.html", "./config.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if(e.request.method !== "GET") return;                 // le PUT del sync passano dirette
  if(url.hostname === "api.github.com") return;          // il sync non va mai in cache
  if(url.origin !== location.origin){                    // font e risorse esterne: rete, cache di riserva
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // app shell: cache-first con aggiornamento in background
  e.respondWith(
    caches.match(e.request).then(hit => {
      const net = fetch(e.request).then(res => {
        if(res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
