import type { Metadata } from "next";
import { Main } from "@/components/custom";
import { Header, Sidebar } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/provider/_index";
import "./globals.css";

export const metadata: Metadata = {
  title: "TPI - AI-powered Text processor Interface",
  description:
    "This application will allow users to input text and utilize features such as summarization, translation, and language detection.",
  authors: [{ name: "1732", url: "https://github.com/AJ1732" }],
  openGraph: {
    title: "TPI - AI-powered Text processor Interface",
    description:
      "This application will allow users to input text and utilize features such as summarization, translation, and language detection.",
    type: "website",
    locale: "en_US",
    siteName: "TPI - AI-powered Text processor Interface",
    url: "https://1732-hng-12-stage-3.netlify.app/",
    images: [
      {
        url: "https://res.cloudinary.com/dszm6ufc6/image/upload/v1739978163/cgegwalgt1o2yunh9zzu.png",
        width: 1200,
        height: 630,
        alt: "TPI - AI-powered Text processor Interface",
      },
    ],
  },
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
      <head>
        <meta
          name="translator-api-trial-token"
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_TRANSLATOR_API_TRIAL_TOKEN}
        />
        <meta
          name="language-api-trial-token"
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_LANGUAGE_API_TRIAL_TOKEN}
        />
        <meta
          name="summarizer-api-trial-token"
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_SUMMARIZER_API_TRIAL_TOKEN}
        />
      </head>
      <body className={`dark antialiased transition-colors`}>
        <Providers>
          <div className="grid md:grid-cols-[5rem_1fr] md:[&>*:nth-child(2)]:col-start-2">
            <Sidebar />
            <Main className="max-h-dvh min-h-dvh overflow-y-auto [&>*:nth-child(2)]:mt-16">
              <Header />
              {children}
            </Main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
