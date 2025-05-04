import HannahPageClient from "./HannahPageClient";

export const metadata = {
  title: "HLT Surprise",
  description: "A timeline of Hannah & Jacob's story. ",
  openGraph: {
    title: "HLT Surprise",
    description: "A timeline of Hannah & Jacob's story.",
    images: [
      {
        url: "/frisc-secret-keeper.png",
        width: 1200,
        height: 630,
        alt: "HLT Surprise OG Image"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HLT Surprise",
    description: "A timeline of Hannah & Jacob's story.",
    images: [
      {
        url: "/frisc-secret-keeper.png",
        width: 1200,
        height: 630,
        alt: "HLT Surprise OG Image"
      }
    ]
  }
};

export default async function HannahPage() {
  return <HannahPageClient />;
}