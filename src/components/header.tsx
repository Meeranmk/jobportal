"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Briefcase,
  Building2,
  BookOpen,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  LogIn,
  PenSquare,
  Clock,
  IndianRupee,
  Layers,
  ArrowRight,
  Laptop,
  TrendingUp,
  Landmark,
  Megaphone,
  Users,
  GraduationCap,
  FileCode2,
  Flame,
  Calendar,
  CalendarCheck,
  Inbox,
  Archive,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AiSearchModal } from "@/components/ai-search-modal";

gsap.registerPlugin();

// ── Dropdown Configuration (Stripe Style) ──────────────────────────
export const HEADER_DROPDOWNS = {
  job: {
    label: "Job",
    categoryHeader: "Popular Job Categories",
    subHeader: "12,400+ Active Roles in India",
    items: [
      {
        label: "IT Jobs",
        href: "/jobs?industry=IT",
        description: "Software, Cloud, DevOps & Full Stack",
        icon: Laptop,
        color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
      },
      {
        label: "Sales Jobs",
        href: "/jobs?industry=Sales",
        description: "Enterprise B2B, SDRs & Account Execs",
        icon: TrendingUp,
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
      },
      {
        label: "Accounting Jobs",
        href: "/jobs?industry=Finance",
        description: "Finance, CA, Audit, Tax & FinOps",
        icon: Landmark,
        color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
      },
      {
        label: "Digital Marketing Jobs",
        href: "/jobs?industry=Marketing",
        description: "SEO, Performance, Growth & Social Media",
        icon: Megaphone,
        color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
      },
      {
        label: "HR Jobs",
        href: "/jobs?department=Human+Resources",
        description: "Talent Acquisition, People Ops & Culture",
        icon: Users,
        color: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
      },
      {
        label: "Data Science Jobs",
        href: "/jobs?q=Data+Scientist",
        description: "Machine Learning, GenAI & Big Data",
        icon: Sparkles,
        color: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
      },
    ],
    footerText: "Pre-screened verified Indian employers",
    footerLinkText: "Browse All Active Jobs",
    footerHref: "/jobs",
  },
  employmentType: {
    label: "Employment Type",
    categoryHeader: "Work Arrangements & Contracts",
    subHeader: "India Workplaces",
    items: [
      {
        label: "Full-time",
        href: "/jobs?type=full-time",
        description: "Permanent roles with health cover & PF",
        badge: "Permanent",
        icon: Briefcase,
        color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
      },
      {
        label: "Part-time",
        href: "/jobs?type=part-time",
        description: "Flexible schedules & weekly stipends",
        badge: "Flexible",
        icon: Clock,
        color: "text-sky-600 dark:text-sky-400 bg-sky-500/10",
      },
      {
        label: "Contract",
        href: "/jobs?type=contract",
        description: "Project-based consulting & freelance",
        badge: "Project-based",
        icon: FileCode2,
        color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
      },
      {
        label: "Internship",
        href: "/jobs?type=internship",
        description: "Students & fresh graduate cohorts",
        badge: "Freshers",
        icon: GraduationCap,
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
      },
    ],
    footerText: "Explore Remote & Hybrid options across India",
    footerLinkText: "View Remote Jobs",
    footerHref: "/jobs?location=remote",
  },
  salaryRange: {
    label: "Salary Range",
    categoryHeader: "Compensation Tiers (INR ₹)",
    subHeader: "Annual CTC Benchmarks",
    items: [
      {
        label: "Under ₹3,00,000",
        href: "/jobs?maxSalary=300000",
        description: "Entry-level & fresh graduate positions",
        icon: IndianRupee,
        color: "text-slate-600 dark:text-slate-400 bg-slate-500/10",
      },
      {
        label: "₹3,00,000–₹4,99,999",
        href: "/jobs?minSalary=300000&maxSalary=499999",
        description: "Early career & junior associates",
        icon: IndianRupee,
        color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
      },
      {
        label: "₹5,00,000–₹7,49,999",
        href: "/jobs?minSalary=500000&maxSalary=749999",
        description: "Mid-level experienced professionals",
        icon: IndianRupee,
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
      },
      {
        label: "₹7,50,000–₹9,99,999",
        href: "/jobs?minSalary=750000&maxSalary=999999",
        description: "Senior specialists & team leads",
        icon: IndianRupee,
        color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
      },
      {
        label: "₹10,00,000–₹14,99,999",
        href: "/jobs?minSalary=1000000&maxSalary=1499999",
        description: "Principal engineers & managers",
        icon: IndianRupee,
        color: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
      },
      {
        label: "₹15,00,000+",
        href: "/jobs?minSalary=1500000",
        description: "Directors, VPs & Executive leadership",
        icon: IndianRupee,
        color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
      },
    ],
    footerText: "100% verified salary packages across India",
    footerLinkText: "Explore ₹15L+ Jobs",
    footerHref: "/jobs?minSalary=1500000",
  },
  deadline: {
    label: "Application Deadline",
    categoryHeader: "Application Deadlines",
    subHeader: "Hiring Urgency & Timelines",
    items: [
      {
        label: "Today",
        href: "/jobs?deadline=today",
        description: "Urgent hiring drive — closes in 24h",
        alert: "Urgent",
        alertColor: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30",
        icon: Flame,
        color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
      },
      {
        label: "Within 3 Days",
        href: "/jobs?deadline=3days",
        description: "Fast-track interview pipelines",
        alert: "Closing Soon",
        alertColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
        icon: Clock,
        color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
      },
      {
        label: "Within 7 Days",
        href: "/jobs?deadline=7days",
        description: "Active weekly hiring cohort",
        alert: "This Week",
        alertColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
        icon: Calendar,
        color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
      },
      {
        label: "Within 14 Days",
        href: "/jobs?deadline=14days",
        description: "Standard fortnightly review cycles",
        icon: CalendarCheck,
        color: "text-slate-600 dark:text-slate-400 bg-slate-500/10",
      },
      {
        label: "Within 30 Days",
        href: "/jobs?deadline=30days",
        description: "Rolling monthly recruitment batches",
        icon: Inbox,
        color: "text-slate-600 dark:text-slate-400 bg-slate-500/10",
      },
      {
        label: "Deadline Passed",
        href: "/jobs?deadline=closed",
        description: "Archived & expired opportunities",
        icon: Archive,
        color: "text-muted-foreground bg-muted",
      },
    ],
    footerText: "Never miss an opportunity deadline",
    footerLinkText: "View Urgent Jobs",
    footerHref: "/jobs?deadline=today",
  },
};

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [aiOpen, setAiOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const headerRef = React.useRef<HTMLElement>(null);
  const logoRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLDivElement>(null);
  const actionsRef = React.useRef<HTMLDivElement>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => setMounted(true), []);

  // Scroll detection
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Stripe-style hover handlers with smooth delay
  const handleMouseEnter = (menuKey: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 160);
  };

  // GSAP entrance
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(logoRef.current, {
        y: -24,
        duration: 0.6,
        clearProps: "transform",
      });
      const navLinks = navRef.current?.querySelectorAll(".nav-item");
      if (navLinks && navLinks.length) {
        tl.from(
          navLinks,
          { y: -16, stagger: 0.05, duration: 0.5, clearProps: "transform" },
          "-=0.3"
        );
      }
      const actionButtons = actionsRef.current?.querySelectorAll("button, a");
      if (actionButtons && actionButtons.length) {
        tl.from(
          actionButtons,
          { y: -16, stagger: 0.05, duration: 0.5, clearProps: "transform" },
          "-=0.3"
        );
      }
    },
    { scope: headerRef }
  );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || activeDropdown
            ? "bg-background/85 dark:bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
            : "bg-background/70 backdrop-blur-md border-b border-border/30"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div ref={logoRef} data-logo className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-xl bg-gradient-hero opacity-95 group-hover:opacity-100 transition-opacity shadow-sm" />
                  <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-heading font-extrabold text-lg tracking-tight text-gradient">
                    Anikaay
                  </span>
                  <span className="text-[9px] font-semibold text-muted-foreground tracking-widest uppercase leading-none">
                    India Jobs
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav with Stripe-style Dropdowns */}
            <nav
              ref={navRef}
              className="hidden xl:flex items-center gap-1.5 flex-nowrap flex-shrink-0"
              aria-label="Main navigation"
            >
              {/* 1. Job Dropdown */}
              <div
                className="relative nav-item flex-shrink-0"
                onMouseEnter={() => handleMouseEnter("job")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="nav-dropdown-job"
                  onClick={() => setActiveDropdown(activeDropdown === "job" ? null : "job")}
                  className={cn(
                    "group inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-150 whitespace-nowrap flex-shrink-0 select-none",
                    activeDropdown === "job"
                      ? "text-foreground bg-muted font-semibold shadow-xs"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
                  )}
                >
                  <Briefcase className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="whitespace-nowrap">Job</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-muted-foreground/70 transition-transform duration-200 group-hover:text-foreground flex-shrink-0",
                      activeDropdown === "job" && "rotate-180 text-foreground"
                    )}
                  />
                </button>

                {activeDropdown === "job" && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    {/* Stripe-style pointer beak */}
                    <div className="absolute top-1 left-7 w-3 h-3 rotate-45 bg-popover border-t border-l border-border/80 shadow-xs pointer-events-none z-10" />

                    {/* Stripe Mega Menu Card */}
                    <div className="w-[580px] rounded-2xl border border-border/80 bg-popover/98 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_10px_20px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]">
                      {/* Section Header */}
                      <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-border/50">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {HEADER_DROPDOWNS.job.categoryHeader}
                        </span>
                        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {HEADER_DROPDOWNS.job.subHeader}
                        </span>
                      </div>

                      {/* 2-Column Grid */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {HEADER_DROPDOWNS.job.items.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/70 hover:shadow-2xs transition-all duration-150 cursor-pointer"
                            >
                              <div
                                className={cn(
                                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105 duration-150",
                                  item.color
                                )}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[13px] font-semibold text-foreground group-hover/item:text-primary transition-colors flex items-center gap-1">
                                  {item.label}
                                </span>
                                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Stripe Footer Banner */}
                      <div className="bg-muted/40 -mx-4 -mb-4 mt-3 px-4 py-3 border-t border-border/50 flex items-center justify-between text-xs rounded-b-2xl">
                        <span className="text-muted-foreground text-[11px] flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {HEADER_DROPDOWNS.job.footerText}
                        </span>
                        <Link
                          href={HEADER_DROPDOWNS.job.footerHref}
                          onClick={() => setActiveDropdown(null)}
                          className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-all group/link text-xs"
                        >
                          <span>{HEADER_DROPDOWNS.job.footerLinkText}</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Employment Type Dropdown */}
              <div
                className="relative nav-item flex-shrink-0"
                onMouseEnter={() => handleMouseEnter("employmentType")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="nav-dropdown-employment"
                  onClick={() => setActiveDropdown(activeDropdown === "employmentType" ? null : "employmentType")}
                  className={cn(
                    "group inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-150 whitespace-nowrap flex-shrink-0 select-none",
                    activeDropdown === "employmentType"
                      ? "text-foreground bg-muted font-semibold shadow-xs"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
                  )}
                >
                  <Layers className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Employment Type</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-muted-foreground/70 transition-transform duration-200 group-hover:text-foreground flex-shrink-0",
                      activeDropdown === "employmentType" && "rotate-180 text-foreground"
                    )}
                  />
                </button>

                {activeDropdown === "employmentType" && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    {/* Stripe pointer beak */}
                    <div className="absolute top-1 left-20 w-3 h-3 rotate-45 bg-popover border-t border-l border-border/80 shadow-xs pointer-events-none z-10" />

                    <div className="w-[520px] rounded-2xl border border-border/80 bg-popover/98 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_10px_20px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]">
                      <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-border/50">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {HEADER_DROPDOWNS.employmentType.categoryHeader}
                        </span>
                        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {HEADER_DROPDOWNS.employmentType.subHeader}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {HEADER_DROPDOWNS.employmentType.items.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/70 hover:shadow-2xs transition-all duration-150 cursor-pointer"
                            >
                              <div
                                className={cn(
                                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105 duration-150",
                                  item.color
                                )}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[13px] font-semibold text-foreground group-hover/item:text-primary transition-colors truncate">
                                    {item.label}
                                  </span>
                                  <span className="text-[9px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md flex-shrink-0">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="bg-muted/40 -mx-4 -mb-4 mt-3 px-4 py-3 border-t border-border/50 flex items-center justify-between text-xs rounded-b-2xl">
                        <span className="text-muted-foreground text-[11px] flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          {HEADER_DROPDOWNS.employmentType.footerText}
                        </span>
                        <Link
                          href={HEADER_DROPDOWNS.employmentType.footerHref}
                          onClick={() => setActiveDropdown(null)}
                          className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-all group/link text-xs"
                        >
                          <span>{HEADER_DROPDOWNS.employmentType.footerLinkText}</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Salary Range Dropdown */}
              <div
                className="relative nav-item flex-shrink-0"
                onMouseEnter={() => handleMouseEnter("salaryRange")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="nav-dropdown-salary"
                  onClick={() => setActiveDropdown(activeDropdown === "salaryRange" ? null : "salaryRange")}
                  className={cn(
                    "group inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-150 whitespace-nowrap flex-shrink-0 select-none",
                    activeDropdown === "salaryRange"
                      ? "text-foreground bg-muted font-semibold shadow-xs"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
                  )}
                >
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Salary Range</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-muted-foreground/70 transition-transform duration-200 group-hover:text-foreground flex-shrink-0",
                      activeDropdown === "salaryRange" && "rotate-180 text-foreground"
                    )}
                  />
                </button>

                {activeDropdown === "salaryRange" && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    {/* Stripe pointer beak */}
                    <div className="absolute top-1 left-16 w-3 h-3 rotate-45 bg-popover border-t border-l border-border/80 shadow-xs pointer-events-none z-10" />

                    <div className="w-[560px] rounded-2xl border border-border/80 bg-popover/98 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_10px_20px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]">
                      <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-border/50">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {HEADER_DROPDOWNS.salaryRange.categoryHeader}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          {HEADER_DROPDOWNS.salaryRange.subHeader}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {HEADER_DROPDOWNS.salaryRange.items.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/70 hover:shadow-2xs transition-all duration-150 cursor-pointer"
                            >
                              <div
                                className={cn(
                                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105 duration-150",
                                  item.color
                                )}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[13px] font-semibold text-foreground group-hover/item:text-primary transition-colors truncate block">
                                  {item.label}
                                </span>
                                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="bg-muted/40 -mx-4 -mb-4 mt-3 px-4 py-3 border-t border-border/50 flex items-center justify-between text-xs rounded-b-2xl">
                        <span className="text-muted-foreground text-[11px] flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {HEADER_DROPDOWNS.salaryRange.footerText}
                        </span>
                        <Link
                          href={HEADER_DROPDOWNS.salaryRange.footerHref}
                          onClick={() => setActiveDropdown(null)}
                          className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-all group/link text-xs"
                        >
                          <span>{HEADER_DROPDOWNS.salaryRange.footerLinkText}</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Application Deadline Dropdown */}
              <div
                className="relative nav-item flex-shrink-0"
                onMouseEnter={() => handleMouseEnter("deadline")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id="nav-dropdown-deadline"
                  onClick={() => setActiveDropdown(activeDropdown === "deadline" ? null : "deadline")}
                  className={cn(
                    "group inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-150 whitespace-nowrap flex-shrink-0 select-none",
                    activeDropdown === "deadline"
                      ? "text-foreground bg-muted font-semibold shadow-xs"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
                  )}
                >
                  <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Application Deadline</span>
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-muted-foreground/70 transition-transform duration-200 group-hover:text-foreground flex-shrink-0",
                      activeDropdown === "deadline" && "rotate-180 text-foreground"
                    )}
                  />
                </button>

                {activeDropdown === "deadline" && (
                  <div className="absolute top-full right-0 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    {/* Stripe pointer beak */}
                    <div className="absolute top-1 right-16 w-3 h-3 rotate-45 bg-popover border-t border-l border-border/80 shadow-xs pointer-events-none z-10" />

                    <div className="w-[500px] rounded-2xl border border-border/80 bg-popover/98 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_10px_20px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]">
                      <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-border/50">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {HEADER_DROPDOWNS.deadline.categoryHeader}
                        </span>
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          {HEADER_DROPDOWNS.deadline.subHeader}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {HEADER_DROPDOWNS.deadline.items.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/70 hover:shadow-2xs transition-all duration-150 cursor-pointer"
                            >
                              <div
                                className={cn(
                                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105 duration-150",
                                  item.color
                                )}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[13px] font-semibold text-foreground group-hover/item:text-primary transition-colors truncate">
                                    {item.label}
                                  </span>
                                  {item.alert && (
                                    <span
                                      className={cn(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0",
                                        item.alertColor
                                      )}
                                    >
                                      {item.alert}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="bg-muted/40 -mx-4 -mb-4 mt-3 px-4 py-3 border-t border-border/50 flex items-center justify-between text-xs rounded-b-2xl">
                        <span className="text-muted-foreground text-[11px] flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          {HEADER_DROPDOWNS.deadline.footerText}
                        </span>
                        <Link
                          href={HEADER_DROPDOWNS.deadline.footerHref}
                          onClick={() => setActiveDropdown(null)}
                          className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-all group/link text-xs"
                        >
                          <span>{HEADER_DROPDOWNS.deadline.footerLinkText}</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link
                href="/companies"
                className="nav-item px-3 py-2 text-[13px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/70 rounded-full whitespace-nowrap flex-shrink-0 transition-colors"
              >
                Companies
              </Link>
              <Link
                href="/career-resources"
                className="nav-item px-3 py-2 text-[13px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/70 rounded-full whitespace-nowrap flex-shrink-0 transition-colors"
              >
                Career Resources
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div ref={actionsRef} data-actions className="hidden xl:flex items-center gap-2 flex-shrink-0">
              {/* Ask AI Pill */}
              <Button
                id="ask-ai-btn"
                onClick={() => setAiOpen(true)}
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-full border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-xs px-3.5 py-1.5 transition-all shadow-2xs hover:shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Ask AI</span>
              </Button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  id="theme-toggle"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* Sign in */}
              <Link href="/auth/sign-in">
                <button
                  id="sign-in-btn"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors inline-flex items-center gap-1"
                >
                  <span>Sign in</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              </Link>

              {/* Post a Job Button */}
              <Link href="/auth/register?role=recruiter">
                <button
                  id="post-job-btn"
                  className="px-4 py-1.5 rounded-full bg-gradient-hero text-white text-xs font-semibold shadow-sm hover:shadow-md hover:opacity-95 transition-all inline-flex items-center gap-1.5"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Post a Job</span>
                </button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAiOpen(true)}
                className="text-primary p-2 rounded-full"
                aria-label="Ask AI"
              >
                <Sparkles className="w-4 h-4" />
              </Button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  id="mobile-menu-btn"
                  className="p-2 rounded-xl text-foreground hover:bg-accent transition-colors"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-84 sm:w-96 p-0" showCloseButton={false}>
                  <MobileNav
                    onClose={() => setMobileOpen(false)}
                    theme={resolvedTheme}
                    setTheme={setTheme}
                    mounted={mounted}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* AI Search Modal */}
      <AiSearchModal open={aiOpen} onOpenChange={setAiOpen} />
    </>
  );
}

// ── Mobile Nav with Rich Stripe Sections ──────────────────────────
interface MobileNavProps {
  onClose: () => void;
  theme?: string;
  setTheme: (t: string) => void;
  mounted: boolean;
}

function MobileNav({ onClose, theme, setTheme, mounted }: MobileNavProps) {
  const [openSection, setOpenSection] = React.useState<string | null>("job");

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-heading font-bold text-gradient">Anikaay</span>
        </Link>
        <SheetClose
          onClick={onClose}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </SheetClose>
      </div>

      {/* Accordion Menu */}
      <div className="flex-1 p-4 space-y-2 text-xs">
        {/* 1. Job */}
        <div className="border border-border/80 rounded-2xl p-3 bg-card/50">
          <button
            onClick={() => toggle("job")}
            className="w-full flex items-center justify-between font-bold text-foreground"
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>Job (Popular Categories)</span>
            </span>
            <ChevronDown
              className={cn("w-3.5 h-3.5 transition-transform", openSection === "job" && "rotate-180")}
            />
          </button>
          {openSection === "job" && (
            <div className="space-y-1.5 mt-3 pt-2 border-t border-border/50">
              {HEADER_DROPDOWNS.job.items.map((item) => {
                const IconComp = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2.5 p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent/60 transition-colors"
                  >
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.color)}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-xs">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Employment Type */}
        <div className="border border-border/80 rounded-2xl p-3 bg-card/50">
          <button
            onClick={() => toggle("employmentType")}
            className="w-full flex items-center justify-between font-bold text-foreground"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Employment Type</span>
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform",
                openSection === "employmentType" && "rotate-180"
              )}
            />
          </button>
          {openSection === "employmentType" && (
            <div className="space-y-1.5 mt-3 pt-2 border-t border-border/50">
              {HEADER_DROPDOWNS.employmentType.items.map((item) => {
                const IconComp = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.color)}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-xs">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md flex-shrink-0">
                      {item.badge}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Salary Range */}
        <div className="border border-border/80 rounded-2xl p-3 bg-card/50">
          <button
            onClick={() => toggle("salaryRange")}
            className="w-full flex items-center justify-between font-bold text-foreground"
          >
            <span className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-500" />
              <span>Salary Range (₹ INR)</span>
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform",
                openSection === "salaryRange" && "rotate-180"
              )}
            />
          </button>
          {openSection === "salaryRange" && (
            <div className="space-y-1.5 mt-3 pt-2 border-t border-border/50">
              {HEADER_DROPDOWNS.salaryRange.items.map((item) => {
                const IconComp = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2.5 p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent/60 transition-colors"
                  >
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.color)}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-xs">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Application Deadline */}
        <div className="border border-border/80 rounded-2xl p-3 bg-card/50">
          <button
            onClick={() => toggle("deadline")}
            className="w-full flex items-center justify-between font-bold text-foreground"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Application Deadline</span>
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform",
                openSection === "deadline" && "rotate-180"
              )}
            />
          </button>
          {openSection === "deadline" && (
            <div className="space-y-1.5 mt-3 pt-2 border-t border-border/50">
              {HEADER_DROPDOWNS.deadline.items.map((item) => {
                const IconComp = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", item.color)}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-xs">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
                      </div>
                    </div>
                    {item.alert && (
                      <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0", item.alertColor)}>
                        {item.alert}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Direct links */}
        <Link
          href="/companies"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-accent transition-colors"
        >
          <Building2 className="w-4 h-4 text-primary" />
          <span>Companies</span>
        </Link>
        <Link
          href="/career-resources"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-accent transition-colors"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Career Resources</span>
        </Link>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        )}
        <Link href="/auth/sign-in" onClick={onClose} className="block">
          <Button id="mobile-signin-btn" variant="outline" className="w-full gap-2 rounded-xl text-xs">
            <LogIn className="w-4 h-4" />
            <span>Sign in</span>
          </Button>
        </Link>
        <Link href="/auth/register?role=recruiter" onClick={onClose} className="block">
          <Button
            id="mobile-postjob-btn"
            className="w-full gap-2 bg-gradient-hero text-white font-semibold rounded-xl text-xs"
          >
            <PenSquare className="w-4 h-4" />
            <span>Post a Job</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
