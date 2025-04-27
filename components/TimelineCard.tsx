"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TimelineEvent } from "../data/timelineData";

interface TimelineCardProps extends TimelineEvent {
  side: "left" | "right";
}

// Placeholder: styling and animation to be refined
export const TimelineCard: React.FC<TimelineCardProps> = ({ title, description, image, date, side }) => {
  return (
    <motion.article
      className={`bg-muted rounded-xl shadow-lg flex items-center md:gap-3 p-4 max-w-sm w-full min-h-[120px] h-[120px]
        ${side === "left" ? "flex-row" : "flex-row-reverse"} justify-center md:justify-normal`}
      initial={{ opacity: 0, x: side === "left" ? -80 : 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.24 }}
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
