import React from "react";
import type { TimelineModalHeaderProps } from "./TimelineModal.types";

const TimelineModalHeader: React.FC<Readonly<TimelineModalHeaderProps>> = ({ title, date, onClose }) => (
  <div className="sticky top-0 z-20 bg-card/95 pt-[env(safe-area-inset-top)] px-4 pb-2 flex flex-col items-center rounded-t-2xl min-h-[3.5rem]" style={{backdropFilter: 'blur(2px)'}}>
    <div className="w-full flex justify-end">
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow hover:bg-border hover:text-foreground focus:outline-none transition-all"
        aria-label="Close modal"
        style={{ fontSize: 28 }}
        tabIndex={0}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-center mt-2 mb-1 leading-tight w-full break-words">
      {title}
    </h2>
    <div className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-3 py-0.5 mb-1 text-center w-auto rounded-full tracking-wide shadow-sm">
      {date}
    </div>
  </div>
);

export default TimelineModalHeader;
