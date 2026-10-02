import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "About Us | Company Information | Anikaay",
  description: "Introduces the company, mission, vision, and values.",
};

export default function AboutPage() {
  return <FooterInfoView slug="about" />;
}
