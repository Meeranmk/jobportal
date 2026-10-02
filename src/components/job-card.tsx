"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Bookmark,
  Star,
  Wifi,
  Building,
  Globe,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type Job,
  formatSalary,
  formatMonthlySalary,
  timeAgo,
  formatDeadline,
} from "@/lib/data";

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

const STATUS_BADGES: Record<Job["applicationStatus"], { label: string; className: string }> = {
  "Not Applied": { label: "Not Applied", className: "bg-muted text-muted-foreground border-border" },
  "Applied": { label: "Applied", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25" },
  "Interview": { label: "Interview", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25" },
  "Rejected": { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/25" },
  "Hired": { label: "Hired 🎉", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
};

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact" | "featured" | "grid";
  className?: string;
  onStatusChange?: (jobId: string, newStatus: Job["applicationStatus"]) => void;
}

export function JobCard({ job, variant = "grid", className, onStatusChange }: JobCardProps) {
  const [saved, setSaved] = React.useState(false);
  const [status, setStatus] = React.useState<Job["applicationStatus"]>(job.applicationStatus);
  const LocationIcon = LOCATION_ICONS[job.locationType] || Building;
  const deadlineInfo = formatDeadline(job.expiresAt);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  // Compact List Item
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
        <div className="w-10 h-10 rounded-lg bg-gradient-subtle border border-border flex items-center justify-center flex-shrink-0 text-sm font-bold text-foreground">
          {job.companyLogo ? (
            <span className="font-heading">{job.company[0]}</span>
          ) : (
            job.company[0]
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {job.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{job.company} · {job.location}</p>
        </div>

        <div className="flex-shrink-0 text-right">
          <p className="text-xs font-medium text-foreground">
            {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(job.postedAt)}</p>
        </div>
      </Link>
    );
  }

  // Horizontal / Default List Card
  if (variant === "default") {
    return (
      <div
        className={cn(
          "group relative rounded-2xl border border-border bg-card p-6",
          "hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5",
          "transition-all duration-300 card-lift",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-lg font-bold text-primary flex-shrink-0 shadow-sm">
              {job.company[0]}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="font-heading font-semibold text-base sm:text-lg text-foreground hover:text-primary transition-colors line-clamp-1"
                >
                  {job.title}
                </Link>
                {job.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-hero text-white">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Link href={`/companies/${job.companySlug}`} className="hover:text-foreground font-medium transition-colors">
                  {job.company}
                </Link>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span>•</span>
                <span className="capitalize">{job.locationType}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full border", STATUS_BADGES[status].className)}>
              {STATUS_BADGES[status].label}
            </span>
            <button
              id={`save-job-${job.id}`}
              onClick={toggleSave}
              aria-label={saved ? "Unsave job" : "Save job"}
              className={cn(
                "p-2 rounded-lg border border-border/80 transition-all",
                saved ? "text-primary bg-primary/10 border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-medium border", TYPE_COLORS[job.type])}>
              {job.type.replace("-", " ")}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-secondary text-secondary-foreground">
              {job.experienceLevel}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted text-muted-foreground">
              {job.department}
            </span>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="font-heading font-semibold text-sm text-foreground">
                {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {formatMonthlySalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
              </p>
            </div>
            <Link href={`/jobs/${job.slug}`}>
              <Button size="sm" className="bg-gradient-hero text-white text-xs font-semibold hover:opacity-90">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Card (Primary for Job Page Grid)
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between",
        "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 card-lift",
        className
      )}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Company, Logo, Save */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-lg font-bold text-foreground flex-shrink-0 group-hover:border-primary/40 transition-colors shadow-sm">
              {job.company[0]}
            </div>
            <div className="min-w-0">
              <Link
                href={`/companies/${job.companySlug}`}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors block truncate"
              >
                {job.company}
              </Link>
              <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="truncate">{job.locationDetails.city}, {job.locationDetails.state}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {job.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-hero text-white shadow-sm">
                ⭐
              </span>
            )}
            <button
              id={`save-job-btn-${job.id}`}
              onClick={toggleSave}
              aria-label={saved ? "Unsave job" : "Save job"}
              className={cn(
                "p-1.5 rounded-lg border border-border/60 transition-all",
                saved ? "text-primary bg-primary/10 border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Bookmark className={cn("w-3.5 h-3.5", saved && "fill-current")} />
            </button>
          </div>
        </div>

        {/* Job Title & Slug Link */}
        <Link
          href={`/jobs/${job.slug}`}
          className="font-heading font-bold text-base text-foreground hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug"
        >
          {job.title}
        </Link>

        {/* Meta badges: Workplace Type & Employment Type */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-medium border flex items-center gap-1", TYPE_COLORS[job.type])}>
            <Briefcase className="w-3 h-3" />
            {job.type.replace("-", " ")}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-secondary text-secondary-foreground border border-border/50 flex items-center gap-1">
            <LocationIcon className="w-3 h-3 text-primary" />
            {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground border border-border/40">
            {job.experienceLevel}
          </span>
        </div>

        {/* Salary Showcase: Annual & Monthly */}
        <div className="bg-gradient-subtle/80 border border-border/80 rounded-xl p-3 mb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-medium text-muted-foreground">Annual Salary</span>
            <span className="font-heading font-bold text-sm text-foreground">
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1 pt-1 border-t border-border/40 text-[11px]">
            <span className="text-muted-foreground">Monthly Salary</span>
            <span className="font-semibold text-primary">
              {formatMonthlySalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </span>
          </div>
        </div>

        {/* Skills Tag Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {job.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-card border border-border text-muted-foreground group-hover:border-primary/30 transition-colors"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] text-muted-foreground bg-muted">
              +{job.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Status, Deadline, Action */}
      <div className="p-4 bg-muted/20 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{timeAgo(job.postedAt)}</span>
          </div>
          {deadlineInfo.isClosingSoon && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-2.5 h-2.5" />
              {deadlineInfo.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", STATUS_BADGES[status].className)}>
            {STATUS_BADGES[status].label}
          </span>
          <Link href={`/jobs/${job.slug}`}>
            <Button
              id={`apply-card-btn-${job.id}`}
              size="sm"
              className="text-xs h-7 px-3 bg-gradient-hero text-white font-medium hover:opacity-95 shadow-sm"
            >
              View Role
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
