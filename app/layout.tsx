import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cover and Copy",
  description: "Upload a script and generate short-form cover copy and cover art."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
