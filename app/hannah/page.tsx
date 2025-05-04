"use client";

import React from "react";
import Timeline from "../../components/Timeline";
import BackgroundAudioPlayer from "@/components/ui/BackgroundAudioPlayer";
import { useRouter } from "next/navigation";

const HannahPage = () => {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BackgroundAudioPlayer src="/audio/no-machine.mp3" storageKey="hannah-music-muted" />
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="fixed top-4 left-2 sm:top-6 sm:left-6 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-card/80 text-foreground border border-border shadow hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 backdrop-blur-sm text-sm sm:text-base"
        style={{ zIndex: 20 }}
        aria-label="Go back"
      >
        <span className="text-base sm:text-lg">←</span>
        <span className="ml-1 font-bold tracking-wide hidden md:inline" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>BACK</span>
      </button>
      <Timeline />
    </main>
  );
};

export default HannahPage;
