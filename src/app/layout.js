import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { BackToTop } from "../components/common/BackToTop";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ShopifyUI",
    template: "%s | ShopifyUI",
  },
  description: "A comprehensive UI component library and design system for Shopify applications",
  keywords: ["Shopify", "UI", "Components", "Design System", "React", "Next.js"],
  authors: [{ name: "ShopifyUI Team" }],
  creator: "ShopifyUI Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shopifyui.dev",
    title: "ShopifyUI",
    description: "A comprehensive UI component library and design system for Shopify applications",
    siteName: "ShopifyUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopifyUI",
    description: "A comprehensive UI component library and design system for Shopify applications",
    creator: "@shopifyui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
