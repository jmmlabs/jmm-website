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
        volume={muted ? 0 : 1}
      />
      <button
        onClick={() => setMuted(m => !m)}
        className={`fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg transition-colors
          ${muted
            ? "bg-gray-800 text-gray-400 ring-2 ring-gray-600"
            : "bg-primary-700 text-primary-200 ring-2 ring-primary-400 animate-pulse"
          }`}
        aria-label={muted ? "Unmute music" : "Mute music"}
        style={{ outline: "none" }}
      >
        {muted ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 9v6h4l5 5V4l-5 5H9z" />
            <line x1="1" y1="23" x2="23" y2="1" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 9v6h4l5 5V4l-5 5H9z" />
            <path d="M19 5a9 9 0 0 1 0 14" />
          </svg>
        )}
      </button>
    </>
  );
}
