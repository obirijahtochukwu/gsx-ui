import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

const font = localFont({
  src: "../public/fonts/AeonikProTRIAL-Regular.otf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next app",
  description: "Swap crypto coins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${font.className} `}>{children}</body>
    </html>
  );
}
