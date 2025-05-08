import React from "react";
import Image from "next/image";
import type { TimelineModalMainImageProps } from "./TimelineModal.types";

const TimelineModalMainImage: React.FC<Readonly<TimelineModalMainImageProps>> = ({ image, title, onZoom }) => (
  <div className="flex items-center justify-center w-full max-w-2xl h-[180px] md:h-[240px]">
    <div
      className="rounded-2xl border-4 border-border bg-background shadow-lg w-full h-full flex items-center justify-center"
      style={{ aspectRatio: '16/9', cursor: 'zoom-in' }}
      onClick={onZoom}
      tabIndex={0}
      aria-label="Open fullscreen gallery"
    >
      <Image
        src={image}
        alt={title}
        width={960}
        height={600}
        className="rounded-2xl object-contain w-full h-full bg-background"
        priority
      />
    </div>
  </div>
);

export default TimelineModalMainImage;
