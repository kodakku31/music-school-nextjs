import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import Script from 'next/script';

// フォントの最適化: 必要なサブセットのみ読み込み、display指定でレンダリング方法を最適化
const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  weight: ['400', '700'], // 必要な太さのみ指定して軽量化
  subsets: ["latin"],
  display: 'swap', // テキストをすぐに表示し、フォントは後から適用
  preload: true,
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  weight: ['400', '500'],
  display: 'swap',
  preload: true,
  fallback: ['serif'], // フォールバックフォントを指定
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "音楽教室 | Music School",
  description: "音楽を愛する全ての人のための音楽教室",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

// themeColorをCSSカスタムプロパティとして設定
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="音楽教室" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Font Awesome を遅延読み込みに変更 */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <style>
          {`:root {
            --theme-color-light: #ffffff;
            --theme-color-dark: #222222;
          }
          @media (prefers-color-scheme: light) {
            :root {
              --theme-color: var(--theme-color-light);
            }
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --theme-color: var(--theme-color-dark);
            }
          }
          body {
            background-color: var(--theme-color);
          }
          `}
        </style>
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        {/* Font Awesome を遅延読み込み */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"
          integrity="sha512-GWzVrcGlo0TxTRvz9ttioyYJ+Wwk9Ck0G81D+eO63BaqHaJ3YZX9wuqjwgfcV/MrB2PhaVX9DkYVhbFpStnqpQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
