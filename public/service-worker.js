const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/", // Page d'accueil
  "/index.html", // Fichier HTML
  "/manifest.json", // Manifest
  "/icons/icon-192x192.png", // Icône pour PWA
  "/icons/icon-512x512.png", // Icône pour PWA
  "/styles.css", // Exemple de fichier CSS
  "/script.js", // Exemple de fichier JS
];

// Installer le Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Mise en cache des fichiers nécessaires.");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activer le Service Worker et supprimer les anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Suppression de l'ancien cache :", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepter les requêtes et fournir les fichiers en cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});




// self.addEventListener('install', (event) => {
//     console.log('Service Worker installé.');
//  });
 
//  self.addEventListener('activate', (event) => {
//     console.log('Service Worker activé.');
//  });
 
//  self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request);
//         })
//     );
//  });
 