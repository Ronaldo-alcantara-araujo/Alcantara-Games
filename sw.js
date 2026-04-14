const CACHE_NAME="alcantara-games-dashboard-clean-v1";
const APP_ASSETS=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./logo.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_ASSETS)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cl=r.clone();caches.open(CACHE_NAME).then(cache=>cache.put(e.request,cl)).catch(()=>{});return r;}).catch(()=>caches.match("./index.html"))));});
