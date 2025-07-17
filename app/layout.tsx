import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootProvider from "@/components/root-provider"
import { PageTransition } from "@/components/page-transition"
import { SmoothScrollWrapper } from "@/components/smooth-scroll-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shiven Patro - Data Science Engineer & Web Developer",
  description: "Welcome to my interactive portfolio showcasing my skills in data science, web development, and software engineering.",
  keywords: ["Shiven Patro", "Data Science", "Web Development", "Portfolio", "Software Engineer"],
  authors: [{ name: "Shiven Patro" }],
  openGraph: {
    title: "Shiven Patro - Data Science Engineer & Web Developer",
    description: "Interactive portfolio showcasing skills in data science and web development",
    url: "https://shivenpatro.com",
    siteName: "Shiven Patro Portfolio",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Manufacturing+Consent&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
                const BANNED_ATTRS = ['bis_register', '__processed_', 'vsc-initialized'];
            const observer = new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (mutation.type === 'attributes') {
                      const attrName = mutation.attributeName;
                      if (BANNED_ATTRS.some(b => attrName && attrName.startsWith(b))) {
                        (mutation.target as HTMLElement).removeAttribute(attrName);
                  }
                }
              }
            });
                observer.observe(document.documentElement, { 
                    attributes: true, 
                    subtree: true
                });
          })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <RootProvider>
          <SmoothScrollWrapper>
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScrollWrapper>
        </RootProvider>
      </body>
    </html>
  )
}
