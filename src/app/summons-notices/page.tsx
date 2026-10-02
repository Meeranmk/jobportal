import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Summons/Notices | Legal Notices | Anikaay",
  description: "Displays official summons, notices, announcements, and legal communications.",
};

export default function SummonsNoticesPage() {
  return <FooterInfoView slug="summons-notices" />;
}
