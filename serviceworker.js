/*I used the follow site(s) greatly when researching how to implement a service worker. If possible, when citing large blocks of code I will indicate that these are not my own works, but in addition to the cited code these sites provided the knowledge, ideas, and functions that I needed
https://developers.google.com/web/fundamentals/primers/service-workers/
*/
var toCache = [
  "./",
  "./portfolio.html",
  "./contact.html",
  "./browserconfig.xml",
  "./favicon.ico",
  "./images/site.webmanifest",
  "./js/contact.js",
  "./js/index.js",
  "./js/portfolio.js",
  "./css/styles.css",
  "./images/personalImage.jpg"
];
var mainCache = "personal-4";
self.addEventListener("install", function(event) {
  //To immediately take over
  self.skipWaiting();
  event.waitUntil(
    caches.open(mainCache).then(function(cache) {
      return cache.addAll(toCache);
    })
  );
});
//Remove old cache if exists, main outline from developers.google.com
self.addEventListener("activate", function(event) {
  event.waitUntil(
    //Get all current caches
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        //Make an array containing the promises of deleting all the old caches which then resolve Promise.all which resolve waitUnitl
        cacheNames.map(function(cacheName) {
          if (cacheName !== mainCache) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
//Fetch outline from developers.google.com Response from cache outline from there as well
self.addEventListener("fetch", function(event) {
  //Make sure it isn't a post handleRequest.php request
  if (event.request.method === "GET") {
    //If event is not a server request, then respond if possible from cache
    event.respondWith(
      caches.match(event.request).then(function(response) {
        //Return from cache
        if (response) {
          return response;
        }
        //Not in cache, get it and then add it to the cache
        //Copy the request
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(function(response) {
            //If the response is bad, we don't want it in the cache
            if (
              !response ||
              response.status !== 200 ||
              (response.type !== "basic" && response.type !== "cors")
            ) {
              return response;
            }
            //Copy the response into cache before returning actual response
            var responseToCache = response.clone();
            caches.open(mainCache).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            //Return actual response
            return response;
          })
          .catch(function() {
            return Promise.reject(new Error("Fetch Failed"));
          });
      })
    );
    //Response from cache outline end
  } else {
    //Don't need to cache this in case of offline problems, because it is a server request
    event.respondWith(
      fetch(event.request).catch(function() {
        console.log(event);
        return Promise.reject(new Error("Fetch Failed"));
      })
    );
  }
});
//Fetch outline end
