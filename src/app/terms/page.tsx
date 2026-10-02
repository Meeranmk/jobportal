import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Terms of Service | Anikaay",
  description: "Defines the rules, responsibilities, and conditions for using the platform.",
};

export default function TermsPage() {
  return <FooterInfoView slug="terms-conditions" />;
}
