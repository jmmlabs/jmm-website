export default function Head() {
  return (
    <>
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
    </>
  );
}
