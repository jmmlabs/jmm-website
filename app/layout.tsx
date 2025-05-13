import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SecretPageTrigger from "@/components/SecretPageTrigger";
import { Analytics } from "@vercel/analytics/react";
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

// Precompute JSON-LD outside of the component to ensure deterministic SSR/CSR output
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "JMM LABS",
  "url": "https://jmmlabs.xyz/"
};
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jacob Meyer",
  "image": "https://jmmlabs.xyz/jacob.jpg",
  "sameAs": [
    "https://twitter.com/jmmxyz",
    "https://www.linkedin.com/in/jacob-meyer-7a4b6b1a5/"
  ],
  "jobTitle": "Product Designer / Builder",
  "worksFor": {
    "@type": "Organization",
    "name": "JMM LABS"
  },
  "description": "Showcasing a passion for building innovative products, making the world better, solving real problems, spreading love and happiness, and embracing lifelong learning—welcome to JMM LABS."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* WebSite JSON-LD for Google Rich Results */}
        <script
          key="website-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd)
          }}
        />
        <script
          key="person-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd)
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <SecretPageTrigger />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
  metadataBase: new URL("https://jmmlabs.xyz/"),
  title: {
    default: "Jacob Meyer | JMM LABS",
    template: "%s | JMM LABS"
  },
  description:
    "Showcasing a passion for building innovative products, making the world better, solving real problems, spreading love and happiness, and embracing lifelong learning—welcome to JMM LABS.",
  generator: "v0.dev",
  keywords: [
    "Jacob Meyer",
    "JMM LABS",
    "portfolio",
    "product design",
    "innovation",
    "problem solving",
    "happiness",
    "learning"
  ],
  openGraph: {
    title: "Jacob Meyer | JMM LABS",
    description:
      "Showcasing a passion for building innovative products, making the world better, solving real problems, spreading love and happiness, and embracing lifelong learning—welcome to JMM LABS.",
    url: "https://jmmlabs.xyz/",
    siteName: "JMM LABS",
    images: [
      {
        url: "https://jmmlabs.xyz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jacob Meyer, JMM LABS, Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@Jacob___Meyer",
    title: "Jacob Meyer | JMM LABS",
    description:
      "Showcasing a passion for building innovative products, making the world better, solving real problems, spreading love and happiness, and embracing lifelong learning—welcome to JMM LABS.",
    images: [
      {
        url: "https://jmmlabs.xyz/og-image.jpg",
        alt: "Jacob Meyer, JMM LABS, Portfolio"
      }
    ]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export const viewport = {
  themeColor: "#18181b",
};