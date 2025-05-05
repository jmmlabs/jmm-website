"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FullscreenGallery from "./FullscreenGallery";

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: {
    title: string;
    description: string;
    images: string[];
    date: string;
  };
  currentIdx: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  events: {
    title: string;
    description: string;
    images: string[];
    date: string;
  }[];
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose, card, currentIdx: initialIdx, total, onPrev, onNext, events }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // Central state for current event and image
  const [currentIdx, setCurrentIdx] = useState(initialIdx);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Defensive: If no events or no images in current event, fallback to null
  const validEvents = events.map(ev => ({
    ...ev,
    images: Array.isArray(ev.images) ? ev.images.filter(img => typeof img === "string" && img.trim() !== "") : []
  }));
  const currentEvent = validEvents[currentIdx] || { images: [] };
  const validImages = currentEvent.images;
  if (!validImages || validImages.length === 0) {
    return null;
  }

  useEffect(() => {
    setCurrentIdx(initialIdx);
    setSelectedImgIdx(0);
    setFullscreen(false);
  }, [card, initialIdx]);

  useEffect(() => {
    if (!isOpen || fullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (selectedImgIdx > 0) {
          setFade(true);
          setTimeout(() => {
            setSelectedImgIdx(selectedImgIdx - 1);
            setFade(false);
          }, 160);
        } else if (currentIdx > 0) {
          setCurrentIdx(currentIdx - 1);
          // Set to last image of previous event
          setSelectedImgIdx(validEvents[currentIdx - 1]?.images.length - 1 || 0);
        }
      }
      if (e.key === "ArrowRight") {
        if (selectedImgIdx < validImages.length - 1) {
          setFade(true);
          setTimeout(() => {
            setSelectedImgIdx(selectedImgIdx + 1);
            setFade(false);
          }, 160);
        } else if (currentIdx < validEvents.length - 1) {
          setCurrentIdx(currentIdx + 1);
          setSelectedImgIdx(0);
        }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, fullscreen, onClose, currentIdx, validEvents, validImages, selectedImgIdx]);

  // Preload adjacent images
  useEffect(() => {
    if (validImages.length <= 1) return;
    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    if (validImages[selectedImgIdx - 1]) preload(validImages[selectedImgIdx - 1]);
    if (validImages[selectedImgIdx + 1]) preload(validImages[selectedImgIdx + 1]);
  }, [validImages, selectedImgIdx]);

  // Fade transition when changing images
  const handleThumbnailClick = (idx: number) => {
    if (idx === selectedImgIdx) return;
    setFade(true);
    setTimeout(() => {
      setSelectedImgIdx(idx);
      setFade(false);
    }, 160); // Faster fade
  };

  // Handle click outside modal to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Only close if click is directly on the backdrop (not bubbling from inside modal)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper to detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-2"
            onMouseDown={handleBackdropClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 18, duration: 0.7 }}
              className="relative bg-card rounded-2xl shadow-xl max-w-3xl w-full p-4 md:p-8 flex flex-col items-center"
              tabIndex={-1}
            >
              {/* Main Image with fade transition */}
              <AnimatePresence mode="wait">
                {validImages[selectedImgIdx] && (
                  <motion.div
                    key={`main-img-${currentIdx}-${selectedImgIdx}`}
                    initial={{ opacity: 0.8, scale: 1.01 }} // Subtle, minimal start
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.8, scale: 0.99 }} // Minimal fade out
                    transition={{ duration: 0.14, ease: 'easeOut' }} // Smooth, quick
                    className={`rounded-2xl object-contain w-full max-w-2xl max-h-[60vh] border-4 border-border bg-background overflow-hidden`}
                    style={{ aspectRatio: '16/9', minHeight: 180, willChange: 'opacity, transform', cursor: 'zoom-in' }}
                    onClick={() => setFullscreen(true)}
                    tabIndex={0}
                    aria-label="Open fullscreen gallery"
                  >
                    <Image
                      src={validImages[selectedImgIdx]}
                      alt={`${currentEvent.title || 'Event'} - Image ${selectedImgIdx + 1}`}
                      width={960}
                      height={600}
                      className="rounded-2xl object-contain w-full h-full bg-background"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Thumbnails row (only if multiple images) */}
              {validImages.length > 1 && (
                <div className="w-full flex justify-center">
                  <div className="flex flex-row gap-2 mt-3 max-w-full overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent justify-center">
                    {validImages.slice(0, 5).map((img, idx) => (
                      <motion.button
                        key={`thumb-${currentIdx}-${idx}`}
                        onClick={() => handleThumbnailClick(idx)}
                        className={`border-2 rounded-lg focus:outline-none ${selectedImgIdx === idx ? 'border-primary shadow-md' : 'border-border opacity-80 hover:opacity-100'} flex-shrink-0 transition-all duration-400`}
                        style={{ height: 60, width: 90, minWidth: 60, transition: 'border-color 0.16s cubic-bezier(0.4,0,0.2,1), box-shadow 0.16s cubic-bezier(0.4,0,0.2,1), opacity 0.09s' }}
                        aria-label={`Show image ${idx + 1}`}
                        tabIndex={0}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.03 }}
                        transition={{ duration: 0.16, ease: 'easeInOut' }} // Faster thumbnail transition
                      >
                        <Image
                          src={img}
                          alt={`${currentEvent.title || 'Event'} - Thumbnail ${idx + 1}`}
                          width={90}
                          height={60}
                          className="object-contain w-full h-full rounded-lg"
                          loading={Math.abs(selectedImgIdx - idx) <= 1 ? 'eager' : 'lazy'}
                          draggable={false}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-center mt-4 mb-2 text-foreground w-full break-words">
                {currentEvent.title}
              </h2>
              <div className="text-base md:text-lg text-muted-foreground mb-2 text-center w-full max-w-2xl break-words">
                {currentEvent.description}
              </div>
              {/* Date */}
              <div
                className="inline-block text-base md:text-lg font-semibold text-primary bg-primary/10 px-3 py-1 mt-2 mb-1 text-center w-auto rounded-full tracking-wide shadow-sm"
                style={{ letterSpacing: '0.02em' }}
              >
                {new Date(currentEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              {/* Navigation Arrows */}
              <div className="flex flex-row items-center justify-between w-full mt-4">
                <button
                  onClick={() => {
                    if (isMobile) {
                      // Mobile: Scroll through images before going to previous event
                      if (selectedImgIdx > 0) {
                        setFade(true);
                        setTimeout(() => {
                          setSelectedImgIdx(selectedImgIdx - 1);
                          setFade(false);
                        }, 160);
                      } else if (currentIdx > 0) {
                        const prevEventImages = validEvents[currentIdx - 1]?.images || [];
                        setCurrentIdx(currentIdx - 1);
                        setSelectedImgIdx(prevEventImages.length - 1 || 0);
                      }
                    } else {
                      // Desktop: Go to previous event as before
                      if (currentIdx > 0) {
                        setCurrentIdx(currentIdx - 1);
                        setSelectedImgIdx(validEvents[currentIdx - 1]?.images.length - 1 || 0);
                      }
                    }
                  }}
                  disabled={isMobile ? (currentIdx === 0 && selectedImgIdx === 0) : (currentIdx === 0)}
                  className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-border disabled:opacity-40"
                  aria-label="Previous"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => {
                    if (isMobile) {
                      // Mobile: Scroll through images before advancing event
                      if (selectedImgIdx < validImages.length - 1) {
                        setFade(true);
                        setTimeout(() => {
                          setSelectedImgIdx(selectedImgIdx + 1);
                          setFade(false);
                        }, 160);
                      } else if (currentIdx < validEvents.length - 1) {
                        setCurrentIdx(currentIdx + 1);
                        setSelectedImgIdx(0);
                      }
                    } else {
                      // Desktop: Advance event as before
                      if (currentIdx < validEvents.length - 1) {
                        setCurrentIdx(currentIdx + 1);
                        setSelectedImgIdx(0);
                      }
                    }
                  }}
                  disabled={isMobile ? (currentIdx === validEvents.length - 1 && selectedImgIdx === validImages.length - 1) : (currentIdx === validEvents.length - 1)}
                  className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-border disabled:opacity-40"
                  aria-label="Next"
                >
                  Next →
                </button>
              </div>
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label="Close modal"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <FullscreenGallery
        isOpen={fullscreen}
        onClose={() => setFullscreen(false)}
        events={validEvents}
        eventIdx={currentIdx}
        imageIdx={selectedImgIdx}
        onNavigate={(eventIdx, imageIdx) => {
          setCurrentIdx(eventIdx);
          setSelectedImgIdx(imageIdx);
        }}
      />
    </>
  );
};

export default TimelineModal;
