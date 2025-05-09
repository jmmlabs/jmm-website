import React from "react";
import Image from "next/image";
import type { TimelineModalMainImageProps } from "./TimelineModal.types";

const TimelineModalMainImage: React.FC<Readonly<TimelineModalMainImageProps & { loading: boolean; setLoading: (loading: boolean) => void }>> = ({ image, title, onZoom, loading, setLoading }) => (
  <div className="flex items-center justify-center w-full h-[180px] md:h-[240px]">
    <div
      className="relative rounded-2xl border-4 border-border bg-background shadow-lg w-full h-full flex items-center justify-center"
      style={{ aspectRatio: '16/9', cursor: 'zoom-in' }}
      onClick={onZoom}
      tabIndex={0}
      aria-label="Open fullscreen gallery"
    >
      {loading && (
        <span className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin bg-background/80"></span>
      )}
      <Image
        src={image}
        alt={title}
        width={960}
        height={600}
        className="rounded-2xl object-contain w-full h-full bg-background"
        priority
        onLoadingComplete={() => setLoading(false)}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  </div>
);

export default TimelineModalMainImage;
