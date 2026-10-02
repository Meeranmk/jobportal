import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Grievances | Grievance Support | Anikaay",
  description: "Allows users to submit and track complaints or grievances.",
};

export default function GrievancesPage() {
  return <FooterInfoView slug="grievances" />;
}
