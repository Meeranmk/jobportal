import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Career Resources & Guides",
  description:
    "Expert career advice, interview preparation guides, resume tips, and salary insights to help you land your dream job.",
  alternates: { canonical: "https://anikaay.online/career-resources" },
};

const ARTICLES = [
  {
    slug: "how-to-write-a-standout-resume-2026",
    category: "Resume",
    title: "How to Write a Standout Resume in 2026",
    excerpt: "A step-by-step guide to crafting a resume that gets past ATS filters and impresses hiring managers.",
    readTime: "8 min read",
    date: "Sep 25, 2026",
    featured: true,
  },
  {
    slug: "top-interview-questions-software-engineers",
    category: "Interview",
    title: "Top 50 Interview Questions for Software Engineers",
    excerpt: "The most commonly asked technical and behavioral questions at top tech companies, with model answers.",
    readTime: "15 min read",
    date: "Sep 20, 2026",
    featured: true,
  },
  {
    slug: "salary-negotiation-scripts-that-work",
    category: "Salary",
    title: "Salary Negotiation Scripts That Actually Work",
    excerpt: "Word-for-word scripts and frameworks to confidently negotiate your compensation.",
    readTime: "6 min read",
    date: "Sep 15, 2026",
    featured: false,
  },
  {
    slug: "remote-jobs-guide-2026",
    category: "Remote Work",
    title: "The Complete Guide to Finding Remote Jobs in 2026",
    excerpt: "Where to look, how to stand out, and how to negotiate remote arrangements.",
    readTime: "10 min read",
    date: "Sep 10, 2026",
    featured: false,
  },
  {
    slug: "linkedin-profile-optimization",
    category: "Career Strategy",
    title: "LinkedIn Profile Optimization for Job Seekers",
    excerpt: "How to make recruiters come to you by optimizing every section of your LinkedIn profile.",
    readTime: "7 min read",
    date: "Sep 5, 2026",
    featured: false,
  },
  {
    slug: "ai-tools-for-job-search",
    category: "Tools",
    title: "The Best AI Tools for Your Job Search in 2026",
    excerpt: "A curated list of AI-powered tools that speed up resume writing, interview prep, and outreach.",
    readTime: "5 min read",
    date: "Sep 1, 2026",
    featured: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Resume": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Interview": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Salary": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Remote Work": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "Career Strategy": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Tools": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function CareerResourcesPage() {
  const featured = ARTICLES.filter((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-background-subtle border-b border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Career Resources</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
              Career Resources
            </h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Expert guides, interview prep, salary insights, and career strategy to help you land and grow in your next role.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured articles */}
        <section aria-labelledby="featured-articles-heading" className="mb-14">
          <h2 id="featured-articles-heading" className="font-heading font-bold text-xl text-foreground mb-6">
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((article) => (
              <Link
                key={article.slug}
                href={`/career-resources/${article.slug}`}
                id={`article-featured-${article.slug}`}
                className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 card-lift"
              >
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-4 ${CATEGORY_COLORS[article.category] ?? ""}`}>
                  {article.category}
                </span>
                <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All articles */}
        <section aria-labelledby="all-articles-heading">
          <h2 id="all-articles-heading" className="font-heading font-bold text-xl text-foreground mb-6">
            All Articles
          </h2>
          <div className="space-y-4">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/career-resources/${article.slug}`}
                id={`article-${article.slug}`}
                className="group flex items-center gap-5 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/2 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2 ${CATEGORY_COLORS[article.category] ?? ""}`}>
                    {article.category}
                  </span>
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{article.excerpt}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">{article.readTime}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{article.date}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
