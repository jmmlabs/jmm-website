"use client"
import React from "react";
import { timelineData } from "../data/timelineData";
import TimelineCard from "./TimelineCard";

export const Timeline: React.FC = () => {
  // Sort events by date ascending
  const sorted = [...timelineData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section className="relative w-full flex flex-col items-center pt-8 pb-16 px-2">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">OUR STORY</h2>
      <div className="relative w-full max-w-4xl mx-auto h-[80vh] overflow-y-auto snap-y snap-mandatory grid grid-cols-3 gap-x-0 items-start">
        {/* Timeline vertical line: ends with sufficient space above TO BE CONTINUED */}
        <div className="absolute left-1/2 z-0 -translate-x-1/2 bg-border w-2" style={{ top: 'calc(70px)', bottom: 'calc(100px)' }} />
        {/* Timeline cards and dots */}
        {sorted.map((event, idx) => (
          <React.Fragment key={event.date + event.title}>
            {/* Left column (even idx) */}
            <div className={`col-span-1 flex justify-end items-center min-h-[140px] snap-start ${idx % 2 === 0 ? '' : 'invisible'}`}
              style={{ zIndex: 2 }}>
              {idx % 2 === 0 && <TimelineCard {...event} side="left" />}
            </div>
            {/* Center column (timeline dots) */}
            <div className="col-span-1 flex flex-col items-center justify-center relative min-h-[140px] z-10">
              <div className="w-5 h-5 bg-background border-4 border-border rounded-full" />
            </div>
            {/* Right column (odd idx) */}
            <div className={`col-span-1 flex justify-start items-center min-h-[140px] snap-start ${idx % 2 === 1 ? '' : 'invisible'}`}
              style={{ zIndex: 2 }}>
              {idx % 2 === 1 && <TimelineCard {...event} side="right" />}
            </div>
          </React.Fragment>
        ))}
        {/* To Be Continued marker at the end */}
        <div className="col-span-1" />
        <div className="col-span-1 flex flex-col items-center" style={{ paddingTop: '64px' }}>
          <span className="text-foreground text-lg font-semibold uppercase mt-2">TO BE CONTINUED</span>
        </div>
        <div className="col-span-1" />
      </div>
    </section>
  );
};

export default Timeline;
