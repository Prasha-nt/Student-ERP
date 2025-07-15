"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const timetableData = {
  Monday: [
    { time: "9:00 - 10:00", subject: "Mathematics", room: "Room 101", teacher: "Dr. Smith" },
    { time: "10:00 - 11:00", subject: "Physics", room: "Lab 1", teacher: "Prof. Johnson" },
    { time: "11:30 - 12:30", subject: "Chemistry", room: "Lab 2", teacher: "Dr. Brown" },
    { time: "1:30 - 2:30", subject: "English", room: "Room 205", teacher: "Ms. Davis" },
  ],
  Tuesday: [
    { time: "9:00 - 10:00", subject: "Computer Science", room: "Lab 3", teacher: "Mr. Wilson" },
    { time: "10:00 - 11:00", subject: "Mathematics", room: "Room 101", teacher: "Dr. Smith" },
    { time: "11:30 - 12:30", subject: "Physics", room: "Lab 1", teacher: "Prof. Johnson" },
    { time: "1:30 - 2:30", subject: "Chemistry", room: "Lab 2", teacher: "Dr. Brown" },
  ],
  Wednesday: [
    { time: "9:00 - 10:00", subject: "English", room: "Room 205", teacher: "Ms. Davis" },
    { time: "10:00 - 11:00", subject: "Computer Science", room: "Lab 3", teacher: "Mr. Wilson" },
    { time: "11:30 - 12:30", subject: "Mathematics", room: "Room 101", teacher: "Dr. Smith" },
    { time: "1:30 - 2:30", subject: "Physics", room: "Lab 1", teacher: "Prof. Johnson" },
  ],
  Thursday: [
    { time: "9:00 - 10:00", subject: "Chemistry", room: "Lab 2", teacher: "Dr. Brown" },
    { time: "10:00 - 11:00", subject: "English", room: "Room 205", teacher: "Ms. Davis" },
    { time: "11:30 - 12:30", subject: "Computer Science", room: "Lab 3", teacher: "Mr. Wilson" },
    { time: "1:30 - 2:30", subject: "Mathematics", room: "Room 101", teacher: "Dr. Smith" },
  ],
  Friday: [
    { time: "9:00 - 10:00", subject: "Physics", room: "Lab 1", teacher: "Prof. Johnson" },
    { time: "10:00 - 11:00", subject: "Chemistry", room: "Lab 2", teacher: "Dr. Brown" },
    { time: "11:30 - 12:30", subject: "English", room: "Room 205", teacher: "Ms. Davis" },
    { time: "1:30 - 2:30", subject: "Computer Science", room: "Lab 3", teacher: "Mr. Wilson" },
  ],
  Saturday: [
    { time: "9:00 - 10:00", subject: "Mathematics", room: "Room 101", teacher: "Dr. Smith" },
    { time: "10:00 - 11:00", subject: "Physics", room: "Lab 1", teacher: "Prof. Johnson" },
  ],
  Sunday: [{ time: "Rest Day", subject: "No Classes", room: "", teacher: "" }],
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const subjectColors = {
  Mathematics: "from-blue-500 to-blue-600",
  Physics: "from-green-500 to-green-600",
  Chemistry: "from-purple-500 to-purple-600",
  English: "from-orange-500 to-orange-600",
  "Computer Science": "from-red-500 to-red-600",
  "No Classes": "from-gray-400 to-gray-500",
}

export default function TimetablePage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const [selectedDay, setSelectedDay] = useState(today)

  return (
    <div className="scrollable-page bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Timetable" subtitle="Your weekly class schedule" />

      <div className="flex-1 px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Day</h3>

          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <Button
                key={day}
                onClick={() => setSelectedDay(day)}
                variant={selectedDay === day ? "default" : "outline"}
                size="sm"
                className={`${
                  selectedDay === day
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    : "glass border-white/20 hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-100 dark:hover:from-orange-900/20 dark:hover:to-amber-900/20"
                } transition-all duration-200`}
              >
                {day.slice(0, 3)}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`glass rounded-2xl p-4 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl ${
            selectedDay === today ? "ring-2 ring-orange-300 dark:ring-orange-700" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedDay}</h3>
            {selectedDay === today && (
              <span className="text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full font-medium shadow-lg">
                Today
              </span>
            )}
          </div>

          <div className="space-y-3">
            {timetableData[selectedDay as keyof typeof timetableData].map((classItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 glass rounded-xl border border-white/20 bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm hover-lift"
              >
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 min-w-[80px]">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{classItem.time}</span>
                </div>

                <div className="flex-1">
                  {classItem.subject !== "No Classes" ? (
                    <>
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium text-white bg-gradient-to-r ${
                            subjectColors[classItem.subject as keyof typeof subjectColors]
                          } shadow-lg`}
                        >
                          {classItem.subject}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{classItem.room}</span>
                        </div>
                        <span>{classItem.teacher}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <span className="text-lg font-medium text-gray-500 dark:text-gray-400">🎉 No Classes Today!</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
