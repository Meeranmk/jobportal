import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { featuredJobs } from "@/lib/data";
import { JobsGridExplorer } from "@/components/jobs-grid-explorer";

export const metadata: Metadata = {
  title: "Active Jobs | Search & Apply | Anikaay India",
  description:
    "Explore active jobs across IT, Sales, Accounting, Digital Marketing, HR, and Data Science in India. Filter by salary in Rupees (₹), employment type, deadline, and city.",
  alternates: { canonical: "https://anikaay.online/jobs" },
};

interface JobsPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    mode?: string;
    type?: string;
    category?: string;
    industry?: string;
    department?: string;
    minSalary?: string;
    maxSalary?: string;
    deadline?: string;
    experience?: string;
    salary?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const {
    q,
    location,
    mode,
    type,
    industry,
    department,
    minSalary,
    maxSalary,
    deadline,
  } = params;

  return (
    <div className="min-h-screen pt-20">
      {/* Top Banner & Breadcrumb */}
      <div className="bg-background-subtle border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Jobs</span>
          </nav>
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              🚀 Explore Career Opportunities in India
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Explore Active Jobs
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Filter verified openings by city, state, country, workplace type, monthly or annual salary range (₹ INR), education, and company benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid & Leftside Filters */}
      <JobsGridExplorer
        initialJobs={featuredJobs}
        initialQuery={q || ""}
        initialLocation={location || ""}
        initialMode={mode || ""}
        initialType={type || ""}
        initialIndustry={industry || ""}
        initialDepartment={department || ""}
        initialMinSalary={minSalary || ""}
        initialMaxSalary={maxSalary || ""}
        initialDeadline={deadline || ""}
      />
    </div>
  );
}
