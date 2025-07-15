"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FloatingSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")

  const searchResults = [
    "Notices",
    "Attendance",
    "Homework",
    "Timetable",
    "Media",
    "Fees",
    "Support",
    "Profile",
  ].filter((item) => item.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      {/* Search Button - positioned relative to mobile container */}
      <motion.div
        className="fixed z-30"
        style={{
          right: `max(calc(50vw - 214px + 1rem), 1rem)`, // Position relative to mobile container with margin
          bottom: "5rem",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transition-all duration-300 glass border border-white/20"
          size="icon"
        >
          <Search className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Modal - positioned at upper middle center of mobile container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="fixed z-50 glass rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-4 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90"
              style={{
                top: "15%",
                left: "5%",
                transform: "translateX(-50%)",
                width: "min(85%, 300px)",
                maxWidth: "300px",
              }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                  <Search className="h-4 w-4 text-white" />
                </div>
                <Input
                  placeholder="Search sections..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-none focus:ring-0 text-base bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Button>
              </div>

              {query && (
                <motion.div
                  className="space-y-2 max-h-60 overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 glass hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 rounded-lg cursor-pointer transition-all duration-200 border border-white/20 dark:border-gray-600/20 bg-white/50 dark:bg-gray-700/50"
                      onClick={() => {
                        setIsOpen(false)
                        setQuery("")
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <span className="text-gray-900 dark:text-white font-medium">{result}</span>
                    </motion.div>
                  ))}

                  {searchResults.length === 0 && (
                    <div className="p-3 text-center text-gray-500 dark:text-gray-400">No results found</div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
