"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Star,
  Wifi,
  Building,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Job, formatSalary, timeAgo } from "@/lib/data";

const LOCATION_ICONS = {
  remote: Globe,
  hybrid: Wifi,
  onsite: Building,
};

const TYPE_COLORS: Record<Job["type"], string> = {
  "full-time": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "part-time": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  contract: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  internship: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function JobCard({ job, variant = "default", className }: JobCardProps) {
  const [saved, setSaved] = React.useState(false);
  const LocationIcon = LOCATION_ICONS[job.locationType];

  if (variant === "compact") {
    return (
      <Link
        href={`/jobs/${job.slug}`}
        className={cn(
          "group flex items-center gap-4 p-4 rounded-xl border border-border",
          "bg-card hover:border-primary/30 hover:bg-primary/2",
          "transition-all duration-200 card-lift",
          className
        )}
      >
        {/* Company Avatar */}
        <div className="w-10 h-10 rounded-lg bg-gradient-subtle border border-border flex items-center justify-center flex-shrink-0 text-sm font-bold text-foreground">
          {job.company[0]}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {job.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{job.company} · {job.location}</p>
        </div>

        <div className="flex-shrink-0 text-right">
          <p className="text-xs font-medium text-foreground">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(job.postedAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "group relative rounded-2xl border border-border bg-card overflow-hidden",
          "hover:border-primary/40 transition-all duration-300 card-lift",
          className
        )}
      >
        {/* Featured badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-gradient-hero text-white shadow-lg shadow-primary/25">
            <Star className="w-2.5 h-2.5 fill-white" />
            Featured
          </span>
        </div>

        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-0 left-0" />

        <div className="p-6">
          {/* Company row */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-lg font-bold flex-shrink-0">
              {job.company[0]}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <Link
                href={`/jobs/${job.slug}`}
                className="font-heading font-semibold text-base text-foreground hover:text-primary transition-colors line-clamp-1"
              >
                {job.title}
              </Link>
              <Link
                href={`/companies/${job.companySlug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {job.company}
              </Link>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-5">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <LocationIcon className="w-3 h-3" />
              {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
            </span>
            {(job.salaryMin || job.salaryMax) && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1 text-foreground font-medium">
                  <DollarSign className="w-3 h-3" />
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-medium border", TYPE_COLORS[job.type])}>
              {job.type.replace("-", " ")}
            </span>
            {job.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(job.postedAt)}
            </span>
            <div className="flex items-center gap-2">
              <button
                id={`save-job-${job.id}`}
                onClick={() => setSaved(!saved)}
                aria-label={saved ? "Unsave job" : "Save job"}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  saved
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Bookmark className={cn("w-3.5 h-3.5", saved && "fill-current")} />
              </button>
              <Link href={`/jobs/${job.slug}`}>
                <Button
                  id={`apply-job-${job.id}`}
                  size="sm"
                  className="text-xs bg-gradient-hero text-white font-semibold hover:opacity-90 shadow-md shadow-primary/20"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-sm font-bold flex-shrink-0">
          {job.company[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={`/jobs/${job.slug}`}
                className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-1"
              >
                {job.title}
              </Link>
              <Link
                href={`/companies/${job.companySlug}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {job.company}
              </Link>
            </div>
            <button
              id={`save-job-${job.id}`}
              onClick={() => setSaved(!saved)}
              aria-label={saved ? "Unsave job" : "Save job"}
              className={cn(
                "p-1.5 rounded-lg flex-shrink-0 transition-all duration-200",
                saved
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Bookmark className={cn("w-3.5 h-3.5", saved && "fill-current")} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <LocationIcon className="w-3 h-3" />
              {job.locationType}
            </span>
            {(job.salaryMin || job.salaryMax) && (
              <span className="font-medium text-foreground">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium border", TYPE_COLORS[job.type])}>
              {job.type.replace("-", " ")}
            </span>
            {job.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground border border-border">
                {tag}
              </span>
            ))}
            <span className="ml-auto text-[10px] text-muted-foreground">{timeAgo(job.postedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
