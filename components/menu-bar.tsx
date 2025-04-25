"use client"
import React from "react"
import { motion } from "framer-motion"

interface MenuItem {
  label: string
  href: string
  gradient: string
  textColor: string
}

const menuItems: MenuItem[] = [
  {
    label: "PROJECTS",
    href: "#projects",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    textColor: "text-blue-500",
  },
  {
    label: "ABOUT ME",
    href: "#about",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    textColor: "text-blue-500",
  },
  {
    label: "PASSIONS",
    href: "#passions",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    textColor: "text-blue-500",
  },
  {
    label: "RESUME",
    href: "#resume",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    textColor: "text-blue-500",
  },
]

// Removed itemVariants and backVariants as they were for the flip animation

const glowVariants = {
  initial: { opacity: 0, scale: 1.3 },
  hover: {
    opacity: 1,
    scale: 1.8,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// Simple hover effect for menu items
const menuItemVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export function MenuBar() {
  return (
    <motion.nav
      className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg flex items-center justify-between w-full max-w-5xl mx-auto relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      {/* Left: Logo and Brand */}
      <div className="flex items-center gap-2 ml-2">
        <div className="w-5 h-5 bg-white rounded-sm border border-black" />
        <span className="font-medium text-base tracking-wide">JMM LABS</span>
      </div>
      {/* Center: Nav Items */}
      <ul className="flex items-center gap-8 relative z-10">
        {menuItems.map((item) => (
          <motion.li key={item.label} className="relative overflow-hidden rounded-xl">
            <motion.div
              className="block rounded-xl overflow-visible group relative"
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none rounded-xl overflow-hidden"
                variants={glowVariants}
                style={{
                  background: item.gradient,
                  opacity: 0,
                }}
              />
              <motion.a
                href={item.href}
                className="flex items-center justify-center px-2 py-2 relative z-10 bg-transparent text-muted-foreground group-hover:text-foreground transition-colors rounded-xl"
                variants={menuItemVariants}
              >
                <span className={`transition-colors duration-300 group-hover:${item.textColor} font-medium`}>
                  {item.label}
                </span>
              </motion.a>
            </motion.div>
          </motion.li>
        ))}
      </ul>
      {/* Right: Contact Me Button */}
      <a
        href="#contact"
        className="px-4 py-2 bg-white text-black border border-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors mr-2"
      >
        CONTACT ME
      </a>
    </motion.nav>
  )
}
