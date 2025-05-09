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
  // Prevent accidental fullscreen after modal close
  const justClosedRef = useRef(false);
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
      justClosedRef.current = true; // Set flag on modal close
    }
  }, [isOpen, card, initialIdx]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Unified keyboard navigation: left/right for images, up/down for cards
  useEffect(() => {
    if (!isOpen || fullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (canImagePrev()) handleImagePrev();
      }
      if (e.key === "ArrowRight") {
        if (canImageNext()) handleImageNext();
      }
      if (e.key === "ArrowUp") {
        if (canCardPrev()) handleCardPrev();
      }
      if (e.key === "ArrowDown") {
        if (canCardNext()) handleCardNext();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, currentIdx, selectedImgIdx, fullscreen]);

  // --- Navigation logic helpers ---
  const canCardPrev = () => currentIdx > 0;
  const canCardNext = () => currentIdx < validEvents.length - 1;
  const canImagePrev = () => !(currentIdx === 0 && selectedImgIdx === 0);
  const canImageNext = () => !(currentIdx === validEvents.length - 1 && selectedImgIdx === validImages.length - 1);

  // --- Navigation handlers ---
  // Card navigation (bottom Prev/Next)
  const handleCardPrev = () => {
    if (canCardPrev()) {
      setCurrentIdx(idx => {
        setSelectedImgIdx(0);
        return idx - 1;
      });
    }
  };
  const handleCardNext = () => {
    if (canCardNext()) {
      setCurrentIdx(idx => {
        setSelectedImgIdx(0);
        return idx + 1;
      });
    }
  };
  // Image loading state for spinner
  const [loading, setLoading] = React.useState(true);

  // Image navigation (thumbnail arrows)
  const handleImagePrev = () => {
    if (selectedImgIdx > 0) {
      setFade(true);
      setTimeout(() => {
        setSelectedImgIdx(selectedImgIdx - 1);
        setFade(false);
      }, 160);
    } else if (canCardPrev()) {
      setCurrentIdx(idx => {
        const prevImages = validEvents[idx - 1]?.images || [];
        setSelectedImgIdx(prevImages.length - 1);
        return idx - 1;
      });
    }
  };
  const handleImageNext = () => {
    if (selectedImgIdx < validImages.length - 1) {
      setFade(true);
      setTimeout(() => {
        setSelectedImgIdx(selectedImgIdx + 1);
        setFade(false);
      }, 160);
    } else if (canCardNext()) {
      setCurrentIdx(idx => {
        setSelectedImgIdx(0);
        return idx + 1;
      });
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isOpen || fullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (canImagePrev()) handleImagePrev();
      }
      if (e.key === "ArrowRight") {
        if (canImageNext()) handleImageNext();
      }
      if (e.key === "ArrowUp") {
        if (canCardPrev()) handleCardPrev();
      }
      if (e.key === "ArrowDown") {
        if (canCardNext()) handleCardNext();
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
    // Ensure selectedImgIdx is always valid for the current event
    if (selectedImgIdx >= validImages.length) {
      setSelectedImgIdx(0);
    }
    const ref = thumbnailRefs.current[selectedImgIdx];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedImgIdx, currentIdx, validImages.length]);

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
        setCurrentIdx(idx => {
          setSelectedImgIdx(0);
          return idx - 1;
        });
      }
    } else {
      // Desktop: Go to previous event as before
      if (currentIdx > 0) {
        setCurrentIdx(idx => {
          setSelectedImgIdx(0);
          return idx - 1;
        });
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
        setCurrentIdx(idx => {
          setSelectedImgIdx(0);
          return idx + 1;
        });
      }
    } else {
      // Desktop: Advance event as before
      if (currentIdx < validEvents.length - 1) {
        setCurrentIdx(idx => {
          setSelectedImgIdx(0);
          return idx + 1;
        });
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
              className="relative bg-card/95 border border-border rounded-2xl shadow-2xl w-full max-w-3xl md:w-auto md:max-w-3xl flex flex-col max-h-[95vh] overflow-y-auto px-2 md:px-8 pt-0 pb-0 mt-0 md:mt-8"
              style={{
                boxSizing: 'border-box',
                height: 'auto',
                flexDirection: 'column',
              }}
              onMouseDown={e => e.stopPropagation()}
            >
              {/* Close Button (absolute, top-right) */}
              <button
                onClick={onClose}
                className="absolute right-0 top-0 w-10 h-10 md:w-12 md:h-12 m-2 md:m-4 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow hover:bg-border hover:text-foreground focus:outline-none transition-all text-lg md:text-xl z-50"
                aria-label="Close modal"
                style={{ fontSize: 28 }}
                tabIndex={0}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {/* Header */}
              <TimelineModalHeader
                title={currentEvent.title}
                date={formatDate(currentEvent.date)}
              />
              {/* Main Content - optimal stacking and separation */}
              <div className="flex flex-col items-center w-full gap-y-4 px-4">
                {/* Main Image */}
                {validImages[selectedImgIdx] && (
                  <div className="mb-3 mt-3 w-full max-h-[30vh] md:max-h-none mx-auto flex justify-center">
                    <TimelineModalMainImage
                      image={validImages[selectedImgIdx]}
                      title={currentEvent.title}
                      onZoom={() => {
                        if (justClosedRef.current) {
                          justClosedRef.current = false; // Block accidental fullscreen
                          return;
                        }
                        setFullscreen(true);
                      }}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </div>
                )}
                {/* Thumbnails */}
                <div className="mb-3 w-full mx-auto flex justify-center">
                  <TimelineModalThumbnails
                    images={validImages}
                    selectedIdx={selectedImgIdx}
                    onSelect={setSelectedImgIdx}
                    thumbnailRefs={thumbnailRefs}
                    canImagePrev={canImagePrev()}
                    canImageNext={canImageNext()}
                    handleImagePrev={handleImagePrev}
                    handleImageNext={handleImageNext}
                    loading={loading}
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
                    onPrev={handleCardPrev}
                    onNext={handleCardNext}
                    disablePrev={currentIdx === 0}
                    disableNext={currentIdx === validEvents.length - 1}
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
