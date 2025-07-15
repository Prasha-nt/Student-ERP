"use client"

import { motion } from "framer-motion"
import { Bell, BookOpen, Clock, ImageIcon, CreditCard, HelpCircle, User, TrendingUp } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  {
    name: "Notices",
    icon: Bell,
    href: "/notices",
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
  },
  {
    name: "Attendance",
    icon: TrendingUp,
    href: "/attendance",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    bgGradient: "from-green-50 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20",
  },
  {
    name: "Homework",
    icon: BookOpen,
    href: "/homework",
    gradient: "from-purple-500 via-violet-600 to-purple-600",
    bgGradient: "from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
  },
  {
    name: "Timetable",
    icon: Clock,
    href: "/timetable",
    gradient: "from-orange-500 via-amber-600 to-yellow-600",
    bgGradient: "from-orange-50 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20",
  },
  {
    name: "Media",
    icon: ImageIcon,
    href: "/media",
    gradient: "from-pink-500 via-rose-600 to-red-600",
    bgGradient: "from-pink-50 to-red-100 dark:from-pink-900/20 dark:to-red-900/20",
  },
  {
    name: "Fees",
    icon: CreditCard,
    href: "/fees",
    gradient: "from-red-500 via-pink-600 to-rose-600",
    bgGradient: "from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20",
  },
  {
    name: "Support",
    icon: HelpCircle,
    href: "/support",
    gradient: "from-yellow-500 via-orange-600 to-amber-600",
    bgGradient: "from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20",
  },
  {
    name: "Profile",
    icon: User,
    href: "/profile",
    gradient: "from-indigo-500 via-purple-600 to-blue-600",
    bgGradient: "from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20",
  },
]

export function QuickLinks() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>

      <div className="grid grid-cols-2 gap-4">
        {quickLinks.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="hover-lift"
          >
            <Link href={link.href}>
              <div
                className={`bg-gradient-to-br ${link.bgGradient} glass rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`bg-gradient-to-r ${link.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <link.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{link.name}</h4>
                <div className="mt-2 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 rounded-full opacity-50"></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
