"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-white hover:bg-white/20 transition-all duration-200 relative overflow-hidden"
    >
      <motion.div className="relative" whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-0 left-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
