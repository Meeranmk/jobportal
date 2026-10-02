import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Fraud Alert | Fraud Prevention | Anikaay",
  description: "Provides warnings and guidance to help users identify and report fraud.",
};

export default function FraudAlertPage() {
  return <FooterInfoView slug="fraud-alert" />;
}
