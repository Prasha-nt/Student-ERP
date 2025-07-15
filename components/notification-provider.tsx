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

"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface NotificationContextType {
  sendTestNotification: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration)
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error)
        })
    }

    // Request notification permission if not already granted
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  const sendTestNotification = () => {
    if (!("Notification" in window)) {
      toast({
        title: "Not Supported",
        description: "Notifications are not supported in this browser.",
      })
      return
    }

    // Request permission if not yet decided
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification()
        } else {
          toast({
            title: "Permission Denied",
            description: "Please allow notifications in browser settings.",
          })
        }
      })
    } else if (Notification.permission === "granted") {
      showNotification()
    } else {
      toast({
        title: "Blocked",
        description: "Notifications are blocked in your browser.",
      })
    }
  }

  const showNotification = () => {
    try {
      new Notification("📢 Student App", {
        body: "✅ Test notification sent successfully!",
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        // Do not use vibrate directly here to avoid issues on iOS
      })

      // Vibrate separately if supported (for mobile only)
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100])
      }
    } catch (error) {
      toast({
        title: "Notification Error",
        description: "Something went wrong while sending the notification.",
      })
    }
  }

  return (
    <NotificationContext.Provider value={{ sendTestNotification }}>
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
