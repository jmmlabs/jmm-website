"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const IMAGE_SRC = "/small-easter-egg-frisco.png";
const DIAGONAL_DISTANCE = 120; // px, how far the image slides in/out

const isTouchDevice = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

const SecretPageTrigger: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
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
        imageRef.current &&
        !imageRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobile, visible]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setVisible(true);
    }
  };

  const handleImageClick = () => {
    router.push("/secret");
  };

  return (
    <>
      {/* Wrapper for hotspot and image to prevent stutter */}
      <div
        onMouseEnter={!isMobile ? () => setVisible(true) : undefined}
        onMouseLeave={!isMobile ? () => setVisible(false) : undefined}
        onFocus={!isMobile ? () => setVisible(true) : undefined}
        onBlur={!isMobile ? () => setVisible(false) : undefined}
        onTouchStart={isMobile ? () => setVisible((v) => !v) : undefined}
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
