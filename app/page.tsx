"use client"
import React from "react"
import Image from "next/image"
import { MenuBar } from "@/components/menu-bar"
import { motion } from "framer-motion"
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-4 relative">
      <div className="w-full flex flex-col items-center flex-1">
        <div className="w-full flex justify-center mt-6 mb-12">
          <MenuBar />
        </div>
        <main className="flex flex-col items-center w-full mt-8 flex-1">
          <h1 className="text-[clamp(2.2rem,7vw,3.5rem)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-10 text-center leading-tight whitespace-normal break-words max-w-full md:whitespace-nowrap md:break-normal md:max-w-[90vw] xl:max-w-5xl mx-auto">
            JACOB MEYER
          </h1>
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-muted flex items-center justify-center mb-8" style={{ width: 'min(80vw,320px)', height: 'min(80vw,320px)' }}>
              <img
                alt="Jacob Meyer profile, Full Profile Picture"
                width={280}
                height={280}
                decoding="async"
                className="rounded-full object-cover shadow-2xl w-[70vw] max-w-[280px] h-[70vw] max-h-[280px]"
                style={{ color: 'transparent' }}
                src="/fullprofpic.jpg"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-center max-w-2xl mb-8 px-2 sm:px-0 break-words">
              DESCRIPTION TEXT PARAGRAPH GOES HERE
            </p>
            {/* Scroll indicator shown only at the bottom of the first viewport, below the description paragraph */}
            <div className="w-full flex flex-col items-center pt-4 pb-10">
              <span className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-6 select-none">SCROLL TO SEE MORE</span>
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" className="text-muted" />
                  <polyline points="16,22 24,30 32,22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
                </svg>
              </motion.div>
            </div>
          </div>
        </main>
        <FeaturedProjects />
        {/* Spacer to push bottom content to bottom of viewport */}
        <div className="flex-grow" />
      </div>
    </div>
  )
}
