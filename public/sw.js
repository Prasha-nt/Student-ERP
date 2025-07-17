// const CACHE_NAME = "student-app-v2"
// const urlsToCache = [
//   "/",
//   "/manifest.json",
//   "/icon-192x192.png",
//   "/icon-512x512.png",
// ]

// // Install event – safe caching
// self.addEventListener("install", (event) => {
//   console.log('Service Worker installing...')
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache")
//       return Promise.all(
//         urlsToCache.map((url) =>
//           fetch(url)
//             .then((response) => {
//               if (!response.ok) {
//                 throw new Error(Failed to fetch ${url}: ${response.status})
//               }
//               return cache.put(url, response.clone())
//             })
//             .catch((err) => {
//               console.warn(Skipping caching ${url}:, err)
//             })
//         )
//       )
//     })
//   )
//   self.skipWaiting()
// })

// // Fetch event – serve from cache or network
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request)
//     })
//   )
// })

// // Activate event – clean old caches
// self.addEventListener("activate", (event) => {
//   console.log('Service Worker activating...')
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             console.log("Deleting old cache:", cacheName)
//             return caches.delete(cacheName)
//           }
//         })
//       )
//     )
//   )
//   self.clients.claim()
// })

// // Push event – show notification
// self.addEventListener("push", (event) => {
//   console.log('Push event received:', event)
  
//   let notificationData = {
//     title: "Student App",
//     body: "New notification from Student App",
//     icon: "/icon-192x192.png",
//     badge: "/icon-192x192.png"
//   }

//   if (event.data) {
//     try {
//       const data = event.data.json()
//       notificationData = { ...notificationData, ...data }
//     } catch (e) {
//       notificationData.body = event.data.text()
//     }
//   }

//   const options = {
//     body: notificationData.body,
//     icon: notificationData.icon,
//     badge: notificationData.badge,
//     vibrate: [100, 50, 100],
//     requireInteraction: true, // Keep notification visible until user interacts
//     persistent: true,
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: "2",
//       url: "/"
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

//   event.waitUntil(
//     self.registration.showNotification(notificationData.title, options)
//   )
// })

// // Notification click event – handle actions
// self.addEventListener("notificationclick", (event) => {
//   console.log('Notification click received:', event)
  
//   event.notification.close()
  
//   if (event.action === "explore" || !event.action) {
//     // Open the app when notification is clicked
//     event.waitUntil(
//       clients.matchAll({ type: 'window' }).then((clientList) => {
//         // Check if app is already open
//         for (const client of clientList) {
//           if (client.url === self.location.origin + '/' && 'focus' in client) {
//             return client.focus()
//           }
//         }
//         // If not open, open new window
//         if (clients.openWindow) {
//           return clients.openWindow('/')
//         }
//       })
//     )
//   }
// })

// // Background sync (optional - for offline actions)
// self.addEventListener('sync', (event) => {
//   console.log('Background sync event:', event.tag)
//   if (event.tag === 'background-sync') {
//     event.waitUntil(
//       // Handle background sync tasks here
//       Promise.resolve()
//     )
//   }
// })

// // Message event - for communication between main thread and service worker
// self.addEventListener('message', (event) => {
//   console.log('Message received in service worker:', event.data)
  
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting()
//   }
  
//   if (event.data && event.data.type === 'GET_VERSION') {
//     event.ports[0].postMessage({ version: CACHE_NAME })
//   }
// })



const CACHE_NAME = "student-app-v2"
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
]

// Install event – safe caching
self.addEventListener("install", (event) => {
  console.log('Service Worker installing...')
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
  console.log('Service Worker activating...')
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
  console.log('Push event received:', event)
  
  let notificationData = {
    title: "Student App",
    body: "New notification from Student App",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png"
  }

  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = { ...notificationData, ...data }
    } catch (e) {
      notificationData.body = event.data.text()
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    requireInteraction: true, // Keep notification visible until user interacts
    persistent: true,
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
      url: "/"
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
    self.registration.showNotification(notificationData.title, options)
  )
})

// Notification click event – handle actions
self.addEventListener("notificationclick", (event) => {
  console.log('Notification click received:', event)
  
  event.notification.close()
  
  if (event.action === "explore" || !event.action) {
    // Open the app when notification is clicked
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === self.location.origin + '/' && 'focus' in client) {
            return client.focus()
          }
        }
        // If not open, open new window
        if (clients.openWindow) {
          return clients.openWindow('/')
        }
      })
    )
  }
})

// Background sync (optional - for offline actions)
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag)
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks here
      Promise.resolve()
    )
  }
})

// Message event - for communication between main thread and service worker
self.addEventListener('message', (event) => {
  console.log('Message received in service worker:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
})