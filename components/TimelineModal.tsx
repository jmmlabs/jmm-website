"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FullscreenGallery from "./FullscreenGallery";
// Confetti animation for birthday event
import { launchBirthdayConfetti } from "./birthdayConfetti";

// Hide scrollbar utility class
import "../styles/hideScrollbar.css";



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
  // All hooks at the top, always called
  const [currentIdx, setCurrentIdx] = useState(initialIdx);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastConfettiEventTitle = useRef<string | null>(null);

  // Effects that do NOT depend on currentEvent/validImages
  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(initialIdx);
      setSelectedImgIdx(0);
      setFullscreen(false);
      setReady(false);
      setTimeout(() => setReady(true), 0);
    } else {
      setReady(false);
    }
  }, [isOpen, card, initialIdx]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

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
  }, [isOpen, onClose, currentIdx, selectedImgIdx, fullscreen]);

  // Derived values after all hooks
  const validEvents = events.map(ev => ({
    ...ev,
    images: Array.isArray(ev.images) ? ev.images.filter(img => typeof img === "string" && img.trim() !== "") : []
  }));
  const currentEvent = validEvents[currentIdx] || { images: [] };
  const validImages = currentEvent.images;

  // Effects that depend on derived values
  useEffect(() => {
    const ref = thumbnailRefs.current[selectedImgIdx];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedImgIdx, currentIdx]);

  useEffect(() => {
    if (validImages.length <= 1) return;
    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    if (validImages[selectedImgIdx - 1]) preload(validImages[selectedImgIdx - 1]);
    if (validImages[selectedImgIdx + 1]) preload(validImages[selectedImgIdx + 1]);
  }, [validImages, selectedImgIdx]);

  useEffect(() => {
    if (descriptionRef.current) {
      requestAnimationFrame(() => {
        if (descriptionRef.current) {
          descriptionRef.current.scrollTop = 0;
        }
      });
    };
  }, [currentIdx, selectedImgIdx]);

  useEffect(() => {
    if (isOpen && currentEvent.title === "First Birthday Together" && lastConfettiEventTitle.current !== currentEvent.title) {
      launchBirthdayConfetti();
      lastConfettiEventTitle.current = currentEvent.title;
    } else if (!isOpen) {
      lastConfettiEventTitle.current = null;
    } else if (currentEvent.title !== "First Birthday Together") {
      lastConfettiEventTitle.current = currentEvent.title;
    }
  }, [isOpen, currentEvent?.title]);

  // All early returns after hooks/effects and derived values
  if (!validImages || validImages.length === 0 || (isOpen && !ready)) {
    return null;
  }

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

  function formatDate(dateString: string) {
    // Always format in UTC to avoid SSR/CSR mismatch
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  }

  const handlePrev = () => {
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
  };

  const handleNext = () => {
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
  };

  return (
    <>
      {/* AnimatePresence wraps only the modal, not the FullscreenGallery */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.42, ease: 'easeInOut', type: 'spring', stiffness: 90, damping: 18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-2 overflow-y-auto"
            tabIndex={-1}
            onMouseDown={handleBackdropClick}
            aria-modal="true"
            role="dialog"
            aria-label={currentEvent.title || 'Timeline event modal'}
          >
            <div
              className="relative bg-card rounded-2xl shadow-xl max-w-3xl w-full flex flex-col min-h-[400px] max-h-[95vh] md:min-h-[540px] md:max-h-[95vh] p-0 md:p-8"
              style={{
                boxSizing: 'border-box',
                height: 'auto',
                maxHeight: '95vh',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseDown={e => e.stopPropagation()}
            >
              {/* Sticky Header with Close Button (OUTSIDE scrollable area) */}
              <div className="sticky top-0 z-20 bg-card/95 pt-[env(safe-area-inset-top)] px-4 py-2 flex justify-end rounded-t-2xl h-14 min-h-[3.5rem]" style={{backdropFilter: 'blur(2px)'}}>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center text-2xl text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label="Close modal"
                  style={{ fontSize: 28 }}
                >
                  ×
                </button>
              </div>
              {/* Main Content (fixed layout, only desc scrolls) */}
              <div className="flex flex-col items-center w-full gap-4 flex-shrink-0">
                {/* Main Image */}
                <div className="flex items-center justify-center w-full max-w-2xl h-[180px] md:h-[240px]">
                  <AnimatePresence mode="wait">
                    {validImages[selectedImgIdx] && (
                      <motion.div
                        key={`main-img-${currentIdx}-${selectedImgIdx}`}
                        initial={{ opacity: 0.8, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.8, scale: 0.99 }}
                        transition={{ duration: 0.14, ease: 'easeOut' }}
                        className="rounded-2xl border-4 border-border bg-background shadow-lg w-full h-full flex items-center justify-center"
                        style={{ aspectRatio: '16/9', cursor: 'zoom-in' }}
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
                </div>
                {/* Thumbnails */}
                <div className="flex justify-center items-center max-w-2xl w-full mt-2 mb-2 gap-2 h-[56px] overflow-x-auto hide-scrollbar">
  {/* Arrow Button: Left */}
  <button
    type="button"
    onClick={() => setSelectedImgIdx(Math.max(selectedImgIdx - 1, 0))}
    disabled={selectedImgIdx === 0 || validImages.length === 1}
    className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center disabled:opacity-40"
    aria-label="Previous image"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  </button>
  {/* Thumbnails */}
  {validImages.map((img, idx) => (
    <button
      key={img + idx}
      ref={el => { thumbnailRefs.current[idx] = el; }}
      className={`mx-1 rounded-lg border-2 ${idx === selectedImgIdx ? 'border-primary' : 'border-transparent'} focus:outline-none`}
      style={{ width: 48, height: 48, overflow: 'hidden', flex: '0 0 auto' }}
      onClick={() => setSelectedImgIdx(idx)}
      aria-label={`Thumbnail ${idx + 1}`}
    >
      <Image
        src={img}
        alt={`Thumbnail ${idx + 1}`}
        width={48}
        height={48}
        className="object-cover w-full h-full rounded"
      />
    </button>
  ))}
  {/* Arrow Button: Right */}
  <button
    type="button"
    onClick={() => setSelectedImgIdx(Math.min(selectedImgIdx + 1, validImages.length - 1))}
    disabled={selectedImgIdx === validImages.length - 1 || validImages.length === 1}
    className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center disabled:opacity-40"
    aria-label="Next image"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  </button>
</div>
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-center mt-2 mb-1 leading-tight w-full break-words">
                  {currentEvent.title}
                </h2>
                {/* Date Badge */}
                <div className="inline-block text-base md:text-lg font-semibold text-primary bg-primary/10 px-4 py-1 mb-2 text-center w-auto rounded-full tracking-wide shadow-sm">
                  {formatDate(currentEvent.date)}
                </div>
              </div>
              {/* Description (scrollable, grows/shrinks as needed) */}
              <div
                ref={descriptionRef}
                className="overflow-y-auto text-base md:text-lg text-muted-foreground mb-2 text-center w-full max-w-2xl break-words rounded bg-muted/70 px-3 py-2" style={{ height: '220px' }} tabIndex={0}>
                {currentEvent.description}
              </div>
              {/* Navigation Buttons (always visible, fixed height) */}
              <div className="flex flex-row items-center justify-between gap-8 mt-4 w-full max-w-2xl">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  disabled={isMobile ? (currentIdx === 0 && selectedImgIdx === 0) : (currentIdx === 0)}
                  className="px-6 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-border disabled:opacity-40 min-w-[64px] min-h-[54px] text-lg font-semibold shadow-md transition-all"
                  aria-label="Previous"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
                      <polyline points="15 6 9 12 15 18" />
                    </svg>
                    Prev
                  </span>
                </button>
                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={isMobile ? (currentIdx === validEvents.length - 1 && selectedImgIdx === validImages.length - 1) : (currentIdx === validEvents.length - 1)}
                  className="px-6 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-border disabled:opacity-40 min-w-[64px] min-h-[54px] text-lg font-semibold shadow-md transition-all"
                  aria-label="Next"
                >
                  <span className="flex items-center">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 ml-2">
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* FullscreenGallery is outside AnimatePresence for best animation/SSR practices */}
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
}

export default TimelineModal;
