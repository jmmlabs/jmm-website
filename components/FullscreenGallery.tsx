"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FullscreenGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  events: { images: string[]; title: string }[];
  eventIdx: number;
  imageIdx: number;
  onNavigate: (eventIdx: number, imageIdx: number) => void;
  onEventChange?: (eventIdx: number) => void;
}

const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  isOpen,
  onClose,
  events,
  eventIdx,
  imageIdx,
  onNavigate,
  onEventChange,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const totalEvents = events.length;
  // Flatten all valid images across all events
  const flatImages = events.flatMap((ev, idx) =>
    Array.isArray(ev.images)
      ? ev.images.filter(img => typeof img === "string" && img.trim() !== "").map((img, i) => ({ img, eventIdx: idx, imageIdx: i }))
      : []
  );
  // Find the global index of the current event/image
  const globalIdx = events.slice(0, eventIdx).reduce((acc, ev) => acc + (Array.isArray(ev.images) ? ev.images.filter(img => typeof img === "string" && img.trim() !== "").length : 0), 0) + imageIdx;
  const globalTotal = flatImages.length;
  // Defensive: If there are no images, render nothing (null)
  if (globalTotal === 0) {
    return null;
  }

  // Prevent double navigation on mobile (touch/click)
  const lastNavRef = useRef<number>(0);
  const NAV_DEBOUNCE_MS = 350;
  const safeNavigate = (eventIdx: number, imageIdx: number) => {
    const now = Date.now();
    if (now - lastNavRef.current < NAV_DEBOUNCE_MS) return;
    lastNavRef.current = now;
    onNavigate(eventIdx, imageIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (globalIdx > 0) {
          const prev = flatImages[globalIdx - 1];
          safeNavigate(prev.eventIdx, prev.imageIdx);
        }
      }
      if (e.key === "ArrowRight") {
        if (globalIdx < globalTotal - 1) {
          const next = flatImages[globalIdx + 1];
          safeNavigate(next.eventIdx, next.imageIdx);
        }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, globalIdx, flatImages, events, safeNavigate, globalTotal]);

  // Progress indicator text
  const globalImageIdx = globalIdx + 1;

  // Sync modal eventIdx after exiting fullscreen
  useEffect(() => {
    if (!isOpen && typeof onEventChange === 'function') {
      onEventChange(eventIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          style={{ overscrollBehavior: "contain" }}
          aria-modal="true"
          role="dialog"
        >
          {/* Close Button */}
          <button
            onClick={e => { e.stopPropagation(); onClose(); }}
            className="absolute top-6 right-8 text-3xl text-white/80 hover:text-white focus:outline-none z-10"
            aria-label="Close fullscreen gallery"
          >
            ×
          </button>

          {/* Progress Indicator */}
          <div className="absolute top-6 left-8 text-white/80 text-base font-medium bg-black/40 rounded-full px-3 py-1 select-none shadow-md">
            {globalImageIdx} / {globalTotal}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={e => { e.stopPropagation(); if (globalIdx > 0) { const prev = flatImages[globalIdx - 1]; safeNavigate(prev.eventIdx, prev.imageIdx); }}}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white px-2 py-1 rounded-full focus:outline-none z-10"
            aria-label="Previous image"
            style={{ userSelect: "none" }}
          >
            ←
          </button>
          <button
            onClick={e => { e.stopPropagation(); if (globalIdx < globalTotal - 1) { const next = flatImages[globalIdx + 1]; safeNavigate(next.eventIdx, next.imageIdx); }}}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white px-2 py-1 rounded-full focus:outline-none z-10"
            aria-label="Next image"
            style={{ userSelect: "none" }}
          >
            →
          </button>

          {/* Main Image */}
          {flatImages[globalIdx] && (
            <motion.div
              key={`fullscreen-img-${flatImages[globalIdx].eventIdx}-${flatImages[globalIdx].imageIdx}`}
              initial={{ opacity: 0.7, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.7, scale: 0.99 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center justify-center w-full h-full"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={flatImages[globalIdx].img}
                alt={`${events[flatImages[globalIdx].eventIdx].title} - Fullscreen Image ${flatImages[globalIdx].imageIdx + 1}`}
                width={1600}
                height={1000}
                className="object-contain w-full h-full max-h-[90vh] max-w-[95vw] bg-black rounded-2xl shadow-lg select-none"
                draggable={false}
                priority
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenGallery;
