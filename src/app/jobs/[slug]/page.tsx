import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Briefcase } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { SingleJobView } from "@/components/single-job-view";
import { featuredJobs, categories } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Category page?
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return {
      title: `${category.label} Jobs | Anikaay`,
      description: `Browse ${category.count.toLocaleString()} ${category.label} job listings on Anikaay.`,
      alternates: { canonical: `https://anikaay.online/jobs/${slug}` },
    };
  }

  // Individual job?
  const job = featuredJobs.find((j) => j.slug === slug);
  if (job) {
    return {
      title: `${job.title} at ${job.company} (${job.locationDetails.city}, ${job.locationDetails.state})`,
      description: `${job.description.slice(0, 160)}... Apply now for ${job.title} at ${job.company}. Job ID: ${job.id}`,
      alternates: { canonical: `https://anikaay.online/jobs/${slug}` },
      openGraph: {
        title: `${job.title} - ${job.company}`,
        description: job.description,
        type: "article",
      },
    };
  }

  return { title: "Not Found | Anikaay" };
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} variant="grid" />
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

  // JSON-LD JobPosting schema including all fields
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    identifier: {
      "@type": "PropertyValue",
      name: job.company,
      value: job.id,
    },
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
      address: {
        "@type": "PostalAddress",
        addressLocality: job.locationDetails.city,
        addressRegion: job.locationDetails.state,
        addressCountry: job.locationDetails.country,
      },
    },
    ...(job.locationType === "remote" && { jobLocationType: "TELECOMMUTE" }),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.salaryCurrency ?? "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: job.salaryPeriod === "monthly" ? "MONTH" : "YEAR",
      },
    },
    qualifications: job.requiredQualifications.join(". "),
    responsibilities: job.responsibilities.join(". "),
    skills: [...job.skills.technical, ...job.skills.industry].join(", "),
    educationRequirements: job.education,
    experienceRequirements: job.experienceLevel,
  };

  const relatedJobs = featuredJobs
    .filter((j) => j.id !== job.id && (j.categorySlug === job.categorySlug || j.industry === job.industry))
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SingleJobView job={job} relatedJobs={relatedJobs} />
    </>
  );
}
