"use client";

import React from "react";
import Timeline from "../../components/Timeline";
import BackgroundAudioPlayer from "@/components/ui/BackgroundAudioPlayer";
import { useRouter } from "next/navigation";

const HannahPage = () => {
  const router = useRouter();
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        {/* Back Button at top of content, scrolls away */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 ml-2 sm:mt-6 sm:ml-6 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-card/80 text-foreground border border-border shadow hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 backdrop-blur-sm text-sm sm:text-base"
          aria-label="Go back"
        >
          <span className="text-base sm:text-lg">←</span>
          <span className="ml-1 font-bold tracking-wide hidden md:inline" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>BACK</span>
        </button>
        <BackgroundAudioPlayer src="/audio/no-machine.mp3" storageKey="hannah-music-muted" />
        <Timeline />
      </main>
    </>
  );
};

export default HannahPage;
