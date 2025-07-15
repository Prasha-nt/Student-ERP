"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { User, Mail, Phone, Calendar, MapPin, BookOpen, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileData = {
  name: "Prashant Gupta",
  email: "prashant.gupta@student.edu",
  phone: "+91 98765 43210",
  rollNumber: "CS2024001",
  class: "12th Grade - Computer Science",
  dateOfBirth: "2006-05-15",
  address: "123 Student Street, Education City, State 123456",
  parentName: "Rajesh Kumar",
  parentPhone: "+91 98765 43211",
  bloodGroup: "O+",
  emergencyContact: "+91 98765 43212",
}

const academicInfo = [
  { label: "Current Semester", value: "6th Semester" },
  { label: "CGPA", value: "8.5/10" },
  { label: "Attendance", value: "92%" },
  { label: "Admission Year", value: "2022" },
]

export default function ProfilePage() {
  return (
    <div className="scrollable-page bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Profile" subtitle="Manage your account information" />

      <div className="flex-1 px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
              <AvatarFallback className="text-2xl font-semibold bg-indigo-500 text-white">PK</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{profileData.rollNumber}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{profileData.class}</p>
            </div>

            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {academicInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-4 shadow-sm border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl"
            >
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{info.label}</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{info.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 shadow-sm border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.dateOfBirth}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.address}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 shadow-sm border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emergency Contact</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Parent/Guardian</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.parentName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Parent Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.parentPhone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Blood Group</p>
                <p className="font-medium text-gray-900 dark:text-white">{profileData.bloodGroup}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
