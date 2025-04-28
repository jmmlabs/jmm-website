"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface TimelineCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  side: "left" | "right";
  idx?: number;
  inView?: boolean;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const FIRST_VIEWPORT_COUNT = 4; // Number of cards likely in first viewport

export const TimelineCard: React.FC<TimelineCardProps> = ({ title, description, image, date, side, idx = 0, inView = false, forwardedRef }) => {
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
        className={`bg-muted rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-center md:${side === "left" ? "flex-row" : "flex-row-reverse"} md:gap-1 w-full h-full p-3`}
        style={{ cursor: 'pointer' }}
        onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('timelineCardClick', { detail: { idx } }))}
      >
        {/* Image: hidden on sm and below */}
        <div className={`hidden md:flex flex-shrink-0 ${side === "left" ? "mr-3" : "ml-0"}`}>
          <Image
            src={image}
            alt={title}
            width={64}
            height={64}
            className="rounded-lg object-cover bg-background"
          />
        </div>
        {/* Title & Description: always shown except xs */}
        <div className="flex flex-col h-full justify-center items-center md:items-start order-1 md:order-none w-full">
          <h3 className="font-bold text-base text-foreground text-center md:text-left w-auto md:w-full">{title}</h3>
          <p className="text-xs text-muted-foreground w-full overflow-hidden text-ellipsis text-left max-w-full break-words min-w-0 line-clamp-2 max-h-[2.6em] hidden md:block">{description}</p>
        </div>
        {/* Date: always visible, centered on xs */}
        <div className="flex flex-col items-center min-w-[54px] w-auto md:w-auto justify-center order-2 md:order-none">
          <span className="text-xs text-muted-foreground">{new Date(date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
          <span className="font-bold text-xl text-foreground">{new Date(date).getDate()}</span>
          <span className="text-xs text-muted-foreground">{new Date(date).getFullYear()}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineCard;
