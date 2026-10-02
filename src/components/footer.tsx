"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Globe,
  AtSign,
  Code2,
  Mail,
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
  ArrowRight,
} from "lucide-react";

export const FOOTER_SECTIONS = [
  {
    containerName: "Company Information",
    items: [
      {
        pageName: "About Us",
        href: "/about",
        description: "Introduces the company, mission, vision, and values.",
        icon: Building2,
      },
      {
        pageName: "Sitemap",
        href: "/sitemap",
        description: "Provides a complete overview of website pages and sections.",
        icon: Map,
      },
    ],
  },
  {
    containerName: "Support & Grievances",
    items: [
      {
        pageName: "Help center",
        href: "/help-center",
        description: "Offers answers, FAQs, and guidance for common user questions.",
        icon: HelpCircle,
      },
      {
        pageName: "Grievances",
        href: "/grievances",
        description: "Allows users to submit and track complaints or grievances.",
        icon: FileWarning,
      },
      {
        pageName: "Report issue",
        href: "/report-issue",
        description: "Helps users report technical problems, inappropriate content, or platform issues.",
        icon: Bug,
      },
    ],
  },
  {
    containerName: "Legal Notices & Terms",
    items: [
      {
        pageName: "Summons/Notices",
        href: "/summons-notices",
        description: "Displays official summons, notices, announcements, and legal communications.",
        icon: Bell,
      },
      {
        pageName: "Privacy policy",
        href: "/privacy-policy",
        description: "Explains how personal data is collected, used, stored, and protected.",
        icon: Shield,
      },
      {
        pageName: "Terms & conditions",
        href: "/terms-conditions",
        description: "Defines the rules, responsibilities, and conditions for using the platform.",
        icon: FileText,
      },
    ],
  },
  {
    containerName: "Safety & Prevention",
    items: [
      {
        pageName: "Fraud alert",
        href: "/fraud-alert",
        description: "Provides warnings and guidance to help users identify and report fraud.",
        icon: AlertTriangle,
      },
      {
        pageName: "Trust & safety",
        href: "/trust-safety",
        description: "Shares trust, safety, security, and responsible-use information.",
        icon: ShieldCheck,
      },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Globe, href: "https://twitter.com/anikaay", label: "Twitter / X" },
  { icon: AtSign, href: "https://linkedin.com/company/anikaay", label: "LinkedIn" },
  { icon: Code2, href: "https://github.com/anikaay", label: "GitHub" },
  { icon: Mail, href: "mailto:support@anikaay.online", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background overflow-hidden" aria-label="Site footer">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand & Mission Banner */}
        <div className="pb-12 border-b border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-xl text-gradient">Anikaay</span>
                <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mt-0.5">
                  India Jobs & Careers
                </span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              India's transparent AI-powered career discovery ecosystem connecting verified employers with high-caliber talent across Bengaluru, Mumbai, Delhi NCR, Hyderabad, and Remote.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* 4 Dedicated Sections Showcasing All 10 Required Items */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.containerName} className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {section.containerName}
              </div>

              <div className="space-y-3">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.pageName}
                      href={item.href}
                      className="group block p-3 rounded-2xl border border-border/60 bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-2 font-heading font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                        <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>{item.pageName}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground/90 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar with Direct Links & Disclaimer */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Anikaay Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-conditions" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/fraud-alert" className="hover:text-foreground transition-colors">Fraud Alert</Link>
            <span>•</span>
            <Link href="/grievances" className="hover:text-foreground transition-colors">Grievances</Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
