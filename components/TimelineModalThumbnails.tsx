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
  <div className="relative flex items-center max-w-2xl w-full mt-2 mb-2 h-[56px]">
    {/* Thumbnails Row (strictly contained between arrows) */}
    <div className="w-full flex items-center justify-center relative" style={{ maxWidth: '100%' }}>
      {/* Left black edge mask & arrow */}
      <div className="relative flex-shrink-0 w-9 h-[56px] flex items-center justify-center z-30">
        <div className="absolute left-0 top-0 h-full w-9 bg-background z-20 pointer-events-none" aria-hidden="true" />
        <button
          type="button"
          onClick={handleImagePrev}
          disabled={!canImagePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 z-30 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow disabled:opacity-40"
          aria-label="Previous image"
          tabIndex={0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
      </div>
      {/* Thumbnails Row (center, scrollable, clipped) */}
      <div className="flex-1 h-[56px] overflow-hidden flex items-center relative">
        <div
          className={`w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar flex items-center scroll-snap-x-mandatory${images.length * 56 <= (window?.innerWidth ? window.innerWidth - 72 : 9999) ? ' justify-center' : ''}`}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-2 items-center">
            {images.map((img, idx) => (
              <button
                key={img + idx}
                ref={el => { thumbnailRefs.current[idx] = el; }}
                className={`mx-1 rounded-lg border-2 ${idx === selectedIdx ? 'border-primary' : 'border-transparent'} focus:outline-none`}
                style={{ width: 48, height: 48, overflow: 'hidden', flex: '0 0 auto', scrollSnapAlign: 'center' }}
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
        {/* Left black edge mask for overflow clipping */}
        <div className="absolute left-0 top-0 h-full w-9 bg-background z-20 pointer-events-none" aria-hidden="true" />
        {/* Right black edge mask for overflow clipping */}
        <div className="absolute right-0 top-0 h-full w-9 bg-background z-20 pointer-events-none" aria-hidden="true" />
      </div>
      {/* Right black edge mask & arrow */}
      <div className="relative flex-shrink-0 w-9 h-[56px] flex items-center justify-center z-30">
        <div className="absolute right-0 top-0 h-full w-9 bg-background z-20 pointer-events-none" aria-hidden="true" />
        <button
          type="button"
          onClick={handleImageNext}
          disabled={!canImageNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 z-30 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow disabled:opacity-40"
          aria-label="Next image"
          tabIndex={0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
    {/* Loading indicator (if needed) */}
    {loading && (
      <div className="absolute right-1/2 translate-x-1/2 w-6 h-6 flex items-center justify-center pointer-events-none">
        <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    )}
  </div>
);

export default TimelineModalThumbnails;
