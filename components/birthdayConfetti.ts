// Add a minimal confetti effect using canvas-confetti for the birthday animation
// This script is loaded dynamically only when needed
import confetti from "canvas-confetti";
export function launchBirthdayConfetti() {
  // Fire confetti for 1 second, then stop
  const duration = 1 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#bb0000", "#ffffff", "#FFD700", "#00bb00"],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#bb0000", "#ffffff", "#FFD700", "#00bb00"],
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
