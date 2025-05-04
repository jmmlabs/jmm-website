import HannahPageClient from "./HannahPageClient";

export const metadata = {
  title: "Hannah & Jacob's Story",
  description: "A timeline of Hannah & Jacob's story. ",
  openGraph: {
    title: "Hannah & Jacob's Story",
    description: "A timeline of Hannah & Jacob's story.",
    images: [
      {
        url: "/frisc-secret-keeper.png",
        width: 1200,
        height: 630,
        alt: "Hannah & Jacob's Story OG Image"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hannah & Jacob's Story",
    description: "A timeline of Hannah & Jacob's story.",
    images: [
      {
        url: "/frisc-secret-keeper.png",
        width: 1200,
        height: 630,
        alt: "Hannah & Jacob's Story OG Image"
      }
    ]
  }
};

export default async function HannahPage() {
  return <HannahPageClient />;
}