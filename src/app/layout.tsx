import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@components/layout/Header";
import { Footer } from "@components/layout/Footer";
import { getAssetPath } from "@/utils/path";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const SITE_URL = "https://csiecamp.csie.org";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "2026 臺大資訊營",
      alternateName: ["台大資訊營", "臺大資工營", "台大資工營"],
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "2026 臺大資訊營",
      alternateName: ["台大資訊營", "臺大資工營", "台大資工營"],
      url: SITE_URL,
      inLanguage: "zh-Hant",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "2026 臺大資訊營 | Code Code Nut",
    template: "%s · 2026 臺大資訊營",
  },
  description: "臺大資訊營（台大資工營），是臺大資工系學生每年暑假舉辦的營隊，旨在讓高中生體驗資工系的課程與日常，培養程式設計能力與團隊合作精神。",
  verification: {
    google: "WTpVLpeMrKmQ_FlcfDPD5TtP8k5hDzvsUzsIbXb30eg",
  },
  metadataBase: typeof window === "undefined" ? new URL(SITE_URL) : undefined,
  openGraph: {
    title: "2026 臺大資訊營 | Code Code Nut",
    description: "臺大資訊營（台大資工營），是臺大資工系學生每年暑假舉辦的營隊，旨在讓高中生體驗資工系的課程與日常，培養程式設計能力與團隊合作精神。",
    type: "website",
    url: SITE_URL,
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
        {GA_MEASUREMENT_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="icon" href={getAssetPath("/favicon.ico")}/>
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 bg-sky">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

