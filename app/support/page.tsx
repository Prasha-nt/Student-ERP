"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { HelpCircle, Phone, Mail, MessageCircle, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const supportTickets = [
  {
    id: 1,
    title: "Login Issues",
    description: "Unable to access student portal",
    status: "resolved",
    date: "2024-03-10",
    priority: "high",
  },
  {
    id: 2,
    title: "Fee Payment Problem",
    description: "Payment gateway not working",
    status: "in-progress",
    date: "2024-03-12",
    priority: "medium",
  },
  {
    id: 3,
    title: "Timetable Update Request",
    description: "Need updated class schedule",
    status: "pending",
    date: "2024-03-14",
    priority: "low",
  },
]

const contactInfo = [
  {
    type: "Phone",
    value: "+91 98765 43210",
    icon: Phone,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  },
  {
    type: "Email",
    value: "support@studentapp.edu",
    icon: Mail,
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
  },
  {
    type: "Live Chat",
    value: "Available 9 AM - 6 PM",
    icon: MessageCircle,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  },
]

export default function SupportPage() {
  return (
    <div className="scrollable-page bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Support" subtitle="Get help when you need it" />

      <div className="flex-1 px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-4 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover-lift"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full ${contact.color}`}>
                  <contact.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{contact.type}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-4 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover-lift"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Submit a Ticket</h3>

          <div className="space-y-4">
            <Input placeholder="Subject" />
            <Textarea placeholder="Describe your issue..." rows={4} />
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Submit Ticket</Button>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Tickets</h3>

          {supportTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-4 shadow-xl border border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover-lift"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      ticket.status === "resolved"
                        ? "bg-green-100 dark:bg-green-900"
                        : ticket.status === "in-progress"
                          ? "bg-yellow-100 dark:bg-yellow-900"
                          : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {ticket.status === "resolved" ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : ticket.status === "in-progress" ? (
                      <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    ) : (
                      <HelpCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{ticket.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === "resolved"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : ticket.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {ticket.status.replace("-", " ")}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ticket.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
