import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Privacy Policy | Privacy Information | Anikaay",
  description: "Explains how personal data is collected, used, stored, and protected.",
};

export default function PrivacyPolicyPage() {
  return <FooterInfoView slug="privacy-policy" />;
}
