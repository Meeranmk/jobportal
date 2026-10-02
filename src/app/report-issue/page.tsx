import type { Metadata } from "next";
import { FooterInfoView } from "@/components/footer-info-view";

export const metadata: Metadata = {
  title: "Report Issue | Issue Reporting | Anikaay",
  description: "Helps users report technical problems, inappropriate content, or platform issues.",
};

export default function ReportIssuePage() {
  return <FooterInfoView slug="report-issue" />;
}
