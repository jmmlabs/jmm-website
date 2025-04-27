import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80">Go Home</a>
    </div>
  );
}
