
const CacheName = "cachev1";
const assets = ["/", "/index.html"];

// ajout fichiers en cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});


// partie empruntée à Kaliop (voir rapport)
//https://gist.github.com/Tyki/5db19ee8f44ecda20c3d4cafcfadc447#file-swfetch-js
self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Cloner la requête.
        // Une requete est un flux et est à consommation unique
        // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
        var fetchRequest = event.request.clone();
  
        return fetch(fetchRequest).then(function (response) {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
  
          // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
          var responseToCache = response.clone();
  
          caches.open(CacheName).then(function (cache) {
            cache.put(event.request, responseToCache);
          });
  
          return response;
        });
      })
    );
  });



//supprimer caches
//ici on évite d'accumuler dans le cache les services workers à chaque reload 
//on check si il y a deja un cache en regardant la clé des caches
//toutes les clés qui ne correspondent pas à la variable CacheName son filtrées (supprimées)
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
        return Promise.add(
            keys
            .filter((key) => key !== CacheName)
            .map((key) => caches.delete(key))
        );
        })
    );
});