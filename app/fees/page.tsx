"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { CreditCard, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const feeStructure = [
  { category: "Tuition Fee", amount: 15000, paid: true },
  { category: "Library Fee", amount: 500, paid: true },
  { category: "Lab Fee", amount: 2000, paid: false },
  { category: "Sports Fee", amount: 300, paid: true },
  { category: "Exam Fee", amount: 800, paid: false },
]

const paymentHistory = [
  {
    id: 1,
    description: "Tuition Fee - Semester 1",
    amount: 15000,
    date: "2024-02-15",
    status: "paid",
    method: "Online Banking",
  },
  {
    id: 2,
    description: "Library Fee",
    amount: 500,
    date: "2024-02-10",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: 3,
    description: "Sports Fee",
    amount: 300,
    date: "2024-02-08",
    status: "paid",
    method: "UPI",
  },
]

export default function FeesPage() {
  const totalFees = feeStructure.reduce((acc, fee) => acc + fee.amount, 0)
  const paidFees = feeStructure.filter((fee) => fee.paid).reduce((acc, fee) => acc + fee.amount, 0)
  const pendingFees = totalFees - paidFees

  return (
    <div className="scrollable-page bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Fees" subtitle="Manage your fee payments" />

      <div className="flex-1 px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-4 text-white shadow-xl border border-white/20 bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Paid</span>
            </div>
            <p className="text-2xl font-bold">₹{paidFees.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-4 text-white shadow-xl border border-white/20 bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-xl"
          >
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold">₹{pendingFees.toLocaleString()}</p>
          </motion.div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fee Structure</h3>

          {feeStructure.map((fee, index) => (
            <motion.div
              key={fee.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl p-4 shadow-sm border ${
                fee.paid ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"
              } bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      fee.paid ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {fee.paid ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{fee.category}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">₹{fee.amount.toLocaleString()}</p>
                  </div>
                </div>

                {!fee.paid && (
                  <Button size="sm" className="bg-red-500 hover:bg-red-600">
                    Pay Now
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment History</h3>

          {paymentHistory.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{payment.description}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{payment.method}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">₹{payment.amount.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{payment.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
