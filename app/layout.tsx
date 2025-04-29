import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SecretPageTrigger from "@/components/SecretPageTrigger";
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "JMM LABS",
              "url": "https://jmmlabs.xyz/"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jacob Meyer",
              "url": "https://jmmlabs.xyz/",
              "image": "https://jmmlabs.xyz/og-image.jpg",
              "sameAs": [
                "https://twitter.com/Jacob___Meyer",
                "https://www.linkedin.com/in/jacobmatthewmeyer/"
              ],
              "jobTitle": "Product Designer / Builder",
              "worksFor": {
                "@type": "Organization",
                "name": "JMM LABS"
              },
              "description": "Showcasing a passion for building innovative products, making the world better, solving real problems, spreading love and happiness, and embracing lifelong learning—welcome to JMM LABS."
            })
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <SecretPageTrigger />
      </body>
    </html>
  )
}

export const metadata = {
  title: "Jacob Meyer | JMM LABS",
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
