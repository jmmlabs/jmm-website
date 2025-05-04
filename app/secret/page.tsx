// Server component for /secret page
// No "use client" directive here!

export const metadata = {
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

import SecretPageClient from "./SecretPageClient";

export default function SecretPage() {
  return <SecretPageClient />;
}
