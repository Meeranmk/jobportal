import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReactGrabInit } from "@/components/react-grab-init";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anikaay.online"),
  title: {
    default: "Anikaay – Find Jobs & Build Your Career",
    template: "%s | Anikaay Jobs & Careers",
  },
  description:
    "Anikaay is an AI-powered job marketplace connecting top candidates with verified recruiters. Search thousands of roles by title, skill, company, or location.",
  keywords: [
    "jobs",
    "careers",
    "job search",
    "recruitment",
    "AI job search",
    "anikaay",
    "hiring",
    "remote jobs",
  ],
  authors: [{ name: "Anikaay", url: "https://anikaay.online" }],
  creator: "Anikaay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anikaay.online",
    siteName: "Anikaay Jobs & Careers",
    title: "Anikaay – Find Jobs & Build Your Career",
    description:
      "AI-powered job marketplace connecting top candidates with verified recruiters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anikaay – Find Jobs & Build Your Career",
    description:
      "AI-powered job marketplace connecting top candidates with verified recruiters.",
    creator: "@anikaay",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactGrabInit />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
