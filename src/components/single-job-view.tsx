"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Globe,
  Clock,
  IndianRupee,
  Building2,
  Wifi,
  ChevronRight,
  CheckCircle,
  CheckCircle2,
  Bookmark,
  Share2,
  Briefcase,
  GraduationCap,
  Calendar,
  Award,
  Layers,
  Sparkles,
  HeartHandshake,
  ExternalLink,
  Copy,
  Check,
  Mail,
  Send,
  Building,
  AlertCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";
import {
  type Job,
  type ApplicationStatus,
  formatSalary,
  formatMonthlySalary,
  formatSalaryWithPeriod,
  formatDatePosted,
  formatDeadline,
  timeAgo,
} from "@/lib/data";
import { cn } from "@/lib/utils";

interface SingleJobViewProps {
  job: Job;
  relatedJobs: Job[];
}

const TYPE_COLORS: Record<Job["type"], string> = {
  "full-time": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  "part-time": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
  contract: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
  internship: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25",
};

const STATUS_OPTIONS: ApplicationStatus[] = [
  "Not Applied",
  "Applied",
  "Interview",
  "Rejected",
  "Hired",
];

const STATUS_CONFIG: Record<ApplicationStatus, { color: string; icon: any }> = {
  "Not Applied": { color: "bg-muted text-muted-foreground border-border", icon: AlertCircle },
  "Applied": { color: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30", icon: Send },
  "Interview": { color: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30", icon: Clock },
  "Rejected": { color: "bg-destructive/15 text-destructive border-destructive/30", icon: AlertCircle },
  "Hired": { color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30", icon: CheckCircle2 },
};

export function SingleJobView({ job, relatedJobs }: SingleJobViewProps) {
  const [saved, setSaved] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [appStatus, setAppStatus] = React.useState<ApplicationStatus>(job.applicationStatus);
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  const [appliedSuccess, setAppliedSuccess] = React.useState(false);

  const deadline = formatDeadline(job.expiresAt);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleQuickApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setAppStatus("Applied");
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setAppliedSuccess(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* ── Breadcrumb Navigation ──────────────────────────────── */}
      <div className="bg-background-subtle border-b border-border py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/jobs" className="hover:text-foreground transition-colors">Jobs</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/jobs?industry=${job.industry}`} className="hover:text-foreground transition-colors">
              {job.industry}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{job.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              id="job-share-top-btn"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border bg-card text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3" />}
              <span>{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>
            <button
              id="job-save-top-btn"
              onClick={() => setSaved(!saved)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors text-xs",
                saved
                  ? "border-primary/30 bg-primary/10 text-primary font-medium"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              <Bookmark className={cn("w-3 h-3", saved && "fill-current")} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Left & Center Column (2 cols) ──────────────── */}
          <article className="lg:col-span-2 space-y-8" aria-label="Job details">
            {/* Header Card */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                {/* Company Logo / Monogram */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-subtle border border-border flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0 shadow-sm">
                  {job.companyLogo ? (
                    <span className="font-heading">{job.company[0]}</span>
                  ) : (
                    job.company[0]
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {job.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-hero text-white shadow-sm">
                        ⭐ Featured Role
                      </span>
                    )}
                    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", TYPE_COLORS[job.type])}>
                      {job.type.replace("-", " ")}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                    {job.title}
                  </h1>

                  {/* Company Name & Location */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                    <Link
                      href={`/companies/${job.companySlug}`}
                      className="font-semibold text-primary hover:underline flex items-center gap-1.5"
                    >
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </Link>
                    <span className="text-muted-foreground/60">•</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary/70" />
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlight Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-border/70 text-xs">
                {/* Monthly Salary */}
                <div className="bg-gradient-subtle/50 p-3.5 rounded-2xl border border-border/60">
                  <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-500" /> Monthly Salary
                  </p>
                  <p className="font-heading font-bold text-sm sm:text-base text-foreground">
                    {formatMonthlySalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                  </p>
                </div>

                {/* Annual Salary */}
                <div className="bg-gradient-subtle/50 p-3.5 rounded-2xl border border-border/60">
                  <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-primary" /> Annual Salary
                  </p>
                  <p className="font-heading font-bold text-sm sm:text-base text-foreground">
                    {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                  </p>
                </div>

                {/* Date Posted */}
                <div className="bg-gradient-subtle/50 p-3.5 rounded-2xl border border-border/60">
                  <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" /> Date Posted
                  </p>
                  <p className="font-heading font-bold text-xs sm:text-sm text-foreground">
                    {formatDatePosted(job.postedAt)}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{timeAgo(job.postedAt)}</p>
                </div>

                {/* Application Deadline */}
                <div className="bg-gradient-subtle/50 p-3.5 rounded-2xl border border-border/60">
                  <p className="text-muted-foreground font-medium mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Valid Through
                  </p>
                  <p className="font-heading font-bold text-xs sm:text-sm text-foreground">
                    {new Date(job.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <p className={`text-[10px] font-semibold mt-0.5 ${deadline.isClosingSoon ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}>
                    {deadline.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Identifier Pill Banner: Client ID & Job ID */}
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground font-medium">Job ID:</span>
                  <code className="bg-muted px-2 py-0.5 rounded-md font-mono text-[11px] text-foreground font-semibold">
                    {job.id}
                  </code>
                  <button
                    onClick={() => handleCopy(job.id, "jobId")}
                    className="p-1 hover:text-primary transition-colors"
                    title="Copy Job ID"
                  >
                    {copiedId === "jobId" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground font-medium">Client ID:</span>
                  <code className="bg-muted px-2 py-0.5 rounded-md font-mono text-[11px] text-foreground font-semibold">
                    {job.clientId}
                  </code>
                  <button
                    onClick={() => handleCopy(job.clientId, "clientId")}
                    className="p-1 hover:text-primary transition-colors"
                    title="Copy Client ID"
                  >
                    {copiedId === "clientId" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Status Tracker Pill */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">My Status:</span>
                <select
                  id="job-application-status-select"
                  value={appStatus}
                  onChange={(e) => setAppStatus(e.target.value as ApplicationStatus)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${STATUS_CONFIG[appStatus].color}`}
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comprehensive Specifications Overview Grid */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" /> Key Job Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Employment Type</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5 capitalize">
                    {job.type.replace("-", " ")}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Workplace Type</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5 capitalize">
                    {job.locationType}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Location</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5">
                    {job.locationDetails.city}, {job.locationDetails.state}, {job.locationDetails.country}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Experience Level</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5">
                    {job.experienceLevel}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Education Requirements</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5">
                    {job.education} Degree
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Department</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5">
                    {job.department}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Industry</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5">
                    {job.industry}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Company Size</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5">
                    {job.companySize} employees
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/80 bg-background/50">
                  <span className="text-muted-foreground">Salary Period</span>
                  <p className="font-semibold text-sm text-foreground mt-0.5 capitalize">
                    {job.salaryPeriod} ({job.salaryCurrency})
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Job Description */}
            <section className="bg-card border border-border rounded-3xl p-6 sm:p-8" aria-labelledby="job-desc-heading">
              <h2 id="job-desc-heading" className="font-heading font-bold text-xl text-foreground mb-4">
                Job Description
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {job.description}
              </p>
            </section>

            {/* 2. Responsibilities */}
            <section className="bg-card border border-border rounded-3xl p-6 sm:p-8" aria-labelledby="responsibilities-heading">
              <h2 id="responsibilities-heading" className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Required Qualifications */}
            <section className="bg-card border border-border rounded-3xl p-6 sm:p-8" aria-labelledby="required-qualifications-heading">
              <h2 id="required-qualifications-heading" className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Required Qualifications
              </h2>
              <ul className="space-y-3">
                {job.requiredQualifications.map((rq, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{rq}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Preferred Qualifications */}
            <section className="bg-card border border-border rounded-3xl p-6 sm:p-8" aria-labelledby="preferred-qualifications-heading">
              <h2 id="preferred-qualifications-heading" className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Preferred Qualifications
              </h2>
              <ul className="space-y-3">
                {job.preferredQualifications.map((pq, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{pq}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Skills (Technical, Soft, Industry) */}
            <section className="bg-card border border-border rounded-3xl p-6 sm:p-8" aria-labelledby="skills-heading">
              <h2 id="skills-heading" className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Skills & Competencies
              </h2>

              <div className="space-y-5">
                {/* Technical Skills */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.technical.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.soft.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industry Skills */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Industry Knowledge
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.industry.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-muted text-muted-foreground border border-border"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Benefits & Perks */}
            <section className="bg-card border border-border rounded-3xl p-6 sm:p-8" aria-labelledby="benefits-heading">
              <h2 id="benefits-heading" className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-rose-500" /> Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border/70 bg-background/50">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Contact / Application Instructions */}
            <section className="bg-card border border-border rounded-3xl p-6 sm:p-8" aria-labelledby="contact-instructions-heading">
              <h2 id="contact-instructions-heading" className="font-heading font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" /> Contact & Application Instructions
              </h2>
              <div className="bg-muted/40 border border-border rounded-2xl p-4 sm:p-5 text-sm leading-relaxed text-muted-foreground">
                <p className="mb-3">{job.contactInstructions}</p>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60 text-xs">
                  <span className="font-semibold text-foreground">Direct Apply URL:</span>
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-mono inline-flex items-center gap-1"
                  >
                    {job.applicationUrl} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>
          </article>

          {/* ── Sidebar (Right Column) ─────────────────────────── */}
          <aside className="lg:col-span-1 space-y-6" aria-label="Application summary and actions">
            {/* Primary Action Card */}
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-xl shadow-primary/5 space-y-5">
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Apply for this role
                </h3>

                {/* Salary Overview Box */}
                <div className="p-4 rounded-2xl bg-gradient-subtle border border-primary/20 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Estimated Monthly</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatMonthlySalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Annual Range</span>
                    <span className="font-heading font-extrabold text-base text-foreground">
                      {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
                    </span>
                  </div>
                </div>

                {/* Apply Buttons */}
                <div className="space-y-2.5">
                  <Button
                    id={`apply-now-btn-${job.id}`}
                    onClick={() => setIsApplyModalOpen(true)}
                    size="lg"
                    className="w-full bg-gradient-hero text-white font-bold hover:opacity-90 shadow-lg shadow-primary/25 h-12 rounded-xl text-base"
                  >
                    Apply Now
                  </Button>

                  <a
                    id={`external-apply-link-${job.id}`}
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 text-xs rounded-xl h-9 hover:bg-muted"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Apply on Company Site
                    </Button>
                  </a>
                </div>

                {/* Save and Share */}
                <div className="flex gap-2 pt-2 border-t border-border/70">
                  <Button
                    id={`save-sidebar-btn-${job.id}`}
                    variant="outline"
                    size="sm"
                    onClick={() => setSaved(!saved)}
                    className={cn(
                      "flex-1 gap-1.5 rounded-xl text-xs",
                      saved && "text-primary border-primary/40 bg-primary/5"
                    )}
                  >
                    <Bookmark className={cn("w-3.5 h-3.5", saved && "fill-current")} />
                    {saved ? "Saved" : "Save Job"}
                  </Button>
                  <Button
                    id={`share-sidebar-btn-${job.id}`}
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex-1 gap-1.5 rounded-xl text-xs"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                    {copiedLink ? "Copied" : "Share"}
                  </Button>
                </div>

                {/* Status selector */}
                <div className="pt-3 border-t border-border/70">
                  <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                    Your Application Status:
                  </label>
                  <select
                    id="sidebar-status-select"
                    value={appStatus}
                    onChange={(e) => setAppStatus(e.target.value as ApplicationStatus)}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${STATUS_CONFIG[appStatus].color}`}
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Company Info Card */}
              <Link
                href={`/companies/${job.companySlug}`}
                className="group block rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-lg font-bold text-foreground">
                    {job.company[0]}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                      {job.company}
                    </h4>
                    <p className="text-xs text-muted-foreground">{job.industry} · {job.companySize} employees</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Learn more about company culture, verified hiring managers, and active roles.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 group-hover:underline">
                  View Company Profile →
                </span>
              </Link>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h4 className="font-heading font-bold text-sm text-foreground mb-4">
                    Similar Opportunities
                  </h4>
                  <div className="space-y-3">
                    {relatedJobs.map((rj) => (
                      <Link
                        key={rj.id}
                        href={`/jobs/${rj.slug}`}
                        className="block p-3 rounded-2xl border border-border/70 hover:border-primary/40 hover:bg-muted/30 transition-all group"
                      >
                        <p className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {rj.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{rj.company} · {rj.locationDetails.city}</p>
                        <p className="text-[11px] font-semibold text-primary mt-1">
                          {formatSalary(rj.salaryMin, rj.salaryMax, rj.salaryCurrency)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Interactive Direct Application Modal ───────────────── */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsApplyModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Apply for {job.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {job.company} · Ref: {job.id}
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {appliedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-lg text-foreground">Application Submitted!</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Your application for {job.title} has been forwarded to the hiring team at {job.company}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickApply} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Portfolio or GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/janedoe"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Brief Cover Note</label>
                  <textarea
                    rows={3}
                    placeholder="Tell the hiring manager why you are excited for this role..."
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-hero text-white font-bold h-10 rounded-xl"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
