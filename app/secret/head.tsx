export default function Head() {
  return (
    <>
      <title>Secret Page</title>
      <meta name="description" content="Unlock the secret with Frisc the Secret Keeper." />
      {/* Open Graph */}
      <meta property="og:title" content="Secret Page" />
      <meta property="og:description" content="Unlock the secret with Frisc the Secret Keeper." />
      <meta property="og:image" content="https://jmmlabs.xyz/frisc-secret-keeper.png" />
      <meta property="og:image:alt" content="Frisc the Secret Keeper" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Secret Page" />
      <meta name="twitter:description" content="Unlock the secret with Frisc the Secret Keeper." />
      <meta name="twitter:image" content="https://jmmlabs.xyz/frisc-secret-keeper.png" />
      <meta name="twitter:image:alt" content="Frisc the Secret Keeper" />
    </>
  );
}
