"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Bell, Clock, Pin } from "lucide-react"

const notices = [
  {
    id: 1,
    title: "Mid-term Examination Schedule Released",
    content:
      "The mid-term examination schedule for all classes has been released. Please check your timetable section for detailed information.",
    date: "2 hours ago",
    priority: "high",
    pinned: true,
  },
  {
    id: 2,
    title: "Library Timing Changes",
    content:
      "Library will remain open until 8 PM starting from next week. New study rooms are also available for booking.",
    date: "1 day ago",
    priority: "medium",
    pinned: false,
  },
  {
    id: 3,
    title: "Sports Day Registration Open",
    content: "Registration for annual sports day is now open. Last date for registration is 25th March.",
    date: "2 days ago",
    priority: "low",
    pinned: false,
  },
  {
    id: 4,
    title: "Holiday Notice",
    content: "College will remain closed on 15th March due to Holi festival.",
    date: "3 days ago",
    priority: "medium",
    pinned: false,
  },
]

export default function NoticesPage() {
  return (
    <div className="scrollable-page bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Notices" subtitle="Stay updated with latest announcements" />

      <div className="flex-1 px-4 py-6 space-y-4">
        {notices.map((notice, index) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass rounded-2xl p-4 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover-lift ${
              notice.priority === "high" ? "ring-2 ring-red-200 dark:ring-red-800" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {notice.pinned && <Pin className="h-4 w-4 text-blue-500" />}
                <div
                  className={`p-2 rounded-full ${
                    notice.priority === "high"
                      ? "bg-red-100 dark:bg-red-900"
                      : notice.priority === "medium"
                        ? "bg-yellow-100 dark:bg-yellow-900"
                        : "bg-green-100 dark:bg-green-900"
                  }`}
                >
                  <Bell
                    className={`h-4 w-4 ${
                      notice.priority === "high"
                        ? "text-red-600 dark:text-red-400"
                        : notice.priority === "medium"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{notice.date}</span>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{notice.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{notice.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
