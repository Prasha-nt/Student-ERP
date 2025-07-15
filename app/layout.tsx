import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "@/components/notification-provider"
import { PWAProvider } from "@/components/pwa-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Student App",
  description: "A comprehensive student management app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Student App",
  },
  icons: {
    apple: "/icon-192x192.png",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Student App" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NotificationProvider>
            <PWAProvider>
              <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
                <div
                  id="mobile-container"
                  className="w-full max-w-sm bg-white dark:bg-gray-950 shadow-lg border-x border-gray-200 dark:border-gray-800 relative min-h-screen overflow-hidden"
                >
                  {children}
                </div>
              </div>
              <Toaster />
            </PWAProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
