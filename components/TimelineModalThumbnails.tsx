import React from "react";
import Image from "next/image";
import type { TimelineModalThumbnailsProps } from "./TimelineModal.types";

const TimelineModalThumbnails: React.FC<Readonly<TimelineModalThumbnailsProps>> = ({
  images,
  selectedIdx,
  onSelect,
  thumbnailRefs,
  canImagePrev,
  canImageNext,
  handleImagePrev,
  handleImageNext,
  loading,
}) => (
  <div className="relative flex justify-center items-center max-w-2xl w-full mt-2 mb-2 h-[56px] pointer-events-none">
    {/* Arrow Button: Left */}
    <button
      type="button"
      onClick={handleImagePrev}
      disabled={!canImagePrev}
      className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 z-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow pointer-events-auto disabled:opacity-40"
      aria-label="Previous image"
      tabIndex={0}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="15 6 9 12 15 18" />
      </svg>
    </button>
    {/* Thumbnails */}
    <div className="flex justify-center items-center gap-2 px-12 w-full pointer-events-auto">
      <div className="flex gap-2 justify-center items-center">
        {images.map((img, idx) => (
          <button
            key={img + idx}
            ref={el => { thumbnailRefs.current[idx] = el; }}
            className={`mx-1 rounded-lg border-2 ${idx === selectedIdx ? 'border-primary' : 'border-transparent'} focus:outline-none`}
            style={{ width: 48, height: 48, overflow: 'hidden', flex: '0 0 auto' }}
            onClick={() => onSelect(idx)}
            aria-label={`Thumbnail ${idx + 1}`}
            tabIndex={0}
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
      </div>
    </div>
    {/* Arrow Button: Right */}
    <button
      type="button"
      onClick={handleImageNext}
      disabled={!canImageNext}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 z-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow pointer-events-auto disabled:opacity-40"
      aria-label="Next image"
      tabIndex={0}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </button>
    {/* Loading indicator (if needed) */}
    {loading && (
      <div className="absolute right-1/2 translate-x-1/2 w-6 h-6 flex items-center justify-center pointer-events-none">
        <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    )}
  </div>
);

export default TimelineModalThumbnails;
