"use client";
import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, arrow, autoUpdate } from "@floating-ui/react-dom-interactions";

import { Placement, Strategy, MiddlewareData } from '@floating-ui/react-dom-interactions';

interface HintBubbleProps {
  open: boolean;
  onClose: () => void;
  floatingRef: React.Ref<HTMLDivElement>;
  x: number | null;
  y: number | null;
  strategy: Strategy;
  placement: Placement;
  middlewareData: MiddlewareData;
  arrowRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export const HintBubble: React.FC<HintBubbleProps> = ({ open, onClose, floatingRef, x, y, strategy, placement, middlewareData, arrowRef, children }) => {

  // Click-away and ESC support
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const floatingEl = (floatingRef as React.RefObject<HTMLDivElement>)?.current;
      if (
        floatingEl instanceof HTMLElement &&
        !floatingEl.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose, floatingRef]);

  if (!open) return null;

  // Arrow positioning
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]] as string;

  const bubble = (
    <div
      ref={floatingRef}
      role="tooltip"
      className="z-50 absolute pointer-events-auto"
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        minWidth: 140,
        maxWidth: 320,
        fontFamily: 'system-ui, sans-serif',
        letterSpacing: 0.01,
      }}
      aria-live="polite"
    >
      {/* Arrow */}
      <div
        ref={arrowRef}
        className="w-3 h-3 border border-zinc-700 dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-900 rotate-45 absolute"
        style={{
          left: middlewareData.arrow?.x != null ? middlewareData.arrow.x : undefined,
          top: middlewareData.arrow?.y != null ? middlewareData.arrow.y : undefined,
          [staticSide]: "-6px",
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'
        }}
      />
      <div className="bg-zinc-900 border border-zinc-700 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-100 dark:text-zinc-100 rounded-md px-3 py-1.5 shadow-lg text-xs font-medium text-center animate-fade-in select-none overflow-y-auto">
        {children}
      </div>
    </div>
  );

  return typeof window !== "undefined" ? createPortal(bubble, document.body) : null;
};

// Tailwind animation (add to globals.css or tailwind.config if not present)
// @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
// .animate-fade-in { animation: fade-in 0.18s cubic-bezier(0.4,0,0.2,1) both; }
