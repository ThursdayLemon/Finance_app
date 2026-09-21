/* 离线缓存：装完之后没网也能打开。
   策略是「先拿网络，拿不到再用缓存」—— 这样一发新版刷新就是新的。

   但光这么写还不够：fetch() 默认会走浏览器自己那层 HTTP 缓存，而
   GitHub Pages 发的是 cache-control: max-age=600 —— 于是「先拿网络」
   拿回来的其实是十分钟内的旧副本，整个策略被架空。发了新版看不到，
   就是这么来的。加 cache:"no-store" 让它真的去服务器要。 */
const CACHE = "margin-v75";
const FILES = ["./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).catch(() => {}));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html")))
  );
});
