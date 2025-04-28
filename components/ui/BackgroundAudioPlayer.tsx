"use client";

import { useRef, useState, useEffect } from "react";

interface BackgroundAudioPlayerProps {
  src: string;
  storageKey?: string;
}

export default function BackgroundAudioPlayer({ src, storageKey = "background-audio-muted" }: BackgroundAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  // Restore mute state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) setMuted(saved === "true");
  }, [storageKey]);

  // Update audio mute state and fade in/out
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      let fadeInterval: NodeJS.Timeout | undefined;
      if (muted) {
        // Fade out
        fadeInterval = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(0, audio.volume - 0.05);
          } else {
            audio.volume = 0;
            audio.muted = true;
            clearInterval(fadeInterval);
          }
        }, 30);
      } else {
        // Unmute and fade in
        audio.muted = false;
        fadeInterval = setInterval(() => {
          if (audio.volume < 0.95) {
            audio.volume = Math.min(1, audio.volume + 0.05);
          } else {
            audio.volume = 1;
            clearInterval(fadeInterval);
          }
        }, 30);
      }
      return () => fadeInterval && clearInterval(fadeInterval);
    }
    localStorage.setItem(storageKey, muted.toString());
  }, [muted, storageKey]);

  // Try to auto-play on mount (unmuted)
  useEffect(() => {
    if (audioRef.current && audioRef.current.paused && !muted) {
      audioRef.current.play().catch(() => {});
    }
  }, [muted]);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        autoPlay
        muted={muted}
      />
      <button
        onClick={() => setMuted(m => !m)}
        className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-colors border-2 focus:outline-none
          ${muted
            ? "bg-background border-border text-muted-foreground hover:bg-border opacity-80"
            : "bg-muted border-border text-foreground hover:bg-border opacity-95"
          }`}
        aria-label={muted ? "Unmute music" : "Mute music"}
        data-component-name="BackgroundAudioPlayer"
        style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.20)", transition: 'background 0.2s, border 0.2s, color 0.2s, opacity 0.2s' }}
      >
        {muted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19 5a9 9 0 0 1 0 14" />
          </svg>
        )}
      </button>
    </>
  );
}
