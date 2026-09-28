import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Globe,
  Clock,
  DollarSign,
  Building2,
  Wifi,
  ChevronRight,
  CheckCircle,
  Bookmark,
  Share2,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";
import { featuredJobs, categories, formatSalary, timeAgo } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Category page?
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return {
      title: `${category.label} Jobs`,
      description: `Browse ${category.count.toLocaleString()} ${category.label} job listings on Anikaay.`,
      alternates: { canonical: `https://anikaay.online/jobs/${slug}` },
    };
  }

  // Individual job?
  const job = featuredJobs.find((j) => j.slug === slug);
  if (job) {
    return {
      title: `${job.title} at ${job.company}`,
      description: job.description,
      alternates: { canonical: `https://anikaay.online/jobs/${slug}` },
    };
  }

  return { title: "Not Found" };
}

export default async function JobSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // ── Category landing ──────────────────────────────────────
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    const jobs = featuredJobs.filter((j) => j.categorySlug === slug);
    return (
      <div className="min-h-screen pt-20">
        <div className="bg-background-subtle border-b border-border py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/jobs" className="hover:text-foreground transition-colors">Jobs</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{category.label}</span>
            </nav>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-2xl">
                {category.icon}
              </div>
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {category.label} Jobs
                </h1>
                <p className="text-muted-foreground mt-1">{category.count.toLocaleString()} open roles</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} variant="default" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h2 className="font-heading font-semibold text-lg text-foreground mb-2">No listings yet</h2>
              <p className="text-muted-foreground text-sm max-w-sm mb-6">
                We're adding new {category.label} roles daily. Check back soon.
              </p>
              <Link href="/jobs" className="text-sm font-medium text-primary hover:underline">
                Browse all jobs →
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Individual job detail ─────────────────────────────────
  const job = featuredJobs.find((j) => j.slug === slug);
  if (!job) notFound();

  // JSON-LD JobPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    validThrough: job.expiresAt,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: `https://anikaay.online/companies/${job.companySlug}`,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location },
    },
    ...(job.locationType === "remote" && { jobLocationType: "TELECOMMUTE" }),
    ...(job.salaryMin && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.salaryCurrency ?? "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
          unitText: "YEAR",
        },
      },
    }),
  };

  const relatedJobs = featuredJobs
    .filter((j) => j.id !== job.id && j.categorySlug === job.categorySlug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pt-20">
        {/* Breadcrumb */}
        <div className="bg-background-subtle border-b border-border py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/jobs" className="hover:text-foreground transition-colors">Jobs</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/jobs/${job.categorySlug}`} className="hover:text-foreground transition-colors">
                {job.category}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium truncate">{job.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <article className="lg:col-span-2" aria-label="Job details">
              <div className="flex items-start gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-subtle border border-border flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {job.company[0]}
                </div>
                <div className="flex-1">
                  {job.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-gradient-hero text-white mb-2">
                      ⭐ Featured
                    </span>
                  )}
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {job.title}
                  </h1>
                  <Link href={`/companies/${job.companySlug}`} className="text-primary hover:underline font-medium">
                    {job.company}
                  </Link>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-border">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />{job.location}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  {job.locationType === "remote" ? <Globe className="w-4 h-4" /> :
                   job.locationType === "hybrid" ? <Wifi className="w-4 h-4" /> :
                   <Building2 className="w-4 h-4" />}
                  {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" />{job.type.replace("-", " ")}
                </span>
                {(job.salaryMin || job.salaryMax) && (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <DollarSign className="w-4 h-4 text-primary" />
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />{timeAgo(job.postedAt)}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-muted border border-border text-xs font-medium text-muted-foreground hover:border-primary/40 transition-all">
                    {tag}
                  </span>
                ))}
              </div>

              <section className="mb-8" aria-labelledby="job-desc-heading">
                <h2 id="job-desc-heading" className="font-heading font-bold text-lg text-foreground mb-3">About this role</h2>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </section>

              <section className="mb-8" aria-labelledby="responsibilities-heading">
                <h2 id="responsibilities-heading" className="font-heading font-bold text-lg text-foreground mb-4">What you'll do</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="requirements-heading">
                <h2 id="requirements-heading" className="font-heading font-bold text-lg text-foreground mb-4">What we're looking for</h2>
                <ul className="space-y-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Application sidebar">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5">
                  <h2 className="font-heading font-bold text-base text-foreground mb-4">Apply for this role</h2>
                  {job.salaryMin && (
                    <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/15">
                      <p className="text-xs text-muted-foreground mb-0.5">Estimated salary</p>
                      <p className="font-heading font-bold text-lg text-foreground">
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </p>
                      <p className="text-xs text-muted-foreground">per year</p>
                    </div>
                  )}
                  <Link href={`/jobs/${job.slug}/apply`}>
                    <Button
                      id={`apply-now-${job.id}`}
                      size="lg"
                      className="w-full bg-gradient-hero text-white font-bold hover:opacity-90 shadow-lg shadow-primary/25 mb-3"
                    >
                      Apply Now
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <Button id={`save-job-detail-${job.id}`} variant="outline" size="sm" className="flex-1 gap-1.5">
                      <Bookmark className="w-3.5 h-3.5" /> Save
                    </Button>
                    <Button id={`share-job-${job.id}`} variant="outline" size="sm" className="flex-1 gap-1.5">
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </Button>
                  </div>
                </div>

                <Link href={`/companies/${job.companySlug}`}
                  className="group block rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-base font-bold">
                      {job.company[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{job.company}</p>
                      <p className="text-xs text-muted-foreground">View company profile →</p>
                    </div>
                  </div>
                </Link>

                {relatedJobs.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-sm text-foreground mb-3">Similar roles</h3>
                    <div className="space-y-2">
                      {relatedJobs.map((j) => (
                        <Link key={j.id} href={`/jobs/${j.slug}`} className="flex items-center gap-2.5 py-2 group">
                          <div className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {j.company[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">{j.title}</p>
                            <p className="text-[10px] text-muted-foreground">{j.company}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
