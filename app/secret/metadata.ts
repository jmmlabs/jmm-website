import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secret Page",
  description: "Unlock the secret with Frisc the Secret Keeper.",
  openGraph: {
    title: "Secret Page",
    description: "Unlock the secret with Frisc the Secret Keeper.",
    images: [
      {
        url: "/frisc-secret-keeper.png",
        width: 800,
        height: 800,
        alt: "Frisc the Secret Keeper"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Secret Page",
    description: "Unlock the secret with Frisc the Secret Keeper.",
    images: [
      {
        url: "/frisc-secret-keeper.png",
        width: 800,
        height: 800,
        alt: "Frisc the Secret Keeper"
      }
    ]
  }
};

export default metadata;
