"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface NotificationContextType {
  sendTestNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  // This useEffect focuses solely on service worker registration.
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration)
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
          toast({
            title: "Error",
            description: "Failed to register app services. App may not work offline.",
            variant: "destructive",
          })
        })
    } else {
      console.warn("Service Workers not supported in this browser.")
      toast({
        title: "Browser Compatibility",
        description: "Your browser does not fully support essential app features.",
        variant: "destructive",
      })
    }
  }, []);

  const sendTestNotification = async () => {
    // 1. Check if the Notification API is supported by the browser
    if (!("Notification" in window)) {
      toast({
        title: "Not Supported",
        description: "Notifications are not supported in your current browser.",
        variant: "destructive",
      });
      return;
    }

    // 2. Provide guidance for iOS users regarding PWA installation
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;

    if (isIOS && !isStandalone) {
      toast({
        title: "iOS Device Detected",
        description: "For notifications and full app experience, please add this app to your Home Screen.",
        duration: 9000,
      });
    }

    // 3. Request permission if needed
    if (Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");
          showLocalNotification();
        } else {
          console.log("Notification permission denied or dismissed.");
          toast({
            title: "Permission Denied",
            description: "You must grant permission to receive notifications.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        toast({
          title: "Error Requesting Permission",
          description: "Could not prompt for notification permission. Please try again.",
          variant: "destructive",
        });
      }
    } else if (Notification.permission === "granted") {
      // Permission already granted, proceed
      console.log("Notification permission already granted.");
      showLocalNotification();
    } else { // Notification.permission === "denied"
      // Permission is denied/blocked
      console.log("Notifications are already blocked.");
      toast({
        title: "Notifications Blocked",
        description: "Notifications are currently blocked. Please enable them in your browser settings.",
        variant: "destructive",
      });
    }
  };

  // This function shows a local notification directly from the app's main thread.
  // This is the ONLY type of notification you can show without a backend.
  // It will only work if the PWA or browser tab is active.
  const showLocalNotification = () => {
    try {
      new Notification("📢 Student App", {
        body: "✅ Test notification sent successfully!",
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        // vibrate: [100, 50, 100] // Note: This option is a hint, browser behavior may vary
      });

      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
        console.log("Device vibrating...");
      }

      toast({
        title: "Test Notification Sent",
        description: "A test notification should have appeared on your screen.",
      });
    } catch (error) {
      console.error("Error trying to show local notification:", error);
      toast({
        title: "Notification Display Error",
        description: "Failed to display the test notification. Check console for details.",
        variant: "destructive",
      });
    }
  };

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