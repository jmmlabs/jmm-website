import React from "react";
import type { TimelineModalHeaderProps } from "./TimelineModal.types";

const TimelineModalHeader: React.FC<Pick<TimelineModalHeaderProps, 'title' | 'date'>> = ({ title, date }) => (
  <div className="sticky top-0 z-20 bg-card/95 pt-[env(safe-area-inset-top)] px-0 py-2 md:py-4 flex flex-col items-center rounded-t-2xl min-h-[3.5rem]" style={{backdropFilter: 'blur(2px)'}}>
    <h2 className="text-2xl md:text-3xl font-bold text-center mt-2 mb-1 leading-tight w-full break-words">
      {title}
    </h2>
    <div className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-3 py-0.5 mb-1 text-center w-auto rounded-full tracking-wide shadow-sm">
      {date}
    </div>
  </div>
);

export default TimelineModalHeader;
