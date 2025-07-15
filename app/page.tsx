"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { QuickLinks } from "@/components/quick-links"
import { NoticeCard } from "@/components/notice-card"
import { MobileSidebar } from "@/components/mobile-sidebar"
// import { FloatingSearch } from "@/components/floating-search"
import { InstallPrompt } from "@/components/install-prompt"

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <MobileSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 px-4 py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h2
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              Hello, Prashant! 👋
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back to your student portal
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NoticeCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <QuickLinks />
          </motion.div>
        </div>
      </div>

      {/* <FloatingSearch /> */}
      <InstallPrompt />
    </div>
  )
}
