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
}

const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({
  isOpen,
  onClose,
  events,
  eventIdx,
  imageIdx,
  onNavigate,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const totalEvents = events.length;
  const currentEvent = events[eventIdx];
  const totalImages = currentEvent.images.length;

  // Defensive: If currentEvent.images is empty, render nothing (null)
  if (!currentEvent.images || currentEvent.images.length === 0) {
    return null;
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (imageIdx > 0) onNavigate(eventIdx, imageIdx - 1);
        else if (eventIdx > 0)
          onNavigate(eventIdx - 1, events[eventIdx - 1].images.length - 1);
      }
      if (e.key === "ArrowRight") {
        if (imageIdx < totalImages - 1) onNavigate(eventIdx, imageIdx + 1);
        else if (eventIdx < totalEvents - 1) onNavigate(eventIdx + 1, 0);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, eventIdx, imageIdx, events, onNavigate, totalEvents, totalImages]);

  // Touch/swipe navigation
  useEffect(() => {
    if (!isOpen) return;
    let startX = 0;
    let endX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if (startX - endX > 60) {
        // Swipe left
        if (imageIdx < totalImages - 1) onNavigate(eventIdx, imageIdx + 1);
        else if (eventIdx < totalEvents - 1) onNavigate(eventIdx + 1, 0);
      } else if (endX - startX > 60) {
        // Swipe right
        if (imageIdx > 0) onNavigate(eventIdx, imageIdx - 1);
        else if (eventIdx > 0)
          onNavigate(eventIdx - 1, events[eventIdx - 1].images.length - 1);
      }
    };
    const node = overlayRef.current;
    if (node) {
      node.addEventListener("touchstart", handleTouchStart);
      node.addEventListener("touchmove", handleTouchMove);
      node.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (node) {
        node.removeEventListener("touchstart", handleTouchStart);
        node.removeEventListener("touchmove", handleTouchMove);
        node.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isOpen, eventIdx, imageIdx, events, onNavigate, totalEvents, totalImages]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Progress indicator text
  const globalImageIdx = events
    .slice(0, eventIdx)
    .reduce((acc, ev) => acc + ev.images.length, 0) + imageIdx + 1;
  const globalTotal = events.reduce((acc, ev) => acc + ev.images.length, 0);

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
          onMouseDown={handleBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
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
            onClick={() => {
              if (imageIdx > 0) onNavigate(eventIdx, imageIdx - 1);
              else if (eventIdx > 0)
                onNavigate(eventIdx - 1, events[eventIdx - 1].images.length - 1);
            }}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white px-2 py-1 rounded-full focus:outline-none z-10"
            aria-label="Previous image"
            style={{ userSelect: "none" }}
          >
            ←
          </button>
          <button
            onClick={() => {
              if (imageIdx < totalImages - 1) onNavigate(eventIdx, imageIdx + 1);
              else if (eventIdx < totalEvents - 1) onNavigate(eventIdx + 1, 0);
            }}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white px-2 py-1 rounded-full focus:outline-none z-10"
            aria-label="Next image"
            style={{ userSelect: "none" }}
          >
            →
          </button>

          {/* Main Image */}
          {currentEvent.images[imageIdx] && (
            <motion.div
              key={`fullscreen-img-${eventIdx}-${imageIdx}`}
              initial={{ opacity: 0.7, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.7, scale: 0.99 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center justify-center w-full h-full"
            >
              <Image
                src={currentEvent.images[imageIdx]}
                alt={`${currentEvent.title} - Fullscreen Image ${imageIdx + 1}`}
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
