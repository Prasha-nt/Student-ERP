// "use client"

// import type React from "react"

// import { createContext, useContext, useEffect } from "react"
// import { useToast } from "@/components/ui/use-toast"

// interface NotificationContextType {
//   sendTestNotification: () => void
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// export function NotificationProvider({ children }: { children: React.ReactNode }) {
//   const { toast } = useToast()

//   useEffect(() => {
//     // Register service worker for notifications
//     if ("serviceWorker" in navigator && "PushManager" in window) {
//       navigator.serviceWorker
//         .register("/sw.js")
//         .then((registration) => {
//           console.log("SW registered: ", registration)
//         })
//         .catch((registrationError) => {
//           console.log("SW registration failed: ", registrationError)
//         })
//     }

//     // Request notification permission
//     if ("Notification" in window) {
//       Notification.requestPermission()
//     }
//   }, [])

//   const sendTestNotification = () => {
//     if ("Notification" in window && Notification.permission === "granted") {
//       new Notification("Student App", {
//         body: "Test notification sent successfully!",
//         icon: "/icon-192x192.png",
//         badge: "/icon-192x192.png",
//       })
//     } else {
//       toast({
//         title: "Test Notification",
//         description: "Notification sent successfully!",
//       })
//     }
//   }

//   return <NotificationContext.Provider value={{ sendTestNotification }}>{children}</NotificationContext.Provider>
// }

// export function useNotification() {
//   const context = useContext(NotificationContext)
//   if (context === undefined) {
//     throw new Error("useNotification must be used within a NotificationProvider")
//   }
//   return context
// }

// --------------------------------------------------------------------------------------First Commit------------------------------------------------------------------------
// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect } from "react"
// import { useToast } from "@/components/ui/use-toast"

// interface NotificationContextType {
//   sendTestNotification: () => void
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// export function NotificationProvider({ children }: { children: React.ReactNode }) {
//   const { toast } = useToast()

//   useEffect(() => {
//     // Register service worker
//     if ("serviceWorker" in navigator && "PushManager" in window) {
//       navigator.serviceWorker
//         .register("/sw.js")
//         .then((registration) => {
//           console.log("Service Worker registered:", registration)
//         })
//         .catch((error) => {
//           console.log("Service Worker registration failed:", error)
//         })
//     }

//     // Request notification permission if not already granted
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission()
//     }
//   }, [])

//   const sendTestNotification = () => {
//     if (!("Notification" in window)) {
//       toast({
//         title: "Not Supported",
//         description: "Notifications are not supported in this browser.",
//       })
//       return
//     }

//     // Request permission if not yet decided
//     if (Notification.permission === "default") {
//       Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//           showNotification()
//         } else {
//           toast({
//             title: "Permission Denied",
//             description: "Please allow notifications in browser settings.",
//           })
//         }
//       })
//     } else if (Notification.permission === "granted") {
//       showNotification()
//     } else {
//       toast({
//         title: "Blocked",
//         description: "Notifications are blocked in your browser.",
//       })
//     }
//   }

//   const showNotification = () => {
//     try {
//       new Notification("📢 Student App", {
//         body: "✅ Test notification sent successfully!",
//         icon: "/icon-192x192.png",
//         badge: "/icon-192x192.png",
//         // Do not use vibrate directly here to avoid issues on iOS
//       })

//       // Vibrate separately if supported (for mobile only)
//       if ("vibrate" in navigator) {
//         navigator.vibrate([100, 50, 100])
//       }
//     } catch (error) {
//       toast({
//         title: "Notification Error",
//         description: "Something went wrong while sending the notification.",
//       })
//     }
//   }

//   return (
//     <NotificationContext.Provider value={{ sendTestNotification }}>
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
 

// --------------------------------------------------------------second commmit-----------------------------------------------------------------------------------


"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface NotificationContextType {
  sendTestNotification: () => void;
  // If you implement server-sent push later, you might add:
  // requestPushSubscription: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  // This useEffect focuses solely on service worker registration.
  // We explicitly remove any early notification permission requests here.
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
          // Optional: Check for push manager availability after SW registration
          if ("PushManager" in window) {
            console.log("PushManager is available.");
          } else {
            console.warn("PushManager is NOT available. Push notifications may not work.");
          }
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
          toast({
            title: "Error",
            description: "Failed to register app services. Notifications may not work.",
            variant: "destructive", // Safe variant
          });
        });
    } else {
      console.warn("Service Workers not supported in this browser.");
      toast({
        title: "Browser Compatibility",
        description: "Your browser does not fully support essential app features.",
        variant: "destructive", // Safe variant
      });
    }
  }, []);

  const sendTestNotification = async () => {
    // 1. Check if the Notification API is supported by the browser
    if (!("Notification" in window)) {
      toast({
        title: "Not Supported",
        description: "Notifications are not supported in your current browser.",
        variant: "destructive", // Safe variant
      });
      return;
    }

    // 2. IMPORTANT: Provide guidance for iOS users regarding PWA installation
    // This check helps detect if it's an iOS device AND if it's NOT running in standalone (PWA) mode.
    // Removed !window.MSStream as it's not relevant for iOS detection.
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // window.matchMedia('(display-mode: standalone)') is the modern way.
    // (navigator as any).standalone is for older iOS versions.
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;

    if (isIOS && !isStandalone) {
      toast({
        title: "iOS Device Detected",
        description: "For reliable notifications on iPhone/iPad, please add this app to your Home Screen (via Safari's share button, then 'Add to Home Screen').",
        // This toast stays visible longer to ensure the user reads it
        duration: 9000,
        variant: "default", // Safe variant (changed from "info")
      });
      // We can still try to show a local notification in Safari, but push won't work
      // and the user experience will be better if they install the PWA.
      // You could choose to 'return' here if you want to strictly enforce PWA installation for any notification.
    }

    // 3. Request notification permission if it's 'default' (not yet asked or user dismissed)
    if (Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");
          showLocalNotification();
        } else if (permission === "denied") {
          console.log("Notification permission denied by user.");
          toast({
            title: "Permission Denied",
            description: "You've blocked notifications for this site. Please enable them in your browser settings to receive updates.",
            variant: "destructive", // Safe variant
          });
        } else {
          // This case handles when the user closes the permission prompt without selecting 'Allow' or 'Block'
          console.log("Notification permission request dismissed.");
          toast({
            title: "Permission Required",
            description: "Please allow notifications when prompted to receive test notifications and future updates.",
            variant: "default", // Safe variant
          });
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        toast({
          title: "Error Requesting Permission",
          description: "Could not prompt for notification permission. Please try again.",
          variant: "destructive", // Safe variant
        });
      }
    } else if (Notification.permission === "granted") {
      // Permission already granted, proceed to show notification
      console.log("Notification permission already granted.");
      showLocalNotification();
    } else { // Notification.permission === "denied"
      // Permission is denied/blocked
      console.log("Notifications are already blocked.");
      toast({
        title: "Notifications Blocked",
        description: "Notifications are currently blocked for this site. Please enable them in your browser settings.",
        variant: "destructive", // Safe variant
      });
    }
  };

  // This function is specifically for showing a *local* notification
  // It does not involve the Service Worker's 'push' event.
  const showLocalNotification = () => {
    try {
      new Notification("📢 Student App", {
        body: "✅ Test notification sent successfully! (Local Notification)",
        icon: "/icon-192x192.png", // Ensure this path is correct and icon exists
        badge: "/icon-192x192.png", // Badge icon, typically for mobile
      });

      // Trigger vibration separately if supported by the device and browser
      if ("vibrate" in navigator) {
        // Vibrate for 100ms, pause 50ms, vibrate 100ms
        navigator.vibrate([100, 50, 100]);
        console.log("Device vibrating...");
      }

      toast({
        title: "Test Notification Sent",
        description: "A test notification should have appeared on your screen.",
        variant: "default", // Safe variant (changed from "success")
      });
    } catch (error) {
      console.error("Error trying to show local notification:", error);
      toast({
        title: "Notification Display Error",
        description: "Failed to display the test notification. Check console for details.",
        variant: "destructive", // Safe variant
      });
    }
  };

  // --- Optional: Function for real server-sent push notification subscription ---
  // If you plan to implement actual push notifications from a backend,
  // uncomment and complete this function.
  /*
  const requestPushSubscription = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      toast({
        title: "Push Not Supported",
        description: "Push notifications are not fully supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    if (Notification.permission !== "granted") {
      toast({
        title: "Permission Needed",
        description: "Please enable notifications first via the test button or browser settings.",
        variant: "default", // Safe variant (changed from "warning")
      });
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      // Replace with your actual VAPID public key from your backend
      const applicationServerKey = "YOUR_VAPID_PUBLIC_KEY_HERE_FROM_SERVER";
      const convertedVapidKey = urlBase64ToUint8Array(applicationServerKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      console.log("Push Subscription Object:", subscription);
      // TODO: Send this 'subscription' object to your backend server
      // Your backend will then use this to send push messages.
      // Example:
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(subscription),
      // });

      toast({
        title: "Subscribed!",
        description: "You are now ready to receive server-sent push notifications.",
        variant: "default", // Safe variant (changed from "success")
      });
    } catch (error: any) {
      console.error("Error subscribing to push notifications:", error);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        toast({
          title: "Permission Denied",
          description: "Push notification permission was denied or blocked.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription Error",
          description: `Failed to subscribe for push: ${error.message || 'Unknown error'}`,
          variant: "destructive",
        });
      }
    }
  };

  // Helper function to convert VAPID key (from web-push library)
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  */

  return (
    <NotificationContext.Provider value={{ sendTestNotification /*, requestPushSubscription */ }}>
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