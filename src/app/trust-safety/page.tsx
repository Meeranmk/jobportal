import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Trust & Safety | Safety Center | Anikaay",
  description: "Shares trust, safety, security, and responsible-use information.",
};

export default function TrustSafetyPage() {
  return <FooterInfoView slug="trust-safety" />;
}
