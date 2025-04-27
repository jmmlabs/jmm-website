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
    <motion.article
      ref={forwardedRef}
      className={`bg-muted rounded-xl shadow-lg flex items-center md:gap-3 p-4 max-w-sm w-full min-h-[120px] h-[120px]
        ${side === "left" ? "flex-row" : "flex-row-reverse"} justify-center md:justify-normal`}
      initial={{ opacity: 0, x: side === "left" ? -80 : 80 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, type: "spring", bounce: 0.24, delay: inView ? idx * stagger : 0 }}
    >
      {/* Image: hidden on sm and below */}
      <div className="hidden md:flex flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={64}
          height={64}
          className="rounded-lg object-cover bg-background"
        />
      </div>
      {/* Title & Description: always shown except xs */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <h3 className="font-bold text-lg text-foreground truncate block xs:hidden sm:block">{title}</h3>
        {/* Hide description on xs screens */}
        <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">{description}</p>
      </div>
      {/* Date: always visible, centered on xs */}
      <div className="flex flex-col items-center min-w-[54px] w-full md:w-auto justify-center">
        <span className="text-xs text-muted-foreground">{new Date(date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
        <span className="font-bold text-xl text-foreground">{new Date(date).getDate()}</span>
        <span className="text-xs text-muted-foreground">{new Date(date).getFullYear()}</span>
      </div>
    </motion.article>
  );
};

export default TimelineCard;
