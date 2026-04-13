const CACHE_NAME = 'gofit-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Instala o Service Worker e faz o cache dos arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos em cache armazenados para o GoFit');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para o app funcionar offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a versão do cache se existir
        if (response) {
          return response;
        }
        // Se não tiver no cache, busca na internet
        return fetch(event.request);
      })
  );
});

// Atualiza o Service Worker e apaga caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});