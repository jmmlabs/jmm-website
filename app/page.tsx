"use client"
import React from "react"
import Image from "next/image"
import { MenuBar } from "@/components/menu-bar"
import { motion } from "framer-motion"

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-4">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-center mt-6 mb-12">
          <MenuBar />
        </div>
        <main className="flex flex-col items-center w-full mt-16">
          <h1 className="text-9xl font-extrabold tracking-tight mb-14 text-center">JACOB MEYER</h1>
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-muted flex items-center justify-center mb-8" style={{ width: 320, height: 320 }}>
              <Image
                src="/placeholder-user.jpg"
                alt="Jacob Meyer profile"
                width={280}
                height={280}
                className="rounded-full object-cover border-8 border-muted shadow-2xl"
                priority
              />
            </div>
            <p className="text-2xl text-muted-foreground text-center max-w-2xl mb-16">DESCRIPTION TEXT PARAGRAPH GOES HERE</p>
          </div>
        </main>
        <div className="absolute bottom-8 left-0 w-full flex flex-col items-center">
          <span className="text-lg text-muted-foreground mb-6">SCROLL TO SEE MORE</span>
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" className="text-muted" />
              <polyline points="16,22 24,30 32,22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
