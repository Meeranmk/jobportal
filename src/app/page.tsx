"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";
import { CategoryCard } from "@/components/category-card";
import { AiSearchModal } from "@/components/ai-search-modal";
import { categories, featuredJobs, featuredCompanies } from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Active Jobs", value: "24,000+", icon: Briefcase },
  { label: "Companies Hiring", value: "3,200+", icon: Building2 },
  { label: "Candidates Placed", value: "180,000+", icon: Users },
];

const TRENDING = ["AI Engineer", "Product Manager", "Data Scientist", "DevOps", "UX Designer", "Sales Lead"];



export default function HomePage() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [aiOpen, setAiOpen] = React.useState(false);

  // Refs for GSAP
  const heroRef = React.useRef<HTMLElement>(null);
  const headlineRef = React.useRef<HTMLHeadingElement>(null);
  const sublineRef = React.useRef<HTMLParagraphElement>(null);
  const searchBoxRef = React.useRef<HTMLDivElement>(null);
  const statsRef = React.useRef<HTMLDivElement>(null);
  const categoriesRef = React.useRef<HTMLElement>(null);
  const jobsRef = React.useRef<HTMLElement>(null);
  const companiesRef = React.useRef<HTMLElement>(null);

  // ── Hero entrance GSAP ─────────────────────────────────────
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
      })
        .from(sublineRef.current, { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(searchBoxRef.current, { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".stat-item", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        }, "-=0.3");
    },
    { scope: heroRef }
  );

  // ── Scroll-triggered reveals ───────────────────────────────
  useGSAP(
    () => {
      // Categories section
      gsap.from(".category-reveal", {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });

      // Jobs section
      gsap.from(".job-reveal", {
        scrollTrigger: {
          trigger: jobsRef.current,
          start: "top 75%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Companies section
      gsap.from(".company-reveal", {
        scrollTrigger: {
          trigger: companiesRef.current,
          start: "top 75%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    {} // no scope — selectors are page-global, runs client-only inside useGSAP
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <>
      {/* ── Hero Section ──────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
        aria-label="Hero section"
      >
        {/* Background */}
        <div className="absolute inset-0 section-dots" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-violet/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-electric/10 blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium text-primary mb-8">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Job Discovery
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* H1 */}
          <h1
            ref={headlineRef}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
          >
            Find the right job.{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">
              Build the career you want.
            </span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Thousands of verified roles from the world's most innovative companies.
            Search by keyword, or let our AI find the perfect match.
          </p>

          {/* Search Box */}
          <div ref={searchBoxRef} className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="relative flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-2xl shadow-black/10"
            >
              {/* Keyword input */}
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  id="hero-keyword"
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title, skills, or company"
                  className="w-full pl-10 pr-4 py-3.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                  aria-label="Search by job title, skills, or company"
                />
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px bg-border self-stretch" />

              {/* Location input */}
              <div className="relative flex-1 flex items-center">
                <MapPin className="absolute left-4 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  id="hero-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, state, or remote"
                  className="w-full pl-10 pr-4 py-3.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                  aria-label="Search by city, state, or remote"
                />
              </div>

              {/* Search CTA */}
              <Button
                id="hero-search-btn"
                type="submit"
                size="lg"
                className="gap-2 bg-gradient-hero text-white font-semibold px-8 rounded-xl hover:opacity-90 shadow-lg shadow-primary/30 flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                Search Jobs
              </Button>
            </form>

            {/* Secondary CTA */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                id="hero-ask-ai-btn"
                onClick={() => setAiOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              >
                <Sparkles className="w-4 h-4" />
                Ask AI to find a job
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Trending searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending:
            </span>
            {TRENDING.map((term) => (
              <Link
                key={term}
                href={`/jobs?q=${encodeURIComponent(term)}`}
                className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-accent border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-all duration-150"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="relative z-10 mt-16 w-full max-w-2xl mx-auto px-4"
          aria-label="Platform statistics"
        >
          <div className="grid grid-cols-3 gap-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="stat-item text-center p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm"
              >
                <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
                <p className="font-heading font-bold text-lg text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Bento Grid ──────────────────────────── */}
      <section
        ref={categoriesRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="categories-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="category-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Explore by Category
              </p>
              <h2
                id="categories-heading"
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              >
                Find roles across every field
              </h2>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200 flex-shrink-0"
            >
              Browse all categories
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Asymmetric Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr">
            {/* Large card — Technology */}
            <div className="category-reveal col-span-2 row-span-2">
              <CategoryCard category={categories[0]} size="lg" className="h-full" />
            </div>

            {/* Medium — Design */}
            <div className="category-reveal col-span-2 md:col-span-1">
              <CategoryCard category={categories[1]} size="md" className="h-full" />
            </div>

            {/* Medium — Marketing */}
            <div className="category-reveal col-span-2 md:col-span-1">
              <CategoryCard category={categories[2]} size="md" className="h-full" />
            </div>

            {/* Wide — Remote (spans 2 cols) */}
            <div className="category-reveal col-span-2">
              <CategoryCard category={categories[5]} size="md" className="h-full" />
            </div>

            {/* Small — Sales */}
            <div className="category-reveal col-span-1">
              <CategoryCard category={categories[3]} size="sm" className="h-full" />
            </div>

            {/* Small — Finance */}
            <div className="category-reveal col-span-1">
              <CategoryCard category={categories[4]} size="sm" className="h-full" />
            </div>

            {/* Small — Healthcare */}
            <div className="category-reveal col-span-1">
              <CategoryCard category={categories[6]} size="sm" className="h-full" />
            </div>

            {/* Small — Education */}
            <div className="category-reveal col-span-1">
              <CategoryCard category={categories[7]} size="sm" className="h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Jobs ──────────────────────────────────── */}
      <section
        ref={jobsRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background-subtle"
        aria-labelledby="featured-jobs-heading"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 section-dots opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="job-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Featured Opportunities
              </p>
              <h2
                id="featured-jobs-heading"
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              >
                Roles worth your attention
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md">
                Hand-picked enterprise and high-growth startup positions updated daily.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200 flex-shrink-0"
            >
              View all jobs
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured grid — asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: 2 featured cards */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {featuredJobs.slice(0, 2).map((job) => (
                <div key={job.id} className="job-reveal">
                  <JobCard job={job} variant="featured" className="h-full" />
                </div>
              ))}
              {/* Wide card spanning both cols */}
              <div className="job-reveal sm:col-span-2">
                <JobCard job={featuredJobs[2]} variant="featured" />
              </div>
            </div>

            {/* Right column: latest listings */}
            <div className="lg:col-span-1">
              <div className="job-reveal sticky top-24">
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-sm text-foreground">Latest Listings</h3>
                    <span className="tag-pill">New</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {featuredJobs.slice(3).map((job) => (
                      <JobCard key={job.id} job={job} variant="compact" />
                    ))}
                  </div>
                  <div className="px-5 py-4 border-t border-border">
                    <Link href="/jobs">
                      <Button
                        id="see-all-jobs-btn"
                        variant="outline"
                        className="w-full text-sm font-medium gap-2 hover:border-primary/40 hover:text-primary"
                      >
                        Browse all listings
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Companies ─────────────────────────────── */}
      <section
        ref={companiesRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="companies-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="company-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Verified Employers
              </p>
              <h2
                id="companies-heading"
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              >
                Companies actively hiring
              </h2>
            </div>
            <Link
              href="/companies"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200 flex-shrink-0"
            >
              All companies
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCompanies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.slug}`}
                id={`company-card-${company.id}`}
                className="company-reveal group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 card-lift"
              >
                {/* Verified badge */}
                {company.verified && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                )}

                {/* Logo placeholder */}
                <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-xl font-bold mb-4">
                  {company.name[0]}
                </div>

                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {company.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{company.industry} · {company.size}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{company.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {company.openRoles} open roles
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-label="Recruiter call to action"
      >
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-12 text-center text-white">
            {/* Background noise */}
            <div className="absolute inset-0 noise" />
            <div className="absolute inset-0 section-dots opacity-20" />

            {/* Glowing orbs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6">
                <Star className="w-3.5 h-3.5 fill-white" />
                For Recruiters & Employers
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Hire faster with Anikaay
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                Post a job in minutes. Reach thousands of qualified candidates.
                AI-powered matching brings the right talent to your door.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/employers">
                  <Button
                    id="cta-post-job-btn"
                    size="lg"
                    className="bg-white text-primary font-bold hover:bg-white/90 shadow-lg px-8"
                  >
                    Post a Job Free
                  </Button>
                </Link>
                <Link href="/employers#pricing">
                  <Button
                    id="cta-see-pricing-btn"
                    size="lg"
                    variant="ghost"
                    className="border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 hover:text-white dark:hover:bg-white/20 dark:hover:text-white font-semibold px-8 transition-all"
                  >
                    See Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Modal */}
      <AiSearchModal open={aiOpen} onOpenChange={setAiOpen} />
    </>
  );
}
