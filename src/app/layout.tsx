import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { getAssetPath } from "@/utils/path";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "2026 臺大資訊營",
    template: "%s · 2026 臺大資訊營",
  },
  description: "Code Code Nut",
  verification: {
    google: "WTpVLpeMrKmQ_FlcfDPD5TtP8k5hDzvsUzsIbXb30eg",
  },
  metadataBase: typeof window === "undefined" ? new URL("https://csiecamp.csie.org") : undefined,
  openGraph: {
    title: "2026 臺大資訊營",
    description: "Code Code Nut",
    type: "website",
    url: "https://csiecamp.csie.org",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="icon" href={getAssetPath("/favicon.ico")}/>
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        ) : null}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-sky">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

