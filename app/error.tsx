"use client";
import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error?.message || "An unexpected error occurred."}</p>
      <button
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
