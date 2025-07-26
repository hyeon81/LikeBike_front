import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import BaseLayout from "@/components/BaseLayout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "LIKE BIKE",
  description: "LIKE BIKE는 자전거를 타는 사람들을 위한 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${notoSansKR.className} antialiased font-noto`}>
        <AppRouterCacheProvider>
          <BaseLayout>{children}</BaseLayout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
