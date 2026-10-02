"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  Grid3X3,
  List,
  Building2,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Calendar,
  Layers,
  Sparkles,
  Award,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";
import {
  type Job,
  type WorkplaceType,
  type EmploymentType,
  type ExperienceLevel,
  type EducationLevel,
  type IndustryType,
  type DepartmentType,
  type CompanySizeType,
  type ApplicationDeadlineStatus,
  type ApplicationStatus,
} from "@/lib/data";

interface JobsGridExplorerProps {
  initialJobs: Job[];
  initialQuery?: string;
  initialLocation?: string;
  initialMode?: string;
  initialType?: string;
  initialIndustry?: string;
  initialMinSalary?: string;
  initialMaxSalary?: string;
  initialDeadline?: string;
  initialDepartment?: string;
}

export function JobsGridExplorer({
  initialJobs,
  initialQuery = "",
  initialLocation = "",
  initialMode = "",
  initialType = "",
  initialIndustry = "",
  initialMinSalary = "",
  initialMaxSalary = "",
  initialDeadline = "",
  initialDepartment = "",
}: JobsGridExplorerProps) {
  // ── Filters State ─────────────────────────────────────────
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [locationQuery, setLocationQuery] = React.useState(initialLocation);

  // 1. Location (City, State, Country)
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(
    initialLocation ? [initialLocation] : []
  );

  // 2. Salary Range
  const [salaryCurrency, setSalaryCurrency] = React.useState<string>("INR");
  const [salaryPeriod, setSalaryPeriod] = React.useState<"annual" | "monthly">("annual");
  const [minSalary, setMinSalary] = React.useState<number | "">(
    initialMinSalary ? Number(initialMinSalary) : ""
  );
  const [maxSalary, setMaxSalary] = React.useState<number | "">(
    initialMaxSalary ? Number(initialMaxSalary) : ""
  );

  // 3. Job Type (Employment Type)
  const [selectedJobTypes, setSelectedJobTypes] = React.useState<EmploymentType[]>(
    initialType ? [initialType as EmploymentType] : []
  );

  // 4. Job Location (Workplace Type)
  const [selectedWorkplaceTypes, setSelectedWorkplaceTypes] = React.useState<WorkplaceType[]>(
    initialMode ? [initialMode.toLowerCase() as WorkplaceType] : []
  );

  // 5. Experience Level
  const [selectedExperienceLevels, setSelectedExperienceLevels] = React.useState<ExperienceLevel[]>([]);

  // 6. Education
  const [selectedEducations, setSelectedEducations] = React.useState<EducationLevel[]>([]);

  // 7. Date Posted
  const [selectedDatePosted, setSelectedDatePosted] = React.useState<string>("all");

  // 8. Company
  const [companySearch, setCompanySearch] = React.useState<string>("");
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([]);

  // 9. Industry
  const [selectedIndustries, setSelectedIndustries] = React.useState<IndustryType[]>(
    initialIndustry ? [initialIndustry as IndustryType] : []
  );

  // 10. Skills (Technical, Soft, Industry)
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);

  // 11. Department
  const [selectedDepartments, setSelectedDepartments] = React.useState<DepartmentType[]>(
    initialDepartment ? [initialDepartment as DepartmentType] : []
  );

  // 12. Application Deadline
  const [selectedDeadlines, setSelectedDeadlines] = React.useState<ApplicationDeadlineStatus[]>(
    initialDeadline === "closed"
      ? ["Closed"]
      : initialDeadline === "3days" || initialDeadline === "7days" || initialDeadline === "today"
      ? ["Closing Soon", "Open"]
      : []
  );

  // 13. Company Size
  const [selectedCompanySizes, setSelectedCompanySizes] = React.useState<CompanySizeType[]>([]);

  // 14. Benefits
  const [selectedBenefits, setSelectedBenefits] = React.useState<string[]>([]);

  // 15. Application Status
  const [selectedAppStatuses, setSelectedAppStatuses] = React.useState<ApplicationStatus[]>([]);

  // UI state
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = React.useState<string>("recent");
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  // Accordion collapsed state for sections
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    location: true,
    salary: true,
    jobType: true,
    workplace: true,
    experience: true,
    education: false,
    datePosted: false,
    company: false,
    industry: false,
    skills: false,
    department: false,
    deadline: false,
    companySize: false,
    benefits: false,
    applicationStatus: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper toggle handlers
  const toggleItem = <T extends string>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>, item: T) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  // ── Available options derived from data ─────────────────────
  const allLocations = React.useMemo(() => {
    const locs = new Set<string>();
    initialJobs.forEach((j) => {
      locs.add(j.locationDetails.city);
      locs.add(j.locationDetails.state);
      locs.add(j.locationDetails.country);
    });
    return Array.from(locs);
  }, [initialJobs]);

  const allCompanies = React.useMemo(() => {
    return Array.from(new Set(initialJobs.map((j) => j.company)));
  }, [initialJobs]);

  const allSkills = React.useMemo(() => {
    const tech = new Set<string>();
    const soft = new Set<string>();
    const ind = new Set<string>();
    initialJobs.forEach((j) => {
      j.skills.technical.forEach((s) => tech.add(s));
      j.skills.soft.forEach((s) => soft.add(s));
      j.skills.industry.forEach((s) => ind.add(s));
    });
    return {
      technical: Array.from(tech),
      soft: Array.from(soft),
      industry: Array.from(ind),
    };
  }, [initialJobs]);

  // ── Filtering Logic ───────────────────────────────────────
  const filteredJobs = React.useMemo(() => {
    const now = new Date().getTime();

    return initialJobs.filter((job) => {
      // Free text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = job.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesTags && !matchesDesc) {
          return false;
        }
      }

      // 1. Location
      if (locationQuery.trim()) {
        const lq = locationQuery.toLowerCase();
        const locString = `${job.location} ${job.locationDetails.city} ${job.locationDetails.state} ${job.locationDetails.country}`.toLowerCase();
        if (!locString.includes(lq)) return false;
      }
      if (selectedLocations.length > 0) {
        const match = selectedLocations.some(
          (loc) =>
            job.locationDetails.city.toLowerCase() === loc.toLowerCase() ||
            job.locationDetails.state.toLowerCase() === loc.toLowerCase() ||
            job.locationDetails.country.toLowerCase() === loc.toLowerCase()
        );
        if (!match) return false;
      }

      // 2. Salary Range
      if (minSalary !== "") {
        const target = salaryPeriod === "monthly" ? (job.monthlySalaryMax || job.monthlySalaryMin || 0) : (job.salaryMax || job.salaryMin || 0);
        if (target < Number(minSalary)) return false;
      }
      if (maxSalary !== "") {
        const target = salaryPeriod === "monthly" ? (job.monthlySalaryMin || job.monthlySalaryMax || 0) : (job.salaryMin || job.salaryMax || 0);
        if (target > Number(maxSalary)) return false;
      }

      // 3. Job Type (Full-time, Part-time, Contract, Internship)
      if (selectedJobTypes.length > 0 && !selectedJobTypes.includes(job.type)) {
        return false;
      }

      // 4. Job Location / Workplace Type (Remote, Hybrid, On-site)
      if (selectedWorkplaceTypes.length > 0 && !selectedWorkplaceTypes.includes(job.locationType)) {
        return false;
      }

      // 5. Experience Level (Entry Level, Mid Level, Senior Level, Executive)
      if (selectedExperienceLevels.length > 0 && !selectedExperienceLevels.includes(job.experienceLevel)) {
        return false;
      }

      // 6. Education (High School, Diploma, Bachelor’s, Master’s, Doctorate)
      if (selectedEducations.length > 0 && !selectedEducations.includes(job.education)) {
        return false;
      }

      // 7. Date Posted (Today, Last 3 Days, Last 7 Days, Last 30 Days)
      if (selectedDatePosted !== "all") {
        const postedTime = new Date(job.postedAt).getTime();
        const diffHours = (now - postedTime) / (1000 * 60 * 60);
        if (selectedDatePosted === "today" && diffHours > 24) return false;
        if (selectedDatePosted === "3days" && diffHours > 72) return false;
        if (selectedDatePosted === "7days" && diffHours > 168) return false;
        if (selectedDatePosted === "30days" && diffHours > 720) return false;
      }

      // 8. Company
      if (selectedCompanies.length > 0 && !selectedCompanies.includes(job.company)) {
        return false;
      }

      // 9. Industry (IT, Finance, Healthcare, Education, Marketing, Retail)
      if (selectedIndustries.length > 0 && !selectedIndustries.includes(job.industry)) {
        return false;
      }

      // 10. Skills (Technical, Soft, Industry)
      if (selectedSkills.length > 0) {
        const jobSkillsSet = new Set([
          ...job.skills.technical,
          ...job.skills.soft,
          ...job.skills.industry,
          ...job.tags,
        ]);
        const hasSkill = selectedSkills.some((s) => jobSkillsSet.has(s));
        if (!hasSkill) return false;
      }

      // 11. Department (Engineering, Sales, Marketing, Finance, Human Resources, Operations)
      if (selectedDepartments.length > 0 && !selectedDepartments.includes(job.department)) {
        return false;
      }

      // 12. Application Deadline (Open, Closing Soon, Closed)
      if (selectedDeadlines.length > 0) {
        if (!selectedDeadlines.includes(job.deadlineStatus)) return false;
      }

      // 13. Company Size (1–10, 11–50, 51–200, 201–500, 501–1000, 1000+)
      if (selectedCompanySizes.length > 0 && !selectedCompanySizes.includes(job.companySize)) {
        return false;
      }

      // 14. Benefits (Health Insurance, Paid Time Off, Retirement Plan, Flexible Hours)
      if (selectedBenefits.length > 0) {
        const hasAllBenefits = selectedBenefits.every((b) => job.benefits.includes(b));
        if (!hasAllBenefits) return false;
      }

      // 15. Application Status (Not Applied, Applied, Interview, Rejected, Hired)
      if (selectedAppStatuses.length > 0 && !selectedAppStatuses.includes(job.applicationStatus)) {
        return false;
      }

      return true;
    });
  }, [
    initialJobs,
    searchQuery,
    locationQuery,
    selectedLocations,
    minSalary,
    maxSalary,
    salaryPeriod,
    selectedJobTypes,
    selectedWorkplaceTypes,
    selectedExperienceLevels,
    selectedEducations,
    selectedDatePosted,
    selectedCompanies,
    selectedIndustries,
    selectedSkills,
    selectedDepartments,
    selectedDeadlines,
    selectedCompanySizes,
    selectedBenefits,
    selectedAppStatuses,
  ]);

  // ── Sorting ───────────────────────────────────────────────
  const sortedJobs = React.useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sortBy === "salary-high") {
        return (b.salaryMax || b.salaryMin || 0) - (a.salaryMax || a.salaryMin || 0);
      }
      if (sortBy === "salary-low") {
        return (a.salaryMin || a.salaryMax || 0) - (b.salaryMin || b.salaryMax || 0);
      }
      if (sortBy === "deadline") {
        return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      // default: recent
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }, [filteredJobs, sortBy]);

  // ── Reset all filters ─────────────────────────────────────
  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedLocations([]);
    setMinSalary("");
    setMaxSalary("");
    setSelectedJobTypes([]);
    setSelectedWorkplaceTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedEducations([]);
    setSelectedDatePosted("all");
    setSelectedCompanies([]);
    setSelectedIndustries([]);
    setSelectedSkills([]);
    setSelectedDepartments([]);
    setSelectedDeadlines([]);
    setSelectedCompanySizes([]);
    setSelectedBenefits([]);
    setSelectedAppStatuses([]);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    locationQuery !== "" ||
    selectedLocations.length > 0 ||
    minSalary !== "" ||
    maxSalary !== "" ||
    selectedJobTypes.length > 0 ||
    selectedWorkplaceTypes.length > 0 ||
    selectedExperienceLevels.length > 0 ||
    selectedEducations.length > 0 ||
    selectedDatePosted !== "all" ||
    selectedCompanies.length > 0 ||
    selectedIndustries.length > 0 ||
    selectedSkills.length > 0 ||
    selectedDepartments.length > 0 ||
    selectedDeadlines.length > 0 ||
    selectedCompanySizes.length > 0 ||
    selectedBenefits.length > 0 ||
    selectedAppStatuses.length > 0;

  // Active filter count
  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (locationQuery ? 1 : 0) +
    selectedLocations.length +
    (minSalary || maxSalary ? 1 : 0) +
    selectedJobTypes.length +
    selectedWorkplaceTypes.length +
    selectedExperienceLevels.length +
    selectedEducations.length +
    (selectedDatePosted !== "all" ? 1 : 0) +
    selectedCompanies.length +
    selectedIndustries.length +
    selectedSkills.length +
    selectedDepartments.length +
    selectedDeadlines.length +
    selectedCompanySizes.length +
    selectedBenefits.length +
    selectedAppStatuses.length;

  // Render Filter Form Component (used in both desktop sidebar & mobile drawer)
  const FilterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h2 className="font-heading font-semibold text-sm text-foreground">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            id="clear-all-filters-btn"
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* 1. Location (City, State, Country) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("location")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Location
          </span>
          {openSections.location ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.location && (
          <div className="space-y-2 mt-2">
            <input
              id="filter-location-input"
              type="text"
              placeholder="City, State, e.g. Bengaluru, Mumbai..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs focus:ring-1 focus:ring-primary outline-none"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai"].map((loc) => (
                <button
                  key={loc}
                  id={`filter-loc-${loc.toLowerCase().replace(" ", "-")}`}
                  onClick={() => toggleItem(selectedLocations, setSelectedLocations, loc)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                    selectedLocations.includes(loc)
                      ? "bg-primary text-primary-foreground border-primary font-medium"
                      : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Salary Range (Minimum, Maximum, Currency, Monthly, Annual) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("salary")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-500" /> Salary Range
          </span>
          {openSections.salary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.salary && (
          <div className="space-y-2.5 mt-2">
            <div className="flex items-center justify-between gap-2">
              {/* Period toggle: Annual / Monthly */}
              <div className="inline-flex p-0.5 rounded-lg border border-border bg-muted/50 text-[11px]">
                <button
                  id="salary-period-annual"
                  type="button"
                  onClick={() => setSalaryPeriod("annual")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    salaryPeriod === "annual" ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  Annual
                </button>
                <button
                  id="salary-period-monthly"
                  type="button"
                  onClick={() => setSalaryPeriod("monthly")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    salaryPeriod === "monthly" ? "bg-card text-foreground font-semibold shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  Monthly
                </button>
              </div>

              <span className="text-[11px] font-semibold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-lg border border-border/70">
                ₹ INR
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-min-salary"
                type="number"
                placeholder={salaryPeriod === "monthly" ? "Min ₹25,000" : "Min ₹3,00,000"}
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value ? Number(e.target.value) : "")}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs focus:ring-1 focus:ring-primary outline-none"
              />
              <span className="text-muted-foreground text-xs">–</span>
              <input
                id="filter-max-salary"
                type="number"
                placeholder={salaryPeriod === "monthly" ? "Max ₹2,50,000" : "Max ₹35,00,000"}
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value ? Number(e.target.value) : "")}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Job Type (Full-time, Part-time, Contract, Internship) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("jobType")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Job Type
          </span>
          {openSections.jobType ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.jobType && (
          <div className="space-y-1.5 mt-2">
            {(["full-time", "part-time", "contract", "internship"] as EmploymentType[]).map((type) => {
              const count = initialJobs.filter((j) => j.type === type).length;
              return (
                <label key={type} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-type-${type}`}
                      type="checkbox"
                      checked={selectedJobTypes.includes(type)}
                      onChange={() => toggleItem(selectedJobTypes, setSelectedJobTypes, type)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="capitalize text-muted-foreground group-hover:text-foreground transition-colors">
                      {type.replace("-", " ")}
                    </span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Job Location (Remote, Hybrid, On-site) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("workplace")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-500" /> Job Location (Workplace)
          </span>
          {openSections.workplace ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.workplace && (
          <div className="space-y-1.5 mt-2">
            {(["remote", "hybrid", "onsite"] as WorkplaceType[]).map((mode) => {
              const label = mode === "onsite" ? "On-site" : mode.charAt(0).toUpperCase() + mode.slice(1);
              const count = initialJobs.filter((j) => j.locationType === mode).length;
              return (
                <label key={mode} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-workplace-${mode}`}
                      type="checkbox"
                      checked={selectedWorkplaceTypes.includes(mode)}
                      onChange={() => toggleItem(selectedWorkplaceTypes, setSelectedWorkplaceTypes, mode)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {label}
                    </span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Experience Level (Entry Level, Mid Level, Senior Level, Executive) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("experience")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" /> Experience Level
          </span>
          {openSections.experience ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.experience && (
          <div className="space-y-1.5 mt-2">
            {(["Entry Level", "Mid Level", "Senior Level", "Executive"] as ExperienceLevel[]).map((lvl) => {
              const count = initialJobs.filter((j) => j.experienceLevel === lvl).length;
              return (
                <label key={lvl} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-exp-${lvl.toLowerCase().replace(" ", "-")}`}
                      type="checkbox"
                      checked={selectedExperienceLevels.includes(lvl)}
                      onChange={() => toggleItem(selectedExperienceLevels, setSelectedExperienceLevels, lvl)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{lvl}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Education (High School, Diploma, Bachelor’s, Master’s, Doctorate) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("education")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-teal-500" /> Education
          </span>
          {openSections.education ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.education && (
          <div className="space-y-1.5 mt-2">
            {(["High School", "Diploma", "Bachelor’s", "Master’s", "Doctorate"] as EducationLevel[]).map((edu) => {
              const count = initialJobs.filter((j) => j.education === edu).length;
              return (
                <label key={edu} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-edu-${edu.toLowerCase().replace(/[^\w]/g, "")}`}
                      type="checkbox"
                      checked={selectedEducations.includes(edu)}
                      onChange={() => toggleItem(selectedEducations, setSelectedEducations, edu)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{edu}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Date Posted (Today, Last 3 Days, Last 7 Days, Last 30 Days) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("datePosted")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-rose-500" /> Date Posted
          </span>
          {openSections.datePosted ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.datePosted && (
          <div className="space-y-1.5 mt-2">
            {[
              { id: "all", label: "Anytime" },
              { id: "today", label: "Today" },
              { id: "3days", label: "Last 3 Days" },
              { id: "7days", label: "Last 7 Days" },
              { id: "30days", label: "Last 30 Days" },
            ].map((dp) => (
              <label key={dp.id} className="flex items-center gap-2 py-1 text-xs cursor-pointer group">
                <input
                  id={`filter-dp-${dp.id}`}
                  type="radio"
                  name="datePosted"
                  checked={selectedDatePosted === dp.id}
                  onChange={() => setSelectedDatePosted(dp.id)}
                  className="border-border text-primary focus:ring-primary/50"
                />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {dp.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 8. Company (Company Name) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("company")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-violet-500" /> Company
          </span>
          {openSections.company ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.company && (
          <div className="space-y-2 mt-2">
            <input
              id="filter-company-input"
              type="text"
              placeholder="Search companies..."
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
              {allCompanies
                .filter((c) => c.toLowerCase().includes(companySearch.toLowerCase()))
                .map((comp) => {
                  const count = initialJobs.filter((j) => j.company === comp).length;
                  return (
                    <label key={comp} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                      <span className="flex items-center gap-2">
                        <input
                          id={`filter-comp-${comp.toLowerCase().replace(/[^\w]/g, "")}`}
                          type="checkbox"
                          checked={selectedCompanies.includes(comp)}
                          onChange={() => toggleItem(selectedCompanies, setSelectedCompanies, comp)}
                          className="rounded border-border text-primary focus:ring-primary/50"
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[130px]">
                          {comp}
                        </span>
                      </span>
                      <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    </label>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* 9. Industry (IT, Finance, Healthcare, Education, Marketing, Retail) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("industry")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-500" /> Industry
          </span>
          {openSections.industry ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.industry && (
          <div className="space-y-1.5 mt-2">
            {(["IT", "Finance", "Healthcare", "Education", "Marketing", "Retail"] as IndustryType[]).map((ind) => {
              const count = initialJobs.filter((j) => j.industry === ind).length;
              return (
                <label key={ind} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-ind-${ind.toLowerCase()}`}
                      type="checkbox"
                      checked={selectedIndustries.includes(ind)}
                      onChange={() => toggleItem(selectedIndustries, setSelectedIndustries, ind)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{ind}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 10. Skills (Technical Skills, Soft Skills, Industry Skills) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("skills")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Skills
          </span>
          {openSections.skills ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.skills && (
          <div className="space-y-3 mt-2">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Technical Skills</p>
              <div className="flex flex-wrap gap-1">
                {allSkills.technical.slice(0, 8).map((sk) => (
                  <button
                    key={sk}
                    id={`filter-skill-${sk.toLowerCase().replace(/[^\w]/g, "")}`}
                    onClick={() => toggleItem(selectedSkills, setSelectedSkills, sk)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                      selectedSkills.includes(sk)
                        ? "bg-primary text-primary-foreground border-primary font-medium"
                        : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Soft Skills</p>
              <div className="flex flex-wrap gap-1">
                {allSkills.soft.slice(0, 6).map((sk) => (
                  <button
                    key={sk}
                    id={`filter-soft-${sk.toLowerCase().replace(/[^\w]/g, "")}`}
                    onClick={() => toggleItem(selectedSkills, setSelectedSkills, sk)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                      selectedSkills.includes(sk)
                        ? "bg-primary text-primary-foreground border-primary font-medium"
                        : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Industry Skills</p>
              <div className="flex flex-wrap gap-1">
                {allSkills.industry.slice(0, 6).map((sk) => (
                  <button
                    key={sk}
                    id={`filter-indskill-${sk.toLowerCase().replace(/[^\w]/g, "")}`}
                    onClick={() => toggleItem(selectedSkills, setSelectedSkills, sk)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                      selectedSkills.includes(sk)
                        ? "bg-primary text-primary-foreground border-primary font-medium"
                        : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 11. Department (Engineering, Sales, Marketing, Finance, Human Resources, Operations) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("department")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-500" /> Department
          </span>
          {openSections.department ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.department && (
          <div className="space-y-1.5 mt-2">
            {(["Engineering", "Sales", "Marketing", "Finance", "Human Resources", "Operations"] as DepartmentType[]).map(
              (dept) => {
                const count = initialJobs.filter((j) => j.department === dept).length;
                return (
                  <label key={dept} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                    <span className="flex items-center gap-2">
                      <input
                        id={`filter-dept-${dept.toLowerCase().replace(" ", "-")}`}
                        type="checkbox"
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => toggleItem(selectedDepartments, setSelectedDepartments, dept)}
                        className="rounded border-border text-primary focus:ring-primary/50"
                      />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{dept}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  </label>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* 12. Application Deadline (Open, Closing Soon, Closed) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("deadline")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> Application Deadline
          </span>
          {openSections.deadline ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.deadline && (
          <div className="space-y-1.5 mt-2">
            {(["Open", "Closing Soon", "Closed"] as ApplicationDeadlineStatus[]).map((dl) => {
              const count = initialJobs.filter((j) => j.deadlineStatus === dl).length;
              return (
                <label key={dl} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-dl-${dl.toLowerCase().replace(" ", "-")}`}
                      type="checkbox"
                      checked={selectedDeadlines.includes(dl)}
                      onChange={() => toggleItem(selectedDeadlines, setSelectedDeadlines, dl)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{dl}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 13. Company Size (1–10, 11–50, 51–200, 201–500, 501–1000, 1000+) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("companySize")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-violet-500" /> Company Size
          </span>
          {openSections.companySize ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.companySize && (
          <div className="space-y-1.5 mt-2">
            {(["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"] as CompanySizeType[]).map((sz) => {
              const count = initialJobs.filter((j) => j.companySize === sz).length;
              return (
                <label key={sz} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-size-${sz.replace(/[^\w]/g, "")}`}
                      type="checkbox"
                      checked={selectedCompanySizes.includes(sz)}
                      onChange={() => toggleItem(selectedCompanySizes, setSelectedCompanySizes, sz)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{sz} employees</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 14. Benefits (Health Insurance, Paid Time Off, Retirement Plan, Flexible Hours) */}
      <div className="border-b border-border/60 pb-4">
        <button
          onClick={() => toggleSection("benefits")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-500" /> Benefits & Perks
          </span>
          {openSections.benefits ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.benefits && (
          <div className="space-y-1.5 mt-2">
            {["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"].map((ben) => {
              const count = initialJobs.filter((j) => j.benefits.includes(ben)).length;
              return (
                <label key={ben} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-ben-${ben.toLowerCase().replace(/[^\w]/g, "")}`}
                      type="checkbox"
                      checked={selectedBenefits.includes(ben)}
                      onChange={() => toggleItem(selectedBenefits, setSelectedBenefits, ben)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{ben}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 15. Application Status (Not Applied, Applied, Interview, Rejected, Hired) */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection("applicationStatus")}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Application Status
          </span>
          {openSections.applicationStatus ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {openSections.applicationStatus && (
          <div className="space-y-1.5 mt-2">
            {(["Not Applied", "Applied", "Interview", "Rejected", "Hired"] as ApplicationStatus[]).map((st) => {
              const count = initialJobs.filter((j) => j.applicationStatus === st).length;
              return (
                <label key={st} className="flex items-center justify-between py-1 text-xs cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      id={`filter-status-${st.toLowerCase().replace(" ", "-")}`}
                      type="checkbox"
                      checked={selectedAppStatuses.includes(st)}
                      onChange={() => toggleItem(selectedAppStatuses, setSelectedAppStatuses, st)}
                      className="rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{st}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Search & Filter Control Bar ─────────────────────────── */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Main search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="jobs-main-search"
              type="search"
              placeholder="Search by role, skill, company, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Location quick filter */}
          <div className="relative md:w-56">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="jobs-location-search"
              type="text"
              placeholder="Location..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Mobile Filter toggle button */}
          <Button
            id="mobile-filters-trigger"
            variant="outline"
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 rounded-xl py-2.5"
          >
            <Filter className="w-4 h-4 text-primary" />
            <span>Filters ({activeFiltersCount})</span>
          </Button>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border/60">
            <span className="text-xs text-muted-foreground font-medium mr-1">Active filters:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:text-foreground">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {locationQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                Loc: {locationQuery}
                <button onClick={() => setLocationQuery("")} className="hover:text-foreground">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedJobTypes.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border capitalize">
                {t.replace("-", " ")}
                <button onClick={() => toggleItem(selectedJobTypes, setSelectedJobTypes, t)} className="hover:text-foreground">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedWorkplaceTypes.map((m) => (
              <span key={m} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border capitalize">
                {m}
                <button onClick={() => toggleItem(selectedWorkplaceTypes, setSelectedWorkplaceTypes, m)} className="hover:text-foreground">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedExperienceLevels.map((e) => (
              <span key={e} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                {e}
                <button onClick={() => toggleItem(selectedExperienceLevels, setSelectedExperienceLevels, e)} className="hover:text-foreground">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedIndustries.map((i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                {i}
                <button onClick={() => toggleItem(selectedIndustries, setSelectedIndustries, i)} className="hover:text-foreground">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              onClick={resetFilters}
              className="text-xs text-primary hover:underline font-medium ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-8 items-start">
        {/* ── Leftside Filter Sidebar (Desktop) ────────────────── */}
        <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Job filters sidebar">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-sm max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar">
            {FilterContent}
          </div>
        </aside>

        {/* ── Mobile Filter Drawer / Modal ──────────────────────── */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />
            {/* Drawer */}
            <div className="relative ml-auto w-full max-w-xs h-full bg-card border-l border-border shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                  <h3 className="font-heading font-bold text-base text-foreground">Filter Jobs</h3>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {FilterContent}
              </div>

              <div className="sticky bottom-0 pt-4 mt-6 bg-card border-t border-border">
                <Button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full bg-gradient-hero text-white font-semibold"
                >
                  Show {sortedJobs.length} Results
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Content Area: Job Page Grid ─────────────────── */}
        <main className="flex-1 min-w-0" aria-label="Active jobs listings">
          {/* Header Row: Heading "Active jobs" & Grid/List Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                {/* User Specification: Heading "Active jobs" */}
                <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Active jobs
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/25">
                  {sortedJobs.length} {sortedJobs.length === 1 ? "role" : "roles"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Verified full-time, contract, and remote positions actively hiring
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground hidden sm:inline">Sort:</span>
                <select
                  id="jobs-sort-by-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-border bg-card text-foreground text-xs font-medium outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                  <option value="deadline">Deadline: Closing Soonest</option>
                  <option value="title">Role Title: A to Z</option>
                </select>
              </div>

              {/* View Toggle: Grid / List */}
              <div className="inline-flex p-1 rounded-xl border border-border bg-card shadow-xs">
                <button
                  id="view-mode-grid-btn"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  id="view-mode-list-btn"
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Job Page Grid or List Results */}
          {sortedJobs.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sortedJobs.map((job) => (
                  <JobCard key={job.id} job={job} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedJobs.map((job) => (
                  <JobCard key={job.id} job={job} variant="default" />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border bg-card/50 p-8">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-4">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">No active jobs match your criteria</h3>
              <p className="text-muted-foreground text-sm max-w-md mb-6">
                Try broadening your filter criteria, resetting salary expectations, or clearing specific location tags.
              </p>
              <Button
                id="reset-empty-filters-btn"
                variant="outline"
                onClick={resetFilters}
                className="gap-2 rounded-xl"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset all filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
