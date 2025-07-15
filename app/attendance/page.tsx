"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { TrendingUp, Calendar, CheckCircle, XCircle } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const attendanceData = [
  { subject: "Mathematics", present: 18, total: 20, percentage: 90 },
  { subject: "Physics", present: 16, total: 18, percentage: 89 },
  { subject: "Chemistry", present: 19, total: 22, percentage: 86 },
  { subject: "English", present: 20, total: 21, percentage: 95 },
  { subject: "Computer Science", present: 17, total: 19, percentage: 89 },
]

const trendData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 89 },
  { month: "May", attendance: 94 },
  { month: "Jun", attendance: 91 },
]

const recentAttendance = [
  { date: "2024-03-15", subject: "Mathematics", status: "present" },
  { date: "2024-03-15", subject: "Physics", status: "present" },
  { date: "2024-03-14", subject: "Chemistry", status: "absent" },
  { date: "2024-03-14", subject: "English", status: "present" },
  { date: "2024-03-13", subject: "Computer Science", status: "present" },
]

export default function AttendancePage() {
  const overallPercentage = Math.round(
    attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length,
  )

  return (
    <div className="scrollable-page bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Attendance" subtitle="Track your class attendance" />

      <div className="flex-1 px-4 py-6 space-y-6">
        {/* ✅ Overall Attendance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 shadow-xl border border-white/20 bg-gradient-to-r from-green-500/90 to-green-600/90 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
    <TrendingUp className="h-6 w-6 text-gray-900 dark:text-white" />
    <span className="font-medium text-gray-900 dark:text-white">Overall Attendance</span>
  </div>
  <Calendar className="h-5 w-5 text-gray-700 dark:text-white opacity-80" />
</div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{overallPercentage}%</h2>
              <p className="text-gray-800 dark:text-white opacity-90">This semester</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">90/100</p>
              <p className="text-sm text-gray-700 dark:text-white opacity-80">Classes attended</p>
            </div>
          </div>
        </motion.div>

        {/* Attendance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance Trends</h3>

          <div className="w-full h-[200px] overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="month" stroke="rgba(0,0,0,0.6)" tick={{ fontSize: 12 }} tickMargin={5} />
                <YAxis stroke="rgba(0,0,0,0.6)" tick={{ fontSize: 12 }} domain={[0, 100]} tickCount={6} />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                  name="Attendance %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject-wise Attendance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subject-wise Attendance</h3>

          {attendanceData.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-4 shadow-lg border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover-lift"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{subject.subject}</h4>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    subject.percentage >= 90
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      : subject.percentage >= 75
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                  }`}
                >
                  {subject.percentage}%
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  {subject.present}/{subject.total} classes
                </span>
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      subject.percentage >= 90
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : subject.percentage >= 75
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          : "bg-gradient-to-r from-red-400 to-red-600"
                    }`}
                    style={{ width: `${subject.percentage}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Attendance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Attendance</h3>

          {recentAttendance.map((record, index) => (
            <motion.div
              key={`${record.date}-${record.subject}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-3 shadow-lg border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover-lift"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {record.status === "present" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{record.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{record.date}</p>
                  </div>
                </div>

                <span
                  className={`text-sm font-medium capitalize px-3 py-1 rounded-full ${
                    record.status === "present"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                  }`}
                >
                  {record.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
