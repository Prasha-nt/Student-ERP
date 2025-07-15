"use client"

import { motion } from "framer-motion"
import { Bell, Clock } from "lucide-react"

export function NoticeCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 rounded-full p-2">
            <Bell className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Latest Notice</span>
        </div>
        <div className="flex items-center space-x-1 text-sm opacity-90">
          <Clock className="h-3 w-3" />
          <span>2h ago</span>
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-2">Mid-term Examination Schedule Released</h3>
      <p className="text-sm opacity-90 line-clamp-2">
        The mid-term examination schedule for all classes has been released. Please check your timetable section for
        detailed information.
      </p>
    </motion.div>
  )
}
