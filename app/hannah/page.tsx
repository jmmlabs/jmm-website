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
        className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-card/80 text-foreground border border-border shadow hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60"
        style={{ zIndex: 20 }}
        aria-label="Go back"
      >
        <span className="text-lg">←</span> <span className="ml-1 font-bold tracking-wide" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>BACK</span>
      </button>
      <Timeline />
    </main>
  );
};

export default HannahPage;
