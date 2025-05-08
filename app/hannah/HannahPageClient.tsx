"use client";

import React from "react";
import Timeline from "../../components/Timeline";
import BackgroundAudioPlayer from "@/components/ui/BackgroundAudioPlayer";
import { useRouter } from "next/navigation";

export default function HannahPageClient() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Back Button at top of content, scrolls away */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mt-4 ml-2 sm:mt-6 sm:ml-6 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-card/80 text-foreground border border-border shadow hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 backdrop-blur-sm text-sm sm:text-base flex items-center whitespace-nowrap"
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M19 12H5"/>
          <path d="M12 19l-7-7 7-7"/>
        </svg>
        <span className="ml-1 font-bold tracking-wide hidden md:inline" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>BACK</span>
      </button>
      <BackgroundAudioPlayer src="/audio/no-machine.mp3" storageKey="hannah-music-muted" />
      <Timeline />
    </main>
  );
}