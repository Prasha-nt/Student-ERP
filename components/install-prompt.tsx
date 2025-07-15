"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, X, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Show install prompt for iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches

    if (isIOS && !isStandalone) {
      setTimeout(() => setShowPrompt(true), 3000)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // For iOS, show instructions
      alert('To install this app on iOS:\n1. Tap the Share button\n2. Tap "Add to Home Screen"')
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-4 left-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-2xl border border-white/20 p-4 z-50 backdrop-blur-lg"
          style={{ maxWidth: "calc(100vw - 2rem)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="bg-white/20 rounded-full p-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Smartphone className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-white">Install Student App</h3>
                <p className="text-sm text-white/80">Add to home screen for quick access</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Install
                </Button>
              </motion.div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPrompt(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
