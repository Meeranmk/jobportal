import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Help Center | Support Center | Anikaay",
  description: "Offers answers, FAQs, and guidance for common user questions.",
};

export default function HelpCenterPage() {
  return <FooterInfoView slug="help-center" />;
}
