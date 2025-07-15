"use client"

import { Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-20 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-indigo-500/90 backdrop-blur-xl border-b border-white/20 shadow-lg animate-gradient"
    >
      <div className="flex items-center justify-between p-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-white hover:bg-white/20 transition-all duration-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          className="flex items-center space-x-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <ThemeToggle />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 transition-all duration-200">
              <Bell className="h-5 w-5" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 transition-all duration-200">
              <User className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  )
}
