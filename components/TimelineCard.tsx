"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export interface TimelineCardProps {
  title: string;
  description: string;
  images: string[];
  date: string;
  side: "left" | "right";
  idx?: number;
  inView?: boolean;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const FIRST_VIEWPORT_COUNT = 4; // Number of cards likely in first viewport

// Deterministic UTC date formatting helpers
function formatMonthUTC(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
}
function formatDayUTC(dateString: string) {
  return new Date(dateString).getUTCDate();
}
function formatYearUTC(dateString: string) {
  return new Date(dateString).getUTCFullYear();
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ title, description, images, date, side, idx = 0, inView = false, forwardedRef }) => {
  // Animation timing logic
  const isFirstBatch = idx < FIRST_VIEWPORT_COUNT;
  const duration = isFirstBatch ? 1.05 : 0.75;
  const stagger = isFirstBatch ? 0.13 : 0.08;

  return (
    // OUTER: layout, spacing, padding
    <div className="p-2 flex items-center justify-center max-w-2xl w-full min-h-[120px] h-[170px] md:h-[140px] mx-auto">
      <motion.div
        ref={forwardedRef}
        initial={{ opacity: 0, x: side === "left" ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        whileHover={{ scale: 1.045, boxShadow: "0 4px 32px 0 rgba(80,80,150,0.14)" }}
        whileTap={{ scale: 1.03 }}
        transition={{
          opacity: { type: "spring", duration: 0.6, bounce: 0.24, delay: inView ? idx * stagger : 0 },
          x: { type: "spring", duration: 0.6, bounce: 0.24, delay: inView ? idx * stagger : 0 },
          scale: { type: "tween", duration: 0.08, ease: "linear" }
        }}
        className={`bg-muted rounded-xl shadow-lg flex flex-col justify-center items-center md:flex-row md:items-center md:${side === "left" ? "flex-row" : "flex-row-reverse"} md:gap-1 w-full h-full p-3`}
        style={{ cursor: 'pointer' }}
        onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('timelineCardClick', { detail: { idx } }))}
      >
        {/* Image: hidden on sm and below */}
        {images && images.length > 0 && (
          <div className={`hidden md:flex flex-shrink-0 ${side === "left" ? "mr-3" : "ml-0"}`}>
            <Image
              src={images[0]}
              alt={`${title} - Image 1`}
              width={64}
              height={64}
              className="rounded-lg object-cover bg-background"
            />
          </div>
        )}
        {/* Title & Description: always shown except xs */}
        <div className="flex flex-col h-full justify-center items-center md:items-start order-1 md:order-none w-full">
          <h3 className="font-bold text-base text-foreground text-center md:text-left w-full">{title}</h3>
          {/* Render description as markdown for hyperlinks and formatting */}
          <div className="text-xs text-muted-foreground w-full overflow-hidden text-ellipsis text-left max-w-full break-words min-w-0 line-clamp-2 max-h-[2.6em] hidden md:block">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" target="_blank" rel="noopener noreferrer" />
                ),
                p: ({ node, ...props }) => <span {...props} />
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
        </div>
        {/* Date: always visible, centered on xs */}
        <div className="flex flex-col items-center min-w-[54px] w-auto md:w-auto justify-center order-2 md:order-none mt-2 md:mt-0">
          <span className="text-xs text-muted-foreground">{formatMonthUTC(date)}</span>
          <span className="font-bold text-xl text-foreground">{formatDayUTC(date)}</span>
          <span className="text-xs text-muted-foreground">{formatYearUTC(date)}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineCard;
