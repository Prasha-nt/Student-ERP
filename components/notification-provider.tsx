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
    // Register service worker for notifications
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission()
    }
  }, [])

  const sendTestNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Student App", {
        body: "Test notification sent successfully!",
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
      })
    } else {
      toast({
        title: "Test Notification",
        description: "Notification sent successfully!",
      })
    }
  }

  return <NotificationContext.Provider value={{ sendTestNotification }}>{children}</NotificationContext.Provider>
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
