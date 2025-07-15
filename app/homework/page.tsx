"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { BookOpen, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const homeworkList = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Solve Quadratic Equations",
    description: "Complete exercises 1-15 from chapter 4",
    dueDate: "2024-03-18",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    subject: "Physics",
    title: "Lab Report - Pendulum Experiment",
    description: "Write a detailed report on the pendulum experiment conducted in class",
    dueDate: "2024-03-20",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 3,
    subject: "Chemistry",
    title: "Organic Chemistry Problems",
    description: "Solve problems related to organic reactions",
    dueDate: "2024-03-16",
    status: "completed",
    priority: "low",
  },
  {
    id: 4,
    subject: "English",
    title: "Essay on Climate Change",
    description: "Write a 500-word essay on the impact of climate change",
    dueDate: "2024-03-22",
    status: "pending",
    priority: "medium",
  },
]

export default function HomeworkPage() {
  const pendingCount = homeworkList.filter((hw) => hw.status === "pending").length
  const completedCount = homeworkList.filter((hw) => hw.status === "completed").length

  return (
    <div className="scrollable-page bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Homework" subtitle="Manage your assignments" />

      <div className="flex-1 px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-4 text-white shadow-xl border border-white/20 bg-gradient-to-r from-purple-500/80 to-purple-600/80 backdrop-blur-xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-4 text-white shadow-xl border border-white/20 bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold">{completedCount}</p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {homeworkList.map((homework, index) => (
            <motion.div
              key={homework.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl p-4 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover-lift ${
                homework.status === "completed"
                  ? "opacity-75"
                  : homework.priority === "high"
                    ? "ring-2 ring-red-200 dark:ring-red-800"
                    : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      homework.status === "completed"
                        ? "bg-green-100 dark:bg-green-900"
                        : homework.status === "in-progress"
                          ? "bg-yellow-100 dark:bg-yellow-900"
                          : "bg-purple-100 dark:bg-purple-900"
                    }`}
                  >
                    <BookOpen
                      className={`h-4 w-4 ${
                        homework.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : homework.status === "in-progress"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-purple-600 dark:text-purple-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{homework.subject}</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{homework.title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{homework.dueDate}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{homework.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    homework.status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : homework.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {homework.status.replace("-", " ")}
                </span>

                {homework.status !== "completed" && (
                  <Button size="sm" variant="outline">
                    Mark Complete
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
