import React from "react";
import type { TimelineModalNavigationProps } from "./TimelineModal.types";

const TimelineModalNavigation: React.FC<Readonly<TimelineModalNavigationProps>> = ({ onPrev, onNext, disablePrev, disableNext }) => (
  <div className="w-full max-w-2xl mx-auto flex flex-row items-center justify-between gap-6 mt-4 pb-6 md:pb-8">
    <button
      onClick={onPrev}
      disabled={disablePrev}
      className="px-6 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-border disabled:opacity-40 min-w-[64px] min-h-[54px] text-lg font-semibold shadow-md transition-all"
      aria-label="Previous"
    >
      <span className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
          <polyline points="15 6 9 12 15 18" />
        </svg>
        Prev
      </span>
    </button>
    <button
      onClick={onNext}
      disabled={disableNext}
      className="px-6 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-border disabled:opacity-40 min-w-[64px] min-h-[54px] text-lg font-semibold shadow-md transition-all"
      aria-label="Next"
    >
      <span className="flex items-center">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 ml-2">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </span>
    </button>
  </div>
);

export default TimelineModalNavigation;
