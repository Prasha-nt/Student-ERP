"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, BookOpen, Clock, ImageIcon, CreditCard, HelpCircle, User, TrendingUp, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useNotification } from "@/components/notification-provider"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sidebarLinks = [
  { name: "Notices", icon: Bell, href: "/notices" },
  { name: "Attendance", icon: TrendingUp, href: "/attendance" },
  { name: "Homework", icon: BookOpen, href: "/homework" },
  { name: "Timetable", icon: Clock, href: "/timetable" },
  { name: "Media", icon: ImageIcon, href: "/media" },
  { name: "Fees", icon: CreditCard, href: "/fees" },
  { name: "Support", icon: HelpCircle, href: "/support" },
  { name: "Profile", icon: User, href: "/profile" },
]

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const { sendTestNotification } = useNotification()

  const handleTestNotification = () => {
    sendTestNotification()
    onOpenChange(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 h-full w-72 glass-dark z-50 shadow-2xl"
            style={{
              left: `max(calc(50vw - 214px), 0px)`,
            }}
          >
            <div className="flex flex-col h-full bg-gradient-to-b from-white/10 via-blue-50/10 to-indigo-100/10 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-700/90 backdrop-blur-xl">
              <motion.div
                className="flex items-center justify-between p-4 border-b border-white/20 dark:border-gray-700/50 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-lg font-semibold text-white">Student App</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>

              <div className="flex-1 py-4 overflow-y-auto">
                <nav className="space-y-2 px-4">
                  {sidebarLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => onOpenChange(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl glass hover:bg-gradient-to-r hover:from-blue-100/20 hover:to-purple-100/20 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200 group border border-white/10"
                      >
                        <motion.div
                          className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white group-hover:scale-110 transition-transform duration-200 shadow-lg"
                          whileHover={{ rotate: 5 }}
                        >
                          <link.icon className="h-4 w-4" />
                        </motion.div>
                        <span className="text-gray-900 dark:text-white font-medium">{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="px-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleTestNotification}
                    className="w-full flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 glass border border-white/20"
                  >
                    <TestTube className="h-4 w-4" />
                    <span>Test Notification</span>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="p-4 border-t border-white/20 dark:border-gray-700/50 glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
