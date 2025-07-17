// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"
// import { useToast } from "@/components/ui/use-toast"

// interface NotificationContextType {
//   sendTestNotification: () => void;
//   isSupported: boolean;
//   permission: NotificationPermission;
//   swRegistration: ServiceWorkerRegistration | null;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// export function NotificationProvider({ children }: { children: React.ReactNode }) {
//   const { toast } = useToast()
//   const [isSupported, setIsSupported] = useState(false)
//   const [permission, setPermission] = useState<NotificationPermission>("default")
//   const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null)

//   // Service worker registration and notification setup
//   useEffect(() => {
//     // Check if notifications are supported
//     if ("Notification" in window) {
//       setIsSupported(true)
//       setPermission(Notification.permission)
//     }

//     // Register service worker
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker
//         .register("/sw.js")
//         .then((registration) => {
//           console.log("Service Worker registered:", registration)
//           setSwRegistration(registration)
          
//           // Handle service worker updates
//           registration.addEventListener('updatefound', () => {
//             const newWorker = registration.installing
//             if (newWorker) {
//               newWorker.addEventListener('statechange', () => {
//                 if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
//                   // New service worker is available
//                   console.log('New service worker available')
//                 }
//               })
//             }
//           })
//         })
//         .catch((error) => {
//           console.error("Service Worker registration failed:", error)
//           toast({
//             title: "Error",
//             description: "Failed to register app services. Notifications may not work properly.",
//             variant: "destructive",
//           })
//         })
//     } else {
//       console.warn("Service Workers not supported in this browser.")
//       toast({
//         title: "Browser Compatibility",
//         description: "Your browser does not fully support service workers. Notifications may not work.",
//         variant: "destructive",
//       })
//     }

//     // Listen for service worker messages
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker.addEventListener('message', (event) => {
//         console.log('Received message from service worker:', event.data)
//       })
//     }
//   }, [toast])

//   const sendTestNotification = async () => {
//     // 1. Check if the Notification API is supported by the browser
//     if (!isSupported) {
//       toast({
//         title: "Not Supported",
//         description: "Notifications are not supported in your current browser.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // 2. Check if service worker is registered
//     if (!swRegistration) {
//       toast({
//         title: "Service Worker Not Ready",
//         description: "Service worker is not registered yet. Please try again in a moment.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // 3. Provide guidance for iOS users regarding PWA installation
//     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
//     const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;

//     if (isIOS && !isStandalone) {
//       toast({
//         title: "iOS Device Detected",
//         description: "For notifications and full app experience, please add this app to your Home Screen.",
//         duration: 9000,
//       });
//     }

//     // 4. Request permission if needed
//     if (permission === "default") {
//       try {
//         const newPermission = await Notification.requestPermission();
//         setPermission(newPermission);
        
//         if (newPermission === "granted") {
//           console.log("Notification permission granted.");
//           await showNotification();
//         } else {
//           console.log("Notification permission denied or dismissed.");
//           toast({
//             title: "Permission Denied",
//             description: "You must grant permission to receive notifications.",
//             variant: "destructive",
//           });
//         }
//       } catch (error) {
//         console.error("Error requesting notification permission:", error);
//         toast({
//           title: "Error Requesting Permission",
//           description: "Could not prompt for notification permission. Please try again.",
//           variant: "destructive",
//         });
//       }
//     } else if (permission === "granted") {
//       // Permission already granted, proceed
//       console.log("Notification permission already granted.");
//       await showNotification();
//     } else { // permission === "denied"
//       // Permission is denied/blocked
//       console.log("Notifications are already blocked.");
//       toast({
//         title: "Notifications Blocked",
//         description: "Notifications are currently blocked. Please enable them in your browser settings.",
//         variant: "destructive",
//       });
//     }
//   };

//   // Enhanced notification function that works on both desktop and mobile
//   const showNotification = async () => {
//     try {
//       // Method 1: Try service worker notification first (works better on mobile)
//       if (swRegistration) {
//         try {
//           await swRegistration.showNotification("📢 Student App", {
//             body: "✅ Test notification sent successfully!",
//             icon: "/icon-192x192.png",
//             badge: "/icon-192x192.png",
//             // vibrate: [100, 50, 100],
//             requireInteraction: true,
//             persistent: true,
//             data: {
//               dateOfArrival: Date.now(),
//               primaryKey: "test-notification",
//               url: "/"
//             },
//             actions: [
//               {
//                 action: "explore",
//                 title: "Open App",
//                 icon: "/icon-192x192.png",
//               },
//               {
//                 action: "close",
//                 title: "Close",
//                 icon: "/icon-192x192.png",
//               },
//             ],
//           });

//           console.log("Service worker notification sent successfully");
          
//           // Try to vibrate if supported
//           if ("vibrate" in navigator) {
//             navigator.vibrate([100, 50, 100]);
//             console.log("Device vibrating...");
//           }

//           toast({
//             title: "Test Notification Sent",
//             description: "A test notification should have appeared on your screen.",
//           });
          
//           return; // Success, exit early
//         } catch (swError) {
//           console.warn("Service worker notification failed, trying direct notification:", swError);
//         }
//       }

//       // Method 2: Fallback to direct notification (works on desktop)
//       const notification = new Notification("📢 Student App", {
//         body: "✅ Test notification sent successfully!",
//         icon: "/icon-192x192.png",
//         badge: "/icon-192x192.png",
//         requireInteraction: true,
//         data: {
//           dateOfArrival: Date.now(),
//           primaryKey: "test-notification"
//         }
//       });

//       // Handle notification click
//       notification.onclick = () => {
//         window.focus();
//         notification.close();
//       };

//       // Try to vibrate if supported
//       if ("vibrate" in navigator) {
//         navigator.vibrate([100, 50, 100]);
//         console.log("Device vibrating...");
//       }

//       toast({
//         title: "Test Notification Sent",
//         description: "A test notification should have appeared on your screen.",
//       });

//     } catch (error) {
//       console.error("Error trying to show notification:", error);
//       toast({
//         title: "Notification Display Error",
//         description: "Failed to display the test notification. Check console for details.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <NotificationContext.Provider value={{ 
//       sendTestNotification, 
//       isSupported, 
//       permission, 
//       swRegistration 
//     }}>
//       {children}
//     </NotificationContext.Provider>
//   )
// }

// export function useNotification() {
//   const context = useContext(NotificationContext)
//   if (context === undefined) {
//     throw new Error("useNotification must be used within a NotificationProvider")
//   }
//   return context
// }



"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface NotificationContextType {
  sendTestNotification: () => void;
  isSupported: boolean;
  permission: NotificationPermission;
  swRegistration: ServiceWorkerRegistration | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [isSupported, setIsSupported] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null)

  // Service worker registration and notification setup
  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
      console.log("Notification permission status:", Notification.permission)
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration)
          setSwRegistration(registration)
          
          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New service worker available')
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
          toast({
            title: "Error",
            description: "Failed to register app services. Notifications may not work properly.",
            variant: "destructive",
          })
        })
    } else {
      console.warn("Service Workers not supported in this browser.")
      toast({
        title: "Browser Compatibility",
        description: "Your browser does not fully support service workers. Notifications may not work.",
        variant: "destructive",
      })
    }

    // Listen for service worker messages
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Received message from service worker:', event.data)
      })
    }
  }, [toast])

  const sendTestNotification = async () => {
    console.log("sendTestNotification called")
    console.log("isSupported:", isSupported)
    console.log("permission:", permission)
    console.log("swRegistration:", swRegistration)

    // 1. Check if the Notification API is supported by the browser
    if (!isSupported) {
      console.log("Notifications not supported")
      toast({
        title: "Not Supported",
        description: "Notifications are not supported in your current browser.",
        variant: "destructive",
      });
      return;
    }

    // 2. Check current permission status
    const currentPermission = Notification.permission;
    console.log("Current permission:", currentPermission)
    setPermission(currentPermission)

    // 3. Request permission if needed (must be triggered by user interaction)
    if (currentPermission === "default") {
      console.log("Requesting permission...")
      try {
        // This must be called in response to a user gesture
        const newPermission = await Notification.requestPermission();
        console.log("Permission result:", newPermission)
        setPermission(newPermission);
        
        if (newPermission === "granted") {
          console.log("Permission granted, showing notification")
          await showNotification();
        } else {
          console.log("Permission denied or dismissed")
          toast({
            title: "Permission Required",
            description: "Please allow notifications to receive app updates. You can change this in your browser settings.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error requesting permission:", error);
        toast({
          title: "Permission Error",
          description: "Could not request notification permission. Please enable notifications manually in your browser settings.",
          variant: "destructive",
        });
      }
    } else if (currentPermission === "granted") {
      console.log("Permission already granted, showing notification")
      await showNotification();
    } else { // permission === "denied"
      console.log("Notifications are blocked")
      toast({
        title: "Notifications Blocked",
        description: "Notifications are blocked. Please enable them in your browser settings and refresh the page.",
        variant: "destructive",
      });
      
      // Provide specific instructions for enabling notifications
      const isChrome = /Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      
      if (isChrome) {
        console.log("Chrome detected - check site settings")
      } else if (isFirefox) {
        console.log("Firefox detected - check permissions")
      } else if (isSafari) {
        console.log("Safari detected - check website preferences")
      }
    }
  };

  // Enhanced notification function with better error handling
  const showNotification = async () => {
    console.log("showNotification called")
    
    try {
      // For desktop: Try direct notification first (more reliable)
      if (!navigator.userAgent.includes('Mobile')) {
        console.log("Desktop detected, using direct notification")
        
        const notification = new Notification("📚 Student App", {
          body: "✅ Test notification working perfectly!",
          icon: "/icon-192x192.png",
          badge: "/icon-192x192.png",
          tag: "test-notification", // Prevents duplicate notifications
          requireInteraction: false, // Don't require interaction on desktop
          silent: false
        });

        // Handle notification events
        notification.onclick = () => {
          console.log("Notification clicked")
          window.focus();
          notification.close();
        };

        notification.onshow = () => {
          console.log("Notification shown")
        };

        notification.onerror = (error) => {
          console.error("Notification error:", error)
        };

        // Auto-close after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);

        toast({
          title: "✅ Notification Sent",
          description: "Check your screen for the test notification!",
        });
        
        return;
      }

      // For mobile: Try service worker notification
      if (swRegistration) {
        console.log("Mobile detected, using service worker notification")
        
        await swRegistration.showNotification("📚 Student App", {
          body: "✅ Test notification working perfectly!",
          icon: "/icon-192x192.png",
          badge: "/icon-192x192.png",
          tag: "test-notification",
          requireInteraction: false,
          silent: false,
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: "test-notification",
            url: "/"
          },
          actions: [
            {
              action: "open",
              title: "Open App",
              icon: "/icon-192x192.png",
            },
            {
              action: "close",
              title: "Close",
              icon: "/icon-192x192.png",
            },
          ],
        });

        console.log("Service worker notification sent")
        
        // Try to vibrate if supported
        if ("vibrate" in navigator) {
          navigator.vibrate([100, 50, 100]);
        }

        toast({
          title: "✅ Notification Sent",
          description: "Check your screen for the test notification!",
        });
        
        return;
      }

      // Fallback: Direct notification for mobile if SW fails
      console.log("Fallback to direct notification")
      const notification = new Notification("📚 Student App", {
        body: "✅ Test notification working perfectly!",
        icon: "/icon-192x192.png",
        tag: "test-notification"
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      toast({
        title: "✅ Notification Sent",
        description: "Check your screen for the test notification!",
      });

    } catch (error) {
      console.error("Error showing notification:", error);
      toast({
        title: "❌ Notification Failed",
        description: `Error: ${error.message}. Check browser console for details.`,
        variant: "destructive",
      });
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      sendTestNotification, 
      isSupported, 
      permission, 
      swRegistration 
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}