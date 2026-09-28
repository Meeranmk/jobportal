import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { featuredJobs, categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Jobs",
  description:
    "Search thousands of verified job listings by role, skill, location, and salary on Anikaay. Find your next opportunity today.",
  alternates: { canonical: "https://anikaay.online/jobs" },
};

interface JobsPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    mode?: string;
    type?: string;
    category?: string;
    experience?: string;
    salary?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const { q, location, mode, category } = params;

  // In production: filter from DB. Here we filter mock data.
  const jobs = featuredJobs.filter((job) => {
    if (q && !job.title.toLowerCase().includes(q.toLowerCase()) &&
        !job.company.toLowerCase().includes(q.toLowerCase()) &&
        !job.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))) return false;
    if (location && location !== "remote" && !job.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (mode && job.locationType !== mode) return false;
    if (category && job.categorySlug !== category) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-background-subtle border-b border-border py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Jobs</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {q ? `Results for "${q}"` : "Browse All Jobs"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {jobs.length} opportunities found
                {location ? ` in ${location}` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Job filters">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 space-y-6">
              <h2 className="font-heading font-semibold text-sm text-foreground">Filters</h2>

              {/* Work Mode */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Work Mode</p>
                {["Remote", "Hybrid", "On-site"].map((m) => (
                  <label key={m} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={mode?.toLowerCase() === m.toLowerCase()}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{m}</span>
                  </label>
                ))}
              </div>

              {/* Job Type */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Job Type</p>
                {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (
                  <label key={t} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/50" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{t}</span>
                  </label>
                ))}
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Category</p>
                {categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/jobs?category=${cat.slug}`}
                    className="flex items-center justify-between py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.label}
                    </span>
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{cat.count.toLocaleString()}</span>
                  </Link>
                ))}
              </div>

              {/* Salary range (placeholder) */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Salary (USD)</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-muted-foreground">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <Button
                id="apply-filters-btn"
                size="sm"
                className="w-full bg-gradient-hero text-white font-semibold hover:opacity-90"
              >
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0" aria-label="Job listings">
            {/* Inline search bar */}
            <form className="flex gap-3 mb-6" method="get" action="/jobs">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="jobs-search-input"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="Search jobs, skills, or companies…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="jobs-location-input"
                  name="location"
                  type="text"
                  defaultValue={location}
                  placeholder="Location"
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm w-40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button
                id="jobs-search-btn"
                type="submit"
                className="bg-gradient-hero text-white font-semibold px-5 rounded-xl hover:opacity-90"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                id="jobs-filter-btn"
                variant="outline"
                type="button"
                className="lg:hidden px-3 rounded-xl"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </form>

            {/* Results */}
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} variant="default" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground text-sm max-w-sm mb-6">
                  Try adjusting your filters or search terms to find more opportunities.
                </p>
                <Link href="/jobs">
                  <Button id="clear-filters-btn" variant="outline">Clear filters</Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
