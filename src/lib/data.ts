/**
 * Mock data layer – replace with real API/DB calls as backend is integrated.
 */

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  companySlug: string;
  companyLogo?: string;
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  type: "full-time" | "part-time" | "contract" | "internship";
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  category: string;
  categorySlug: string;
  tags: string[];
  postedAt: string;
  expiresAt?: string;
  featured?: boolean;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  description: string;
  openRoles: number;
  verified: boolean;
}

export interface Category {
  label: string;
  slug: string;
  icon: string;
  count: number;
  color: string;
}

// ── Categories ────────────────────────────────────────────────
export const categories: Category[] = [
  { label: "Technology", slug: "technology", icon: "💻", count: 3842, color: "from-violet-500 to-blue-500" },
  { label: "Design & UX", slug: "design", icon: "🎨", count: 1204, color: "from-pink-500 to-rose-500" },
  { label: "Marketing", slug: "marketing", icon: "📢", count: 987, color: "from-orange-500 to-amber-500" },
  { label: "Sales", slug: "sales", icon: "📈", count: 2341, color: "from-emerald-500 to-teal-500" },
  { label: "Finance", slug: "finance", icon: "💰", count: 876, color: "from-cyan-500 to-blue-500" },
  { label: "Remote Only", slug: "remote", icon: "🌍", count: 5210, color: "from-indigo-500 to-violet-500" },
  { label: "Healthcare", slug: "healthcare", icon: "🏥", count: 654, color: "from-red-500 to-rose-500" },
  { label: "Education", slug: "education", icon: "🎓", count: 432, color: "from-yellow-500 to-amber-500" },
];

// ── Companies ─────────────────────────────────────────────────
export const featuredCompanies: Company[] = [
  {
    id: "c1",
    slug: "nexus-ai",
    name: "Nexus AI",
    industry: "Artificial Intelligence",
    size: "201–500",
    location: "San Francisco, CA",
    description: "Building the next generation of enterprise AI infrastructure.",
    openRoles: 24,
    verified: true,
  },
  {
    id: "c2",
    slug: "vela-health",
    name: "Vela Health",
    industry: "HealthTech",
    size: "51–200",
    location: "New York, NY",
    description: "Reimagining healthcare access through intelligent platforms.",
    openRoles: 11,
    verified: true,
  },
  {
    id: "c3",
    slug: "arc-systems",
    name: "Arc Systems",
    industry: "Cloud Infrastructure",
    size: "501–1000",
    location: "Austin, TX",
    description: "Enterprise cloud solutions at planetary scale.",
    openRoles: 38,
    verified: true,
  },
  {
    id: "c4",
    slug: "fold-finance",
    name: "Fold Finance",
    industry: "FinTech",
    size: "11–50",
    location: "Remote",
    description: "Democratizing financial tools for the global workforce.",
    openRoles: 7,
    verified: true,
  },
];

// ── Jobs ──────────────────────────────────────────────────────
export const featuredJobs: Job[] = [
  {
    id: "j1",
    slug: "senior-frontend-engineer-nexus-ai",
    title: "Senior Frontend Engineer",
    company: "Nexus AI",
    companySlug: "nexus-ai",
    location: "San Francisco, CA",
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 160000,
    salaryMax: 220000,
    salaryCurrency: "USD",
    category: "Technology",
    categorySlug: "technology",
    tags: ["React", "TypeScript", "GraphQL", "AI"],
    postedAt: "2026-09-25T10:00:00Z",
    featured: true,
    description: "Lead the next wave of AI-augmented user interfaces at Nexus AI.",
    requirements: ["5+ years React", "TypeScript expertise", "System design skills"],
    responsibilities: ["Architect frontend systems", "Mentor junior engineers", "Ship features fast"],
  },
  {
    id: "j2",
    slug: "product-designer-vela-health",
    title: "Senior Product Designer",
    company: "Vela Health",
    companySlug: "vela-health",
    location: "Remote",
    locationType: "remote",
    type: "full-time",
    salaryMin: 130000,
    salaryMax: 175000,
    salaryCurrency: "USD",
    category: "Design & UX",
    categorySlug: "design",
    tags: ["Figma", "Design Systems", "HealthTech", "Research"],
    postedAt: "2026-09-24T08:00:00Z",
    featured: true,
    description: "Shape the future of healthcare UX at Vela Health.",
    requirements: ["4+ years product design", "Figma mastery", "HealthTech experience a plus"],
    responsibilities: ["Own end-to-end design flows", "Build and maintain design system", "Run user research"],
  },
  {
    id: "j3",
    slug: "staff-engineer-arc-systems",
    title: "Staff Software Engineer",
    company: "Arc Systems",
    companySlug: "arc-systems",
    location: "Austin, TX",
    locationType: "onsite",
    type: "full-time",
    salaryMin: 200000,
    salaryMax: 280000,
    salaryCurrency: "USD",
    category: "Technology",
    categorySlug: "technology",
    tags: ["Go", "Kubernetes", "Distributed Systems", "Rust"],
    postedAt: "2026-09-23T12:00:00Z",
    featured: true,
    description: "Build resilient cloud infrastructure trusted by Fortune 500 companies.",
    requirements: ["8+ years engineering", "Distributed systems", "Go or Rust"],
    responsibilities: ["Technical direction for core infra", "Hire and grow a team", "Define SLOs"],
  },
  {
    id: "j4",
    slug: "growth-engineer-fold-finance",
    title: "Growth Engineer",
    company: "Fold Finance",
    companySlug: "fold-finance",
    location: "Remote",
    locationType: "remote",
    type: "full-time",
    salaryMin: 110000,
    salaryMax: 150000,
    salaryCurrency: "USD",
    category: "Technology",
    categorySlug: "technology",
    tags: ["Python", "Data", "A/B Testing", "FinTech"],
    postedAt: "2026-09-22T14:00:00Z",
    featured: false,
    description: "Drive acquisition and retention through engineering-led growth experiments.",
    requirements: ["3+ years engineering", "Analytics mindset", "Python"],
    responsibilities: ["Build growth systems", "Run experiments", "Own activation metrics"],
  },
  {
    id: "j5",
    slug: "head-of-marketing-nexus-ai",
    title: "Head of Marketing",
    company: "Nexus AI",
    companySlug: "nexus-ai",
    location: "San Francisco, CA",
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 175000,
    salaryMax: 230000,
    salaryCurrency: "USD",
    category: "Marketing",
    categorySlug: "marketing",
    tags: ["B2B", "Demand Gen", "Brand", "AI"],
    postedAt: "2026-09-21T09:00:00Z",
    featured: false,
    description: "Build and lead the marketing function for one of AI's fastest-growing companies.",
    requirements: ["7+ years marketing leadership", "B2B SaaS", "Strong analytical skills"],
    responsibilities: ["Own pipeline and brand", "Build marketing team", "Define go-to-market"],
  },
  {
    id: "j6",
    slug: "senior-data-scientist-vela-health",
    title: "Senior Data Scientist",
    company: "Vela Health",
    companySlug: "vela-health",
    location: "New York, NY",
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 145000,
    salaryMax: 190000,
    salaryCurrency: "USD",
    category: "Technology",
    categorySlug: "technology",
    tags: ["Python", "ML", "Healthcare Data", "SQL"],
    postedAt: "2026-09-20T11:00:00Z",
    featured: false,
    description: "Apply ML to real-world healthcare challenges at meaningful scale.",
    requirements: ["4+ years data science", "Healthcare domain", "Python + SQL"],
    responsibilities: ["Build predictive models", "Collaborate with clinical teams", "Deploy ML systems"],
  },
];

// ── Helpers ───────────────────────────────────────────────────
export function formatSalary(min?: number, max?: number, currency = "USD"): string {
  if (!min && !max) return "Salary not listed";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
