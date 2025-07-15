"use client"

import { motion } from "framer-motion"
import { TrendingUp, Calendar } from "lucide-react"

export function AttendanceCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 rounded-full p-2">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Attendance</span>
        </div>
        <div className="flex items-center space-x-1 text-sm opacity-90">
          <Calendar className="h-3 w-3" />
          <span>This Month</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold">92%</h3>
          <p className="text-sm opacity-90">Overall Attendance</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">22/24 days</p>
          <p className="text-xs opacity-75">Present</p>
        </div>
      </div>
    </motion.div>
  )
}
