import React from "react";
import type { TimelineModalHeaderProps } from "./TimelineModal.types";

const TimelineModalHeader: React.FC<Pick<TimelineModalHeaderProps, 'title' | 'date'>> = ({ title, date }) => (
  <div className="z-20 bg-card/95 pt-10 sm:pt-8 md:pt-6 pt-[env(safe-area-inset-top)] pb-2 flex flex-col rounded-t-2xl mb-3" style={{backdropFilter: 'blur(2px)'}}>
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-1 leading-tight w-full break-words">
      {title}
    </h2>
    <div className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-3 py-0.5 mb-2 mx-auto rounded-full tracking-wide shadow-sm">
      {date}
    </div>
  </div>
);

export default TimelineModalHeader;
