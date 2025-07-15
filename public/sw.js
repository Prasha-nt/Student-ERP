// const CACHE_NAME = "student-app-v2"
// const urlsToCache = ["/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png"]

// // Install event
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache")
//       return cache.addAll(urlsToCache)
//     }),
//   )
//   self.skipWaiting()
// })

// // Fetch event
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       // Return cached version or fetch from network
//       return response || fetch(event.request)
//     }),
//   )
// })

// // Activate event
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             console.log("Deleting old cache:", cacheName)
//             return caches.delete(cacheName)
//           }
//         }),
//       )
//     }),
//   )
//   self.clients.claim()
// })

// // Push notification event
// self.addEventListener("push", (event) => {
//   const options = {
//     body: event.data ? event.data.text() : "New notification from Student App",
//     icon: "/icon-192x192.png",
//     badge: "/icon-192x192.png",
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: "2",
//     },
//     actions: [
//       {
//         action: "explore",
//         title: "Open App",
//         icon: "/icon-192x192.png",
//       },
//       {
//         action: "close",
//         title: "Close",
//         icon: "/icon-192x192.png",
//       },
//     ],
//   }

//   event.waitUntil(self.registration.showNotification("Student App", options))
// })

// // Notification click event
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close()

//   if (event.action === "explore") {
//     event.waitUntil(clients.openWindow("/"))
//   }
// })

const CACHE_NAME = "student-app-v2"
const urlsToCache = [
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
]

// Install event – safe caching
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return Promise.all(
        urlsToCache.map((url) =>
          fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status}`)
              }
              return cache.put(url, response.clone())
            })
            .catch((err) => {
              console.warn(`Skipping caching ${url}:`, err)
            })
          )
      )
    })
  )
  self.skipWaiting()
})

// Fetch event – serve from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

// Activate event – clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
  self.clients.claim()
})

// Push event – show notification
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New notification from Student App",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "Open App",
        icon: "/icon-192x192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icon-192x192.png",
      },
    ],
  }

  event.waitUntil(
    self.registration.showNotification("Student App", options)
  )
})

// Notification click event – handle actions
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})
