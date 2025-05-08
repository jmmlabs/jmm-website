import React from "react";
import Image from "next/image";
import type { TimelineModalThumbnailsProps } from "./TimelineModal.types";

const TimelineModalThumbnails: React.FC<Readonly<TimelineModalThumbnailsProps>> = ({ images, selectedIdx, onSelect, thumbnailRefs }) => (
  <div className="flex justify-center items-center max-w-2xl w-full mt-2 mb-2 gap-2 h-[56px] overflow-x-auto hide-scrollbar">
    {/* Arrow Button: Left */}
    <button
      type="button"
      onClick={() => onSelect(Math.max(selectedIdx - 1, 0))}
      disabled={selectedIdx === 0 || images.length === 1}
      className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center disabled:opacity-40"
      aria-label="Previous image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="15 6 9 12 15 18" />
      </svg>
    </button>
    {/* Thumbnails */}
    {images.map((img, idx) => (
      <button
        key={img + idx}
        ref={el => { thumbnailRefs.current[idx] = el; }}
        className={`mx-1 rounded-lg border-2 ${idx === selectedIdx ? 'border-primary' : 'border-transparent'} focus:outline-none`}
        style={{ width: 48, height: 48, overflow: 'hidden', flex: '0 0 auto' }}
        onClick={() => onSelect(idx)}
        aria-label={`Thumbnail ${idx + 1}`}
      >
        <Image
          src={img}
          alt={`Thumbnail ${idx + 1}`}
          width={48}
          height={48}
          className="object-cover w-full h-full rounded"
        />
      </button>
    ))}
    {/* Arrow Button: Right */}
    <button
      type="button"
      onClick={() => onSelect(Math.min(selectedIdx + 1, images.length - 1))}
      disabled={selectedIdx === images.length - 1 || images.length === 1}
      className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center disabled:opacity-40"
      aria-label="Next image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </button>
  </div>
);

export default TimelineModalThumbnails;
