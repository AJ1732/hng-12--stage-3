import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Header, Sidebar } from "@/components/layout";
import { SidebarProvider } from "@/provider/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPT",
  description: "Generated by 1732",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`grid antialiased md:grid-cols-[5rem_1fr] md:[&>*:nth-child(2)]:col-start-2`}
      >
        <SidebarProvider>
          <Sidebar />
          <main className="min-h-dvh [&>*:nth-child(2)]:mt-16">
            <Header />
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
