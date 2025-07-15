"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { ImageIcon, Video, FileText, Download, Eye, Play, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const mediaItems = [
  {
    id: 1,
    name: "Physics Lab Manual.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-03-10",
    subject: "Physics",
    thumbnail: "/placeholder.svg?height=80&width=80",
    featured: true,
    views: 245,
  },
  {
    id: 2,
    name: "Chemistry Experiment Video",
    type: "video",
    size: "45.2 MB",
    uploadDate: "2024-03-08",
    subject: "Chemistry",
    thumbnail: "/placeholder.svg?height=80&width=80",
    featured: false,
    views: 189,
    duration: "12:34",
  },
  {
    id: 3,
    name: "Math Formula Sheet",
    type: "image",
    size: "1.8 MB",
    uploadDate: "2024-03-05",
    subject: "Mathematics",
    thumbnail: "/placeholder.svg?height=80&width=80",
    featured: true,
    views: 312,
  },
  {
    id: 4,
    name: "English Literature Notes.pdf",
    type: "pdf",
    size: "3.1 MB",
    uploadDate: "2024-03-03",
    subject: "English",
    thumbnail: "/placeholder.svg?height=80&width=80",
    featured: false,
    views: 156,
  },
  {
    id: 5,
    name: "Programming Tutorial",
    type: "video",
    size: "78.5 MB",
    uploadDate: "2024-03-01",
    subject: "Computer Science",
    thumbnail: "/placeholder.svg?height=80&width=80",
    featured: true,
    views: 423,
    duration: "25:18",
  },
  {
    id: 6,
    name: "History Timeline.jpg",
    type: "image",
    size: "2.2 MB",
    uploadDate: "2024-02-28",
    subject: "History",
    thumbnail: "/placeholder.svg?height=80&width=80",
    featured: false,
    views: 98,
  },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-white" />
    case "video":
      return <Video className="h-5 w-5 text-white" />
    case "image":
      return <ImageIcon className="h-5 w-5 text-white" />
    default:
      return <FileText className="h-5 w-5 text-white" />
  }
}

const getGradientColor = (type: string) => {
  switch (type) {
    case "pdf":
      return "from-red-500 to-red-600"
    case "video":
      return "from-blue-500 to-blue-600"
    case "image":
      return "from-green-500 to-green-600"
    default:
      return "from-gray-500 to-gray-600"
  }
}

const getSubjectColor = (subject: string) => {
  const colors = {
    Physics: "from-purple-500/20 to-indigo-500/20 border-purple-200 dark:border-purple-800",
    Chemistry: "from-orange-500/20 to-red-500/20 border-orange-200 dark:border-orange-800",
    Mathematics: "from-blue-500/20 to-cyan-500/20 border-blue-200 dark:border-blue-800",
    English: "from-pink-500/20 to-rose-500/20 border-pink-200 dark:border-pink-800",
    "Computer Science": "from-emerald-500/20 to-teal-500/20 border-emerald-200 dark:border-emerald-800",
    History: "from-amber-500/20 to-yellow-500/20 border-amber-200 dark:border-amber-800",
  }
  return (
    colors[subject as keyof typeof colors] || "from-gray-500/20 to-gray-600/20 border-gray-200 dark:border-gray-800"
  )
}

export default function MediaPage() {
  const featuredItems = mediaItems.filter((item) => item.featured)
  const regularItems = mediaItems.filter((item) => !item.featured)

  return (
    <div className="scrollable-page bg-gradient-to-br from-pink-50 via-rose-50 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <PageHeader title="Media" subtitle="Access your study materials" />

      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Featured Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Content</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-2xl p-4 shadow-xl border-2 bg-gradient-to-r ${getSubjectColor(item.subject)} backdrop-blur-xl hover-lift relative overflow-hidden`}
              >
                <div className="absolute top-2 right-2">
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Featured</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-lg"
                    />
                    <div
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${getGradientColor(item.type)} flex items-center justify-center shadow-lg`}
                    >
                      {getFileIcon(item.type)}
                    </div>
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-2">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate text-lg">{item.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-full">
                        {item.subject}
                      </span>
                      {item.duration && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.duration}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>{item.size}</span>
                        <span>{item.uploadDate}</span>
                      </div>
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{item.views}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Regular Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Media</h3>

          {regularItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl p-4 shadow-lg border bg-gradient-to-r ${getSubjectColor(item.subject)} backdrop-blur-xl hover-lift`}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover shadow-md"
                  />
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${getGradientColor(item.type)} flex items-center justify-center shadow-md`}
                  >
                    {item.type === "pdf" && <FileText className="h-3 w-3 text-white" />}
                    {item.type === "video" && <Video className="h-3 w-3 text-white" />}
                    {item.type === "image" && <ImageIcon className="h-3 w-3 text-white" />}
                  </div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/40 rounded-full p-1">
                        <Play className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
                      {item.subject}
                    </span>
                    {item.duration && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.duration}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span>{item.size}</span>
                      <span>{item.uploadDate}</span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
