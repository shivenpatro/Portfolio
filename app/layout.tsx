import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import dynamic from 'next/dynamic'

// Lazy load bug spawner on client side only
const BugSpawner = dynamic(() => import('@/components/bug-spawner'), { ssr: false });

export const metadata: Metadata = {
  title: 'Shiven Patro - Portfolio',
  description: 'Personal portfolio website of Shiven Patro, Data Science Engineer & Web Developer',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        {children}
        {/* Mini-game bug hunt spawner */}
        <BugSpawner />
        {/* This script helps with hydration issues caused by browser extensions */}
        <Script id="handle-hydration" strategy="afterInteractive">
          {`
          (function() {
            // This runs after hydration and helps clean up any attributes added by extensions
            const observer = new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (mutation.type === 'attributes') {
                  const attributeName = mutation.attributeName;
                  if (attributeName && attributeName.startsWith('bis_') ||
                      attributeName && attributeName.startsWith('__processed_')) {
                    document.body.removeAttribute(attributeName);
                  }
                }
              }
            });

            observer.observe(document.body, { attributes: true });
          })();
          `}
        </Script>
      </body>
    </html>
  )
}
