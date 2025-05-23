"use client"
import React, { useRef, useEffect, useState } from "react";
import { getValidatedTimelineData } from "../data/timelineData";
import TimelineCard from "./TimelineCard";
import TimelineModal from "./TimelineModal";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Timeline() {
  // Sort events by date ascending
  const sorted = [...getValidatedTimelineData()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Refs for first and last dot (for future-proofing, but not needed for segmented line)
  const timelineWrapperRef = useRef<HTMLDivElement>(null);

  // For each row, track in-view state
  const [inViewArr, setInViewArr] = useState<boolean[]>(Array(sorted.length).fill(false));

  // Handler for each row's inView
  const handleInView = (idx: number, inView: boolean) => {
    setInViewArr((prev) => {
      if (prev[idx] === inView) return prev;
      const next = [...prev];
      next[idx] = inView;
      return next;
    });
  };

  // Modal state
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  // Listen for card click events
  useEffect(() => {
    const handler = (e: any) => {
      if (typeof e.detail?.idx === "number") setModalIdx(e.detail.idx);
    };
    window.addEventListener("timelineCardClick", handler);
    return () => window.removeEventListener("timelineCardClick", handler);
  }, []);

  // Modal navigation handlers
  const closeModal = () => setModalIdx(null);
  const prevModal = () => setModalIdx((idx) => (idx !== null && idx > 0 ? idx - 1 : idx));
  const nextModal = () => setModalIdx((idx) => (idx !== null && idx < sorted.length - 1 ? idx + 1 : idx));

  return (
    <section className="relative w-full max-w-full md:max-w-4xl md:mx-auto flex flex-col items-center pt-8 pb-16 px-0 sm:px-2 md:px-4 overflow-x-hidden">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">OUR STORY</h2>
      <div ref={timelineWrapperRef} className="relative w-full max-w-full md:max-w-4xl md:mx-auto min-h-[600px] grid grid-cols-3 md:grid-cols-[2fr_28px_2fr] gap-x-0 items-start bg-transparent" style={{ scrollbarGutter: 'stable' }}>
        {/* Timeline cards, dots, and line segments */}
        {sorted.map((event, idx) => {
          // Intersection observer for this row
          const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.01 });
          useEffect(() => { handleInView(idx, inView); }, [inView]);
          return (
            <React.Fragment key={event.date + event.title}>
              {/* Left column (even idx) */}
              <div className={`flex justify-end items-center min-h-[140px] snap-start w-full mx-auto max-w-[90vw] md:max-w-none ${idx % 2 === 0 ? '' : 'invisible'}`}>
                {idx % 2 === 0 && (
  <TimelineCard
    {...event}
    side="left"
    idx={idx}
    forwardedRef={ref}
    inView={inView || (typeof window !== 'undefined' && window.innerWidth < 400)}
  />
)}
              </div>
              {/* Center column: timeline dot and vertical line */}
              <div className="flex flex-col items-center h-full min-h-[80px] md:min-h-[140px] z-10">
                {/* Spacer for first dot to center it */}
                {idx === 0 && <div className="flex-grow" />}
                {/* Vertical line segment for all but first dot */}
                {idx !== 0 && (
                  <div className="w-2 flex-grow bg-border" />
                )}
                {/* Dot */}
                <div className="w-5 h-5 bg-background border-4 border-border rounded-full z-10" />
                {/* Vertical line segment for all but last dot */}
                {idx !== sorted.length - 1 && (
                  <div className="w-2 flex-grow bg-border" />
                )}
                {/* Spacer for last dot to center it */}
                {idx === sorted.length - 1 && <div className="flex-grow" />}
              </div>
              {/* Right column (odd idx) */}
              <div className={`flex justify-start items-center min-h-[140px] snap-start w-full mx-auto max-w-[90vw] md:max-w-none ${idx % 2 === 1 ? '' : 'invisible'}`}>
                {idx % 2 === 1 && (
  <TimelineCard
    {...event}
    side="right"
    idx={idx}
    forwardedRef={ref}
    inView={inView || (typeof window !== 'undefined' && window.innerWidth < 400)}
  />
)}
              </div>
            </React.Fragment>
          );
        })}
        {/* To Be Continued marker at the end, always below last dot */}
        <div />
        <div className="flex flex-col items-center justify-center col-start-2 col-end-3" style={{ paddingTop: '64px' }}>
          <span className="text-foreground text-xs md:text-base font-semibold uppercase mt-2 whitespace-nowrap text-center max-w-xs md:max-w-sm truncate">TO BE CONTINUED</span>
        </div>
        <div />
      </div>
      {/* Modal for card details */}
      <TimelineModal
        isOpen={modalIdx !== null}
        onClose={closeModal}
        card={modalIdx !== null ? sorted[modalIdx] : sorted[0]}
        currentIdx={modalIdx ?? 0}
        total={sorted.length}
        onPrev={prevModal}
        onNext={nextModal}
        events={sorted}
      />
    </section>
  );
}
