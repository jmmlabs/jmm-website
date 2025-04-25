"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { HiMenu, HiX } from "react-icons/hi"

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
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <motion.nav
      className="h-12 sm:h-14 md:h-16 p-1 sm:p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg flex items-center justify-between gap-x-1 sm:gap-x-2 md:gap-x-4 lg:gap-x-8 w-full max-w-5xl mx-auto relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      {/* Left: Logo and Brand */}
      <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2">
        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white rounded-sm border border-black" />
        <span className="font-medium text-xs sm:text-sm md:text-base lg:text-lg tracking-wide whitespace-nowrap truncate">JMM LABS</span>
      </div>
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileOpen((o) => !o)}
        style={{ minHeight: '2rem', minWidth: '2rem' }}
      >
        {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
      </button>
      {/* Center: Nav Items */}
      <ul className="hidden sm:flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-8 relative z-10 h-full">
        {menuItems.map((item) => (
          <motion.li key={item.label} className="relative overflow-hidden rounded-xl h-full flex items-center">
            <motion.div
              className="block rounded-xl overflow-visible group relative h-full flex items-center"
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
                className="flex items-center justify-center px-1 sm:px-2 py-1 sm:py-2 relative z-10 bg-transparent text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground group-hover:text-foreground transition-colors rounded-xl whitespace-nowrap truncate h-full"
                variants={menuItemVariants}
                style={{ minWidth: '3.5rem', minHeight: '2rem' }}
              >
                <span className={`transition-colors duration-300 group-hover:${item.textColor} font-medium whitespace-nowrap truncate`}>
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
        className="hidden sm:flex items-center justify-center px-1 sm:px-2 py-0.5 sm:py-1.5 bg-white text-black border border-black rounded-lg font-medium text-[9px] xs:text-xs sm:text-sm md:text-base lg:text-lg hover:bg-gray-100 transition-colors whitespace-nowrap truncate h-full min-w-[3.2rem] min-h-[1.75rem] shadow-sm"
        style={{ lineHeight: 1 }}
      >
        CONTACT ME
      </a>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-end sm:hidden">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-4/5 max-w-xs h-full bg-background shadow-xl p-6 flex flex-col gap-6 animate-slide-in-right">
            <button
              className="self-end mb-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <HiX className="w-7 h-7" />
            </button>
            <nav className="flex flex-col gap-4 mt-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-2 py-3 rounded-xl text-xs sm:text-sm text-muted-foreground hover:text-blue-500 font-medium transition-colors whitespace-nowrap truncate"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-4 px-3 py-2 bg-white text-black border border-black rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-100 transition-colors whitespace-nowrap truncate"
                onClick={() => setMobileOpen(false)}
              >
                CONTACT ME
              </a>
            </nav>
          </div>
        </div>
      )}
    </motion.nav>
  )
}
