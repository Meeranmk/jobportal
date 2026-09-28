"use client";

import * as React from "react";
import Link from "next/link";
import { Briefcase, Globe, AtSign, Code2, Mail } from "lucide-react";

const FOOTER_LINKS = {
  "Find Work": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Remote Jobs", href: "/jobs?location=remote" },
    { label: "Technology Jobs", href: "/jobs/technology" },
    { label: "Design Jobs", href: "/jobs/design" },
    { label: "Marketing Jobs", href: "/jobs/marketing" },
    { label: "Companies", href: "/companies" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "/employers" },
    { label: "Recruiter Sign Up", href: "/auth/register?role=recruiter" },
    { label: "Pricing", href: "/employers#pricing" },
    { label: "Enterprise", href: "/employers#enterprise" },
  ],
  "Career Resources": [
    { label: "Career Guides", href: "/career-resources" },
    { label: "Interview Prep", href: "/career-resources?category=interview" },
    { label: "Resume Tips", href: "/career-resources?category=resume" },
    { label: "Salary Insights", href: "/career-resources?category=salary" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Globe, href: "https://twitter.com/anikaay", label: "Twitter / X" },
  { icon: AtSign, href: "https://linkedin.com/company/anikaay", label: "LinkedIn" },
  { icon: Code2, href: "https://github.com/anikaay", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@anikaay.online", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background overflow-hidden" aria-label="Site footer">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-base text-gradient">Anikaay</span>
                <span className="text-[9px] font-medium text-muted-foreground tracking-widest uppercase">
                  Jobs & Careers
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-48">
              AI-powered job marketplace connecting top talent with verified employers worldwide.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-heading font-semibold text-sm mb-4 text-foreground">{section}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground link-underline transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Anikaay. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
