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
  BookOpen,
  Clock,
  ShieldCheck,
  FileText,
  UploadCloud,
  Layers,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";
import { CategoryCard } from "@/components/category-card";
import { AiSearchModal } from "@/components/ai-search-modal";
import { categories, featuredJobs, featuredCompanies } from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Active Jobs Across India", value: "25,000+", icon: Briefcase },
  { label: "Verified Employers", value: "3,200+", icon: Building2 },
  { label: "Highest Package", value: "₹48 LPA", icon: Zap },
];

const TRENDING = [
  "React Developer",
  "AI Engineer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer",
  "Sales Lead",
  "Chartered Accountant",
];

const POPULAR_JOB_CATEGORIES = [
  { label: "IT & Software Jobs", slug: "it", query: "industry=IT", icon: "💻", count: 12450, color: "from-violet-500 to-blue-500" },
  { label: "Sales & BD Jobs", slug: "sales", query: "industry=Sales", icon: "📈", count: 4820, color: "from-emerald-500 to-teal-500" },
  { label: "Accounting & Finance", slug: "accounting", query: "industry=Finance", icon: "💰", count: 3210, color: "from-cyan-500 to-blue-500" },
  { label: "Digital Marketing Jobs", slug: "marketing", query: "industry=Marketing", icon: "📢", count: 2190, color: "from-orange-500 to-amber-500" },
  { label: "HR & People Operations", slug: "hr", query: "department=Human+Resources", icon: "👥", count: 1640, color: "from-pink-500 to-rose-500" },
  { label: "Data Science & AI Jobs", slug: "data-science", query: "q=Data+Scientist", icon: "📊", count: 3890, color: "from-indigo-500 to-purple-500" },
  { label: "Healthcare & Biotech", slug: "healthcare", query: "industry=Healthcare", icon: "🏥", count: 850, color: "from-red-500 to-rose-500" },
  { label: "Retail & E-commerce", slug: "retail", query: "industry=Retail", icon: "🛍️", count: 1950, color: "from-amber-500 to-yellow-500" },
];

const CAREER_ARTICLES = [
  {
    slug: "how-to-write-a-standout-resume-2026",
    category: "Resume Tips",
    title: "How to Write a Standout Resume for Indian Tech Companies",
    excerpt: "A practical guide to passing ATS filters and catching the attention of hiring managers in Bengaluru and Mumbai.",
    readTime: "6 min read",
  },
  {
    slug: "top-interview-questions-software-engineers",
    category: "Interview Guidance",
    title: "Top 50 Technical & System Design Questions in 2026",
    excerpt: "Commonly tested coding and architecture questions with structured solutions.",
    readTime: "12 min read",
  },
  {
    slug: "salary-negotiation-scripts-that-work",
    category: "Career Development",
    title: "Indian Salary Negotiation & LPA Compensation Guide",
    excerpt: "Tactful frameworks to negotiate fixed vs variable pay, ESOPs, and bonus structures.",
    readTime: "8 min read",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [aiOpen, setAiOpen] = React.useState(false);

  // GSAP Refs
  const heroRef = React.useRef<HTMLElement>(null);
  const headlineRef = React.useRef<HTMLHeadingElement>(null);
  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(searchBoxRef.current, { y: 25, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".stat-item", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        }, "-=0.3");
    },
    { scope: heroRef }
  );

  // Separate Featured vs Latest Jobs from data
  const featuredOnlyJobs = featuredJobs.filter((j) => j.featured);
  const latestJobs = [...featuredJobs].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );

  return (
    <>
      {/* ── 1. Hero Banner ──────────────────────────────────── */}
      {/* Highlights the main job-search message with a clear call to action */}
      <section
        ref={heroRef}
        id="hero-banner"
        className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-label="Hero Banner"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gradient-hero opacity-15 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>India's Leading AI-Powered Job Discovery Platform</span>
          </div>

          {/* Heading */}
          <h1
            ref={headlineRef}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Find Your Dream Career Across{" "}
            <span className="text-gradient">India's Tech Hubs</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Search thousands of verified opportunities in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, and Remote. Accurate INR salaries, transparent job requirements.
          </p>

          {/* ── 2. Job Search Container ─────────────────────── */}
          {/* Allows users to search for jobs by title, keyword, company, or location */}
          <div
            ref={searchBoxRef}
            id="job-search-container"
            className="max-w-3xl mx-auto rounded-3xl border border-border bg-card p-3 sm:p-4 shadow-xl shadow-primary/5 mb-8"
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 items-stretch">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="home-search-keyword"
                  type="text"
                  placeholder="Job title, skills, or company..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border/80 bg-background text-sm outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="relative sm:w-56">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="home-search-location"
                  type="text"
                  placeholder="City (e.g. Bengaluru, Mumbai)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border/80 bg-background text-sm outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <Button
                id="home-search-submit"
                type="submit"
                size="lg"
                className="bg-gradient-hero text-white font-bold px-8 py-3 rounded-2xl hover:opacity-90 shadow-lg shadow-primary/25 h-auto text-sm"
              >
                Search Jobs
              </Button>
            </form>

            {/* Trending searches */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border/60 text-xs">
              <span className="text-muted-foreground flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-primary" /> Popular:
              </span>
              {TRENDING.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setKeyword(term);
                    router.push(`/jobs?q=${encodeURIComponent(term)}`);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors text-[11px] font-medium text-muted-foreground"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="stat-item flex items-center justify-center gap-3 p-3.5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-heading font-extrabold text-base text-foreground leading-none">{value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Popular Job Categories ─────────────────────────── */}
      {/* Displays commonly searched job categories for quick navigation */}
      <section
        id="popular-job-categories"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background-subtle border-y border-border"
        aria-labelledby="categories-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Explore by Specialization
              </p>
              <h2
                id="categories-heading"
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                Popular Job Categories
              </h2>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Browse all categories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {POPULAR_JOB_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/jobs?${cat.query}`}
                className="group relative rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 card-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {cat.count.toLocaleString()} open jobs
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary mt-3 group-hover:underline">
                  View roles →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Featured Jobs ─────────────────────────────────── */}
      {/* Shows selected job listings that employers or administrators want to promote */}
      <section
        id="featured-jobs"
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="featured-jobs-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-hero text-white mb-2 shadow-sm">
                ⭐ Hand-Picked Roles
              </div>
              <h2
                id="featured-jobs-heading"
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                Featured Jobs
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Top-tier engineering and leadership openings with competitive INR salary packages
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Explore all active jobs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOnlyJobs.map((job) => (
              <JobCard key={job.id} job={job} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Latest Jobs ──────────────────────────────────── */}
      {/* Lists the most recently posted job opportunities */}
      <section
        id="latest-jobs"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background-subtle border-y border-border"
        aria-labelledby="latest-jobs-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Fresh Opportunities
              </p>
              <h2
                id="latest-jobs-heading"
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                Latest Jobs
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Roles published in the last 24 to 72 hours across India
              </p>
            </div>
            <Link
              href="/jobs?sort=recent"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              See all recent listings <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestJobs.slice(0, 8).map((job) => (
              <JobCard key={job.id} job={job} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Top Companies ─────────────────────────────────── */}
      {/* Showcases companies with active job openings and strong employer presence */}
      <section
        id="top-companies"
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="top-companies-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Verified Employers
              </p>
              <h2
                id="top-companies-heading"
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                Top Companies
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Actively hiring tech, finance, and consumer brands with transparent work cultures
              </p>
            </div>
            <Link
              href="/companies"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all employers <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCompanies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.slug}`}
                className="group rounded-3xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 card-lift"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-subtle border border-border flex items-center justify-center text-xl font-bold text-foreground group-hover:border-primary/40 transition-colors">
                    {company.name[0]}
                  </div>
                  {company.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  {company.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{company.industry} · {company.location}</p>
                <p className="text-xs text-muted-foreground/90 line-clamp-2 mt-3 leading-relaxed">
                  {company.description}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/70 text-xs">
                  <span className="font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {company.openRoles} Open Roles
                  </span>
                  <span className="font-medium text-muted-foreground group-hover:text-foreground flex items-center gap-1">
                    Explore Profile <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Career Resources ──────────────────────────────── */}
      {/* Provides resume tips, interview guidance, and career development resources */}
      <section
        id="career-resources"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background-subtle border-y border-border"
        aria-labelledby="career-resources-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                Guides & Growth
              </p>
              <h2
                id="career-resources-heading"
                className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                Career Resources
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Expert resume tips, interview frameworks, and salary negotiation strategies
              </p>
            </div>
            <Link
              href="/career-resources"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Browse all resources <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAREER_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/career-resources/${article.slug}`}
                className="group rounded-3xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 card-lift"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                  <span className="font-semibold text-primary group-hover:underline flex items-center gap-1">
                    Read Guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Call to Action ─────────────────────────────────── */}
      {/* Encourages candidates to create a profile, upload a resume, or apply for jobs */}
      <section
        id="call-to-action"
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-label="Call to Action"
      >
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-8 sm:p-12 text-center text-white shadow-2xl shadow-primary/20">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider mb-4">
                🚀 Fast-Track Your Career
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                Ready to Land Your Next Job in India?
              </h2>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8">
                Create your verified profile in 2 minutes, upload your resume for automatic role matching, and get discovered by hiring leaders at top companies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/auth/register?role=seeker">
                  <Button
                    id="cta-create-profile-btn"
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary font-bold hover:bg-white/90 shadow-lg px-8 rounded-xl h-12 text-sm"
                  >
                    Create Free Profile
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    id="cta-browse-jobs-btn"
                    size="lg"
                    variant="ghost"
                    className="w-full sm:w-auto border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 hover:text-white dark:hover:bg-white/20 dark:hover:text-white font-semibold px-8 rounded-xl h-12 text-sm"
                  >
                    Browse Active Jobs
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
