"use client"

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PASSWORDS = [
  { password: "nakamarra", route: "/hannah" }
];

export default function SecretPage() {
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
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-background text-foreground">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-4">SECRET PAGE</h1>
      <div className="w-full max-w-md flex flex-col items-center relative min-h-[220px]">
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
        <AnimatePresence>
          {!success && (
            <motion.button
              key="forgot-password"
              type="button"
              className="underline mt-3 text-muted-foreground font-semibold text-sm hover:text-primary"
              tabIndex={-1}
              aria-disabled="true"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
            >
              Forgot Password
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
