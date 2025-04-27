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
            className="relative bg-background rounded-xl shadow-2xl max-w-2xl w-full mx-2 p-0 flex flex-col items-center dark:bg-[#18181b]"
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
            <div className="flex flex-col items-center w-full py-12 px-6">
              <h2 className="text-3xl font-bold text-center text-foreground mb-2">{card.title}</h2>
              <p className="text-lg text-muted-foreground text-center mb-6 max-w-xl">{card.description}</p>
              <div className="relative w-full flex justify-center mb-6">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={480}
                  height={320}
                  className="rounded-2xl object-cover max-h-[60vh] w-auto mx-auto border-4 border-border bg-background"
                  priority
                />
              </div>
              <div className="text-base text-muted-foreground mt-2">
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
