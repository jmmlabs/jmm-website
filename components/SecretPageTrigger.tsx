"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const IMAGE_SRC = "/small-easter-egg-frisco.png";
const DIAGONAL_DISTANCE = 120; // px, how far the image slides in/out

const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const SecretPageTrigger: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Detect mobile/touch device
  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  // Hide on outside click (mobile)
  useEffect(() => {
    if (!isMobile || !visible) return;
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobile, visible]);

  // Hide on route change (mobile only)
  useEffect(() => {
    if (!isMobile) return;
    const handleRouteChange = () => setVisible(false);
    // Listen to Next.js router events
    // next/navigation's router does not expose events, so use popstate as a workaround
    window.addEventListener("popstate", handleRouteChange);
    // Also hide on pushState/replaceState via monkey-patch (best-effort)
    const origPushState = window.history.pushState;
    const origReplaceState = window.history.replaceState;
    window.history.pushState = function (...args) {
      handleRouteChange();
      // @ts-ignore
      return origPushState.apply(this, args);
    };
    window.history.replaceState = function (...args) {
      handleRouteChange();
      // @ts-ignore
      return origReplaceState.apply(this, args);
    };
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.history.pushState = origPushState;
      window.history.replaceState = origReplaceState;
    };
  }, [isMobile]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setVisible(true);
    }
  };

  // --- FIX: Mobile tap logic ---
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (!visible) {
      setVisible(true);
    } else {
      // If visible and tap is on the image, navigate
      if (
        imageRef.current &&
        imageRef.current.contains(e.target as Node)
      ) {
        router.push("/secret");
      }
      // If visible and tap is elsewhere inside the wrapper, do nothing (let outside click handler hide)
    }
  };

  // Desktop: clicking image always navigates
  const handleImageClick = () => {
    if (!isMobile) {
      router.push("/secret");
    }
    // On mobile, navigation handled by wrapper click logic
  };

  return (
    <>
      {/* Wrapper for hotspot and image to prevent stutter */}
      <div
        ref={wrapperRef}
        onMouseEnter={!isMobile ? () => setVisible(true) : undefined}
        onMouseLeave={!isMobile ? () => setVisible(false) : undefined}
        onFocus={!isMobile ? () => setVisible(true) : undefined}
        onBlur={!isMobile ? () => setVisible(false) : undefined}
        onClick={handleWrapperClick}
        tabIndex={0}
        aria-label="Open secret cat image"
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: 60,
          height: 60,
          zIndex: 1000,
          outline: "none",
          background: "transparent",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Sliding image */}
        <img
          ref={imageRef}
          src={IMAGE_SRC}
          alt="Secret Cat"
          onClick={handleImageClick}
          tabIndex={visible ? 0 : -1}
          style={{
            width: 48,
            height: 48,
            margin: 6,
            zIndex: 1001,
            cursor: visible ? "pointer" : "default",
            boxShadow: visible ? "0 4px 24px rgba(0,0,0,0.2)" : "none",
            borderRadius: "50%",
            userSelect: "none",
            pointerEvents: visible ? "auto" : "none",
            transition: "opacity 0.3s, transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translate(0, 0)"
              : "translate(0, 20px)", // Slide up into view
          }}
          aria-hidden={!visible}
        />
      </div>
    </>
  );
};

export default SecretPageTrigger;
