import HannahPageClient from "./HannahPageClient";

export const metadata = {
  title: "HLT Surprise",
  description: "A suprise for Hannah :)",
  openGraph: {
    title: "HLT Surprise",
    description: "A suprise for Hannah :)",
    images: [
      {
        url: "/hannah-timeline/01-meet-cute/img1-hannah-first-look.jpg",
        width: 1200,
        height: 630,
        alt: "A suprise for Hannah :)"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HLT Surprise",
    description: "A suprise for Hannah :)",
    images: [
      {
        url: "/hannah-timeline/01-meet-cute/img1-hannah-first-look.jpg",
        width: 1200,
        height: 630,
        alt: "A suprise for Hannah :)"
      }
    ]
  }
};

export default async function HannahPage() {
  return <HannahPageClient />;
}