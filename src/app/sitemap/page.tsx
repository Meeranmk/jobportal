import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Sitemap | Site Navigation | Anikaay",
  description: "Provides a complete overview of website pages and sections.",
};

export default function SitemapPage() {
  return <FooterInfoView slug="sitemap" />;
}
