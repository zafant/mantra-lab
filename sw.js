const CACHE='mantra-lab-v38';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./styles.css','./styles-v32.css','./styles-v33.css','./styles-v34.css','./app.js','./flow-fix.js','./data-provider.js','./data/listone-2026-27.csv','./manifest.webmanifest','./icon.svg']))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
