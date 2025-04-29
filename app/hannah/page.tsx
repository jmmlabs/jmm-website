import React from "react";
import Timeline from "../../components/Timeline";
import BackgroundAudioPlayer from "@/components/ui/BackgroundAudioPlayer";

const HannahPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BackgroundAudioPlayer src="/audio/no-machine.mp3" storageKey="hannah-music-muted" />
      <Timeline />
    </main>
  );
};

export default HannahPage;
