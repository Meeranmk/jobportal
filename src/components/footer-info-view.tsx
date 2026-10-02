"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  Map,
  HelpCircle,
  Bell,
  FileWarning,
  Bug,
  Shield,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOOTER_PAGES, type FooterInfoPage } from "@/lib/footer-pages-data";

const ICONS: Record<string, any> = {
  Building2,
  Map,
  HelpCircle,
  Bell,
  FileWarning,
  Bug,
  Shield,
  FileText,
  AlertTriangle,
  ShieldCheck,
};

interface FooterInfoViewProps {
  slug: string;
}

export function FooterInfoView({ slug }: FooterInfoViewProps) {
  const page = FOOTER_PAGES[slug] || FOOTER_PAGES["about"];
  const Icon = ICONS[page.icon] || ShieldCheck;

  return (
    <div className="min-h-screen pt-20">
      {/* Header Banner */}
      <div className="bg-background-subtle border-b border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{page.pageName}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-subtle border border-border flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-2">
                {page.containerName}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {page.pageName}
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                {page.containerDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {page.sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4"
            >
              <h2 className="font-heading font-bold text-xl text-foreground">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Contact & Action Card */}
          <div className="bg-gradient-subtle border border-border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-base text-foreground">
                Have specific inquiries about {page.pageName}?
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Our support and legal assistance teams respond within 24 business hours.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/help-center">
                <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> Help Center
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="sm" className="bg-gradient-hero text-white rounded-xl text-xs font-semibold">
                  Browse Active Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
