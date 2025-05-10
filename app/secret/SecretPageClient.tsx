"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PASSWORDS = [
  { password: "nakamarra", route: "/hannah" }
];

import { HintBubble } from "@/components/HintBubble";
import { useFloating, autoUpdate, offset, flip, shift, arrow, useDismiss, useInteractions } from "@floating-ui/react-dom-interactions";

function ForgotPasswordWithHint() {
  const [open, setOpen] = React.useState(false);
  const arrowRef = React.useRef<HTMLDivElement>(null);
  // Local DOM refs
  const buttonNodeRef = React.useRef<HTMLButtonElement | null>(null);
  const bubbleNodeRef = React.useRef<HTMLDivElement | null>(null);
  const { x, y, reference, floating, strategy, placement, middlewareData, context } = useFloating({
    placement: "bottom",
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  // Callback refs to connect both local ref and Floating UI ref
  const setButtonRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonNodeRef.current = node;
      if (typeof reference === "function") reference(node);
    },
    [reference]
  );
  const setBubbleRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      bubbleNodeRef.current = node;
      if (typeof floating === "function") floating(node);
    },
    [floating]
  );

  // Arrow positioning
  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]] as string;

  return (
    <>
      <button
        {...getReferenceProps({
          ref: setButtonRef,
          type: "button",
          className: "underline mt-3 text-muted-foreground font-semibold text-sm hover:text-primary focus:outline-none",
          tabIndex: 0,
          "aria-describedby": open ? "forgot-password-hint" : undefined,
          onClick: () => setOpen((o) => !o),
        })}
      >
        Forgot Password
      </button>
      {open && (
        <div
          {...getFloatingProps({
            ref: setBubbleRef,
            role: "tooltip",
            className: "z-50 absolute pointer-events-auto",
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              minWidth: 140,
              maxWidth: 320,
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: 0.01,
            },
            "aria-live": "polite",
          })}
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
            Hint: What is the name of the song you showed me that has your name in it?
          </div>
        </div>
      )}
    </>
  );
}

export default function SecretPageClient() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (animating) return;
    const found = PASSWORDS.find(p => p.password.toLowerCase() === input.trim().toLowerCase());
    if (found) {
      setSuccess(true);
      setAnimating(true);
      setError(false);
      setErrorMsg("");
      setTimeout(() => {
        router.push(found.route);
      }, 1400);
    } else {
      setError(true);
      setErrorMsg("Password Incorrect");
      setAnimating(true);
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
        setAnimating(false);
        setInput("");
        inputRef.current?.focus();
      }, 900);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Back Button at top left, scrolls away */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mt-4 ml-2 sm:mt-6 sm:ml-6 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-card/80 text-foreground border border-border shadow hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60 backdrop-blur-sm text-sm sm:text-base flex items-center whitespace-nowrap"
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <span className="ml-1 font-bold tracking-wide hidden md:inline" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>BACK</span>
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-4">SECRET PAGE</h1>
      <div className="w-full max-w-md flex flex-col items-center relative min-h-[220px] mx-auto">
        {/* Placeholder image */}
        <div className="w-full aspect-square bg-muted rounded-xl flex items-center justify-center mb-6 overflow-hidden">
          <img
            src="/frisc-secret-keeper.png"
            alt="Secret Keeper"
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        <AnimatePresence>
          {success && (
            <motion.div
              key="success-text"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="flex flex-col items-center justify-center w-full mt-8"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 32 }}
                animate={{ scale: 1.2, opacity: 1, y: 0, rotate: 360 }}
                exit={{ scale: 0.7, opacity: 0, y: 32 }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.05 }}
                className="rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg mb-2"
                style={{ width: 64, height: 64 }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                  <path d="M20 6L9.5 17L4 11.5" />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.18 }}
                className="text-green-400 font-bold text-lg"
              >
                Access Granted!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!success && (
            <motion.form
              className="w-full flex flex-col gap-3 bg-card rounded-xl p-4 shadow-lg"
              onSubmit={handleSubmit}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.4 } }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <label htmlFor="secret-password" className="font-bold text-base text-card-foreground">PASSWORD</label>
              <motion.input
                id="secret-password"
                ref={inputRef}
                type="password"
                placeholder="Enter your password"
                className={`rounded-md bg-muted px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground border ${error ? "border-red-500" : "border-input"} transition-colors`}
                autoComplete="off"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={animating}
                animate={error ? { x: [0, -16, 16, -12, 12, -8, 8, 0] } : { x: 0 }}
                transition={{ duration: 0.5, type: "tween" }}
              />
              {/* Error message removed, button stays in place */}
              <motion.button
                type="submit"
                className="mt-1 w-full bg-white text-black border border-black rounded-lg font-medium py-2 hover:bg-gray-100 transition-colors shadow-sm"
                disabled={animating}
                whileTap={!animating ? { scale: 0.97 } : {}}
                animate={error ? { backgroundColor: "#ef4444", color: "#fff", borderColor: "#ef4444" } : success ? { backgroundColor: "#22c55e", color: "#fff", borderColor: "#22c55e", scale: 1.05 } : { backgroundColor: "#fff", color: "#000", borderColor: "#000" }}
                transition={{ duration: 0.09, type: "tween" }}
              >
                ENTER IF YOU DARE
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
        {/* Forgot Password Button with HintBubble */}
        <ForgotPasswordWithHint />
      </div>
    </main>
  );
}
