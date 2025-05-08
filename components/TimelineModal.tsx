"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullscreenGallery from "./FullscreenGallery";
import TimelineModalHeader from "./TimelineModalHeader";
import TimelineModalMainImage from "./TimelineModalMainImage";
import TimelineModalThumbnails from "./TimelineModalThumbnails";
import TimelineModalDescription from "./TimelineModalDescription";
import TimelineModalNavigation from "./TimelineModalNavigation";
import type { TimelineEvent, TimelineModalProps } from "./TimelineModal.types";
// Confetti animation for birthday event
import { launchBirthdayConfetti } from "./birthdayConfetti";

import "../styles/hideScrollbar.css";





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
              {/* Header */}
              <TimelineModalHeader
                title={currentEvent.title}
                date={formatDate(currentEvent.date)}
                onClose={onClose}
              />
              {/* Main Content - optimal stacking and separation */}
              <div className="flex flex-col items-center w-full gap-y-4 px-4">
                {/* Main Image */}
                {validImages[selectedImgIdx] && (
                  <div className="mb-3 w-full">
                    <TimelineModalMainImage
                      image={validImages[selectedImgIdx]}
                      title={`${currentEvent.title || 'Event'} - Image ${selectedImgIdx + 1}`}
                      onZoom={() => setFullscreen(true)}
                    />
                  </div>
                )}
                {/* Thumbnails */}
                <div className="mb-3 w-full">
                  <TimelineModalThumbnails
                    images={validImages}
                    selectedIdx={selectedImgIdx}
                    onSelect={setSelectedImgIdx}
                    thumbnailRefs={thumbnailRefs}
                  />
                </div>
                {/* Description (visually distinct, scrollable) */}
                <div className="py-3 mb-3 w-full max-w-2xl bg-muted/80 rounded shadow-inner">
                  <TimelineModalDescription
                    description={currentEvent.description}
                    descriptionRef={descriptionRef}
                  />
                </div>
                {/* Navigation Buttons (bottom, separated) */}
                <div className="mt-4 w-full">
                  <TimelineModalNavigation
                    onPrev={handlePrev}
                    onNext={handleNext}
                    disablePrev={isMobile ? (currentIdx === 0 && selectedImgIdx === 0) : (currentIdx === 0)}
                    disableNext={isMobile ? (currentIdx === validEvents.length - 1 && selectedImgIdx === validImages.length - 1) : (currentIdx === validEvents.length - 1)}
                  />
                </div>
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
