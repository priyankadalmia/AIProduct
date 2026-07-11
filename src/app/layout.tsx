import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BumpJournal - Your Pregnancy Journey",
  description:
    "A beautiful pregnancy journaling app to capture every moment of your journey to motherhood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-muted/50 py-8">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-text-secondary">
            <p>BumpJournal &mdash; Cherishing every moment of your pregnancy journey</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
