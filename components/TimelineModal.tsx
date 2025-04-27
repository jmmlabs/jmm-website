"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: {
    title: string;
    description: string;
    image: string;
    date: string;
  };
  currentIdx: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose, card, currentIdx, total, onPrev, onNext }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC/backdrop handling
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIdx > 0) onPrev();
      if (e.key === "ArrowRight" && currentIdx < total - 1) onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIdx, total, onClose, onPrev, onNext]);

  // Backdrop click closes only if outside modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
        >
          <motion.div
            className="relative bg-background rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] mx-2 p-0 flex flex-col items-stretch dark:bg-[#18181b] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, info) => {
              if (info.offset.x < -80 && currentIdx < total - 1) {
                onNext();
              } else if (info.offset.x > 80 && currentIdx > 0) {
                onPrev();
              }
            }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label="Close"
              onClick={onClose}
              tabIndex={0}
            >
              ×
            </button>
            {/* Left arrow */}
            {currentIdx > 0 && (
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-muted rounded-full p-2 text-2xl text-muted-foreground hover:text-foreground shadow-lg focus:outline-none"
                aria-label="Previous"
                onClick={onPrev}
                tabIndex={0}
              >
                &#8592;
              </button>
            )}
            {/* Right arrow */}
            {currentIdx < total - 1 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-muted rounded-full p-2 text-2xl text-muted-foreground hover:text-foreground shadow-lg focus:outline-none"
                aria-label="Next"
                onClick={onNext}
                tabIndex={0}
              >
                &#8594;
              </button>
            )}
            <div className="flex flex-col items-center w-full pt-8 pb-2 px-4 gap-4 md:gap-6">
              {/* Title: centered at top with padding */}
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center w-full pt-2">{card.title}</h2>
              {/* Description: centered below title */}
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 text-center w-full max-w-2xl">{card.description}</p>
              {/* Image: centered below description, with padding */}
              <div className="w-full flex justify-center items-center mb-4 md:mb-6">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={960}
                  height={600}
                  className="rounded-2xl object-cover w-full max-w-2xl max-h-[60vh] border-4 border-border bg-background"
                  priority
                />
              </div>
              {/* Date: centered below image, with same bottom padding as h2 top */}
              <div className="text-base md:text-lg text-muted-foreground mt-2 text-center w-full pb-2">
                {new Date(card.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelineModal;
