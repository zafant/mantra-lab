const CACHE='mantra-lab-v43';
const ASSETS=['./','./index.html','./styles.css','./styles-v32.css','./styles-v34.css','./styles-v40.css?v=42','./app-v40.js?v=42','./data-provider.js?v=42','./data/listone-2026-27.csv','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));