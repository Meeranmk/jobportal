/**
 * Comprehensive Job Portal Data Layer (India Edition)
 * Configured with Indian Rupee (₹ INR) currency and top Indian tech hubs.
 */

export type WorkplaceType = "remote" | "hybrid" | "onsite";
export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";
export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior Level" | "Executive";
export type EducationLevel = "High School" | "Diploma" | "Bachelor’s" | "Master’s" | "Doctorate";
export type IndustryType = "IT" | "Finance" | "Healthcare" | "Education" | "Marketing" | "Retail";
export type DepartmentType = "Engineering" | "Sales" | "Marketing" | "Finance" | "Human Resources" | "Operations";
export type CompanySizeType = "1–10" | "11–50" | "51–200" | "201–500" | "501–1000" | "1000+";
export type ApplicationDeadlineStatus = "Open" | "Closing Soon" | "Closed";
export type ApplicationStatus = "Not Applied" | "Applied" | "Interview" | "Rejected" | "Hired";

export interface JobSkills {
  technical: string[];
  soft: string[];
  industry: string[];
}

export interface JobLocationDetails {
  city: string;
  state: string;
  country: string;
}

export interface Job {
  id: string; // Job ID e.g. "JOB-2026-9401"
  clientId: string; // Client ID e.g. "CLT-8842"
  slug: string;
  title: string; // Job Title
  company: string; // Company Name
  companySlug: string;
  companyLogo?: string;
  location: string; // City, State, Country
  locationDetails: JobLocationDetails;
  locationType: WorkplaceType; // Remote, Hybrid, On-site
  type: EmploymentType; // Full-time, Part-time, Contract, Internship
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string; // INR, USD, EUR, GBP
  salaryPeriod: "annual" | "monthly";
  monthlySalaryMin?: number;
  monthlySalaryMax?: number;
  category: string;
  categorySlug: string;
  industry: IndustryType; // IT, Finance, Healthcare, Education, Marketing, Retail
  department: DepartmentType; // Engineering, Sales, Marketing, Finance, Human Resources, Operations
  experienceLevel: ExperienceLevel; // Entry Level, Mid Level, Senior Level, Executive
  education: EducationLevel; // High School, Diploma, Bachelor’s, Master’s, Doctorate
  companySize: CompanySizeType; // 1–10, 11–50, 51–200, 201–500, 501–1000, 1000+
  benefits: string[]; // Health Insurance, Paid Time Off, Retirement Plan, Flexible Hours
  applicationStatus: ApplicationStatus; // Not Applied, Applied, Interview, Rejected, Hired
  deadlineStatus: ApplicationDeadlineStatus; // Open, Closing Soon, Closed
  postedAt: string; // ISO date string (Date Posted)
  expiresAt: string; // ISO date string (Application Deadline / Valid Through)
  featured?: boolean;
  description: string; // Job Description
  responsibilities: string[]; // Responsibilities
  requiredQualifications: string[]; // Required Qualifications
  preferredQualifications: string[]; // Preferred Qualifications
  requirements: string[]; // Alias to requiredQualifications for backwards compatibility
  skills: JobSkills; // Technical, Soft, Industry skills
  tags: string[]; // Flat list for quick badges
  applicationUrl: string; // Application URL
  contactInstructions: string; // Contact / Application Instructions
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

// ── Companies (India Hubs) ────────────────────────────────────
export const featuredCompanies: Company[] = [
  {
    id: "c1",
    slug: "nexus-ai",
    name: "Nexus AI",
    industry: "IT",
    size: "201–500",
    location: "Bengaluru, Karnataka, India",
    description: "Building the next generation of enterprise AI infrastructure in India's Silicon Valley.",
    openRoles: 24,
    verified: true,
  },
  {
    id: "c2",
    slug: "vela-health",
    name: "Vela Health",
    industry: "Healthcare",
    size: "51–200",
    location: "Mumbai, Maharashtra, India",
    description: "Reimagining healthcare access through intelligent clinical platforms across India.",
    openRoles: 11,
    verified: true,
  },
  {
    id: "c3",
    slug: "arc-systems",
    name: "Arc Systems",
    industry: "IT",
    size: "501–1000",
    location: "Hyderabad, Telangana, India",
    description: "Enterprise cloud solutions and resilient infrastructure at planetary scale.",
    openRoles: 38,
    verified: true,
  },
  {
    id: "c4",
    slug: "fold-finance",
    name: "Fold Finance",
    industry: "Finance",
    size: "11–50",
    location: "Gurugram, Haryana, India",
    description: "Democratizing UPI, digital banking, and modern fintech payments.",
    openRoles: 7,
    verified: true,
  },
  {
    id: "c5",
    slug: "horizon-retail",
    name: "Horizon Retail",
    industry: "Retail",
    size: "1000+",
    location: "Delhi NCR, Delhi, India",
    description: "Omnichannel e-commerce and retail powering millions of daily transactions.",
    openRoles: 19,
    verified: true,
  },
  {
    id: "c6",
    slug: "eduspark-labs",
    name: "EduSpark Labs",
    industry: "Education",
    size: "1–10",
    location: "Chennai, Tamil Nadu, India",
    description: "Personalized AI-powered interactive learning solutions for engineering institutes.",
    openRoles: 4,
    verified: true,
  },
];

// ── Complete Jobs Collection (Rupees ₹ & Indian Locations) ────
export const featuredJobs: Job[] = [
  {
    id: "JOB-2026-9401",
    clientId: "CLT-8842",
    slug: "senior-frontend-engineer-nexus-ai",
    title: "Senior Frontend Engineer",
    company: "Nexus AI",
    companySlug: "nexus-ai",
    location: "Bengaluru, Karnataka, India",
    locationDetails: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
    },
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 1800000,
    salaryMax: 2800000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 150000,
    monthlySalaryMax: 233333,
    category: "Technology",
    categorySlug: "technology",
    industry: "IT",
    department: "Engineering",
    experienceLevel: "Senior Level",
    education: "Bachelor’s",
    companySize: "201–500",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-10-01T10:00:00Z",
    expiresAt: "2026-11-15T23:59:59Z",
    featured: true,
    description:
      "Join Nexus AI's Bengaluru engineering center as a Senior Frontend Engineer to architect responsive, high-performance web applications interfacing with cutting-edge generative AI models. You will spearhead user-facing interfaces, partner with designers, and set the standard for front-end architecture.",
    responsibilities: [
      "Architect and build robust, accessible front-end interfaces using Next.js, React 19, and TypeScript.",
      "Collaborate directly with machine learning researchers to transform complex AI outputs into intuitive workflows.",
      "Conduct code reviews, establish testing benchmarks, and mentor junior engineers across our India engineering hub.",
      "Optimize client-side performance, reducing First Contentful Paint and interaction latencies.",
    ],
    requiredQualifications: [
      "5+ years of production experience with modern React, TypeScript, and state management.",
      "Proven track record delivering scalable component systems and web applications.",
      "Deep understanding of web performance, browser rendering lifecycles, and Web Workers.",
      "Solid foundation in Git, CI/CD workflows, and automated testing.",
    ],
    preferredQualifications: [
      "Prior experience building user interfaces for AI, LLM streaming, or data dashboards.",
      "Familiarity with Tailwind CSS, OKLCH color palettes, and GSAP animations.",
      "B.Tech/B.E. or Master's degree in Computer Science, IT, or equivalent practical experience.",
    ],
    requirements: [
      "5+ years of production experience with modern React, TypeScript, and state management.",
      "Proven track record delivering scalable component systems and web applications.",
      "Deep understanding of web performance, browser rendering lifecycles, and Web Workers.",
    ],
    skills: {
      technical: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
      soft: ["Cross-functional Leadership", "Problem Solving", "Mentorship"],
      industry: ["AI & Machine Learning", "SaaS", "Enterprise Cloud"],
    },
    tags: ["React", "TypeScript", "Next.js", "AI", "Bengaluru"],
    applicationUrl: "https://nexusai.io/careers/senior-frontend-engineer-india",
    contactInstructions: "Submit your resume and GitHub profile. For inquiries, email careers-india@nexusai.io referencing CLT-8842 / JOB-2026-9401.",
  },
  {
    id: "JOB-2026-8812",
    clientId: "CLT-7301",
    slug: "product-designer-vela-health",
    title: "Senior Product Designer",
    company: "Vela Health",
    companySlug: "vela-health",
    location: "Mumbai, Maharashtra, India",
    locationDetails: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
    },
    locationType: "remote",
    type: "full-time",
    salaryMin: 1400000,
    salaryMax: 2200000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 116667,
    monthlySalaryMax: 183333,
    category: "Design & UX",
    categorySlug: "design",
    industry: "Healthcare",
    department: "Operations",
    experienceLevel: "Senior Level",
    education: "Bachelor’s",
    companySize: "51–200",
    benefits: ["Health Insurance", "Paid Time Off", "Flexible Hours"],
    applicationStatus: "Applied",
    deadlineStatus: "Closing Soon",
    postedAt: "2026-09-28T08:00:00Z",
    expiresAt: "2026-10-10T23:59:59Z",
    featured: true,
    description:
      "Vela Health is dedicated to making healthcare accessible and transparent. As our Senior Product Designer based in India, you will craft empathetic, compliant, and delightful patient and practitioner experiences spanning web and mobile surfaces.",
    responsibilities: [
      "Own end-to-end design initiatives from initial discovery research to high-fidelity implementation.",
      "Maintain, document, and evolve the Vela Design System in Figma in sync with developer tokens.",
      "Facilitate regular user testing sessions with clinical staff and patients across tier-1 and tier-2 Indian cities.",
      "Partner with product managers and engineers to break down roadmap milestones into achievable sprints.",
    ],
    requiredQualifications: [
      "4+ years of product design experience across complex digital workflows.",
      "Mastery of Figma, interactive prototyping, and modern design token architectures.",
      "Demonstrated ability to translate complex health metrics and data visualizations into clear interfaces.",
    ],
    preferredQualifications: [
      "Direct experience working within digital healthcare, telemedicine, or regulated apps.",
      "Basic understanding of front-end capabilities (HTML/CSS) to collaborate seamlessly with engineers.",
    ],
    requirements: [
      "4+ years of product design experience across complex digital workflows.",
      "Mastery of Figma, interactive prototyping, and modern design token architectures.",
    ],
    skills: {
      technical: ["Figma", "Design Systems", "Prototyping", "Wireframing"],
      soft: ["Empathy", "User Research", "Stakeholder Presentation"],
      industry: ["Healthcare IT", "HealthTech", "Telemedicine"],
    },
    tags: ["Figma", "Design Systems", "HealthTech", "Remote India"],
    applicationUrl: "https://velahealth.com/jobs/senior-product-designer-india",
    contactInstructions: "Please include a link to your online portfolio featuring in-depth case studies. Contact talent-in@velahealth.com quoting Ref: CLT-7301.",
  },
  {
    id: "JOB-2026-7240",
    clientId: "CLT-5519",
    slug: "staff-engineer-arc-systems",
    title: "Staff Software Engineer",
    company: "Arc Systems",
    companySlug: "arc-systems",
    location: "Hyderabad, Telangana, India",
    locationDetails: {
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
    },
    locationType: "onsite",
    type: "full-time",
    salaryMin: 3200000,
    salaryMax: 4800000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 266667,
    monthlySalaryMax: 400000,
    category: "Technology",
    categorySlug: "technology",
    industry: "IT",
    department: "Engineering",
    experienceLevel: "Executive",
    education: "Master’s",
    companySize: "501–1000",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"],
    applicationStatus: "Interview",
    deadlineStatus: "Open",
    postedAt: "2026-09-29T12:00:00Z",
    expiresAt: "2026-11-30T23:59:59Z",
    featured: true,
    description:
      "Arc Systems powers mission-critical cloud infrastructure for global enterprises. We are looking for a Staff Software Engineer in our HITEC City, Hyderabad center to lead architecture decisions across distributed systems and container orchestration.",
    responsibilities: [
      "Define high-level architecture and technical strategy for multi-region cloud services.",
      "Design zero-downtime distributed storage and streaming systems handling petabytes of daily traffic.",
      "Lead cross-org engineering initiatives and establish company-wide reliability standards (SLOs/SLAs).",
      "Mentor and grow principal engineer candidates across our Indian R&D facilities.",
    ],
    requiredQualifications: [
      "8+ years of engineering experience with deep expertise in Go, Rust, or C++.",
      "Proven track record scaling distributed systems, Kubernetes clusters, and low-latency APIs.",
      "Thorough mastery of consensus protocols (Raft, Paxos), network protocols, and Linux kernel internals.",
    ],
    preferredQualifications: [
      "Recognized open source contributions in the CNCF or cloud-native ecosystem.",
      "M.Tech / M.E. or Ph.D. in Computer Science or related quantitative field.",
    ],
    requirements: [
      "8+ years of engineering experience with deep expertise in Go, Rust, or C++.",
      "Proven track record scaling distributed systems, Kubernetes clusters, and low-latency APIs.",
    ],
    skills: {
      technical: ["Go", "Kubernetes", "Distributed Systems", "Rust", "Docker", "gRPC"],
      soft: ["Technical Strategy", "Executive Communication", "Systems Thinking"],
      industry: ["Cloud Infrastructure", "DevOps", "Cybersecurity"],
    },
    tags: ["Go", "Kubernetes", "Distributed Systems", "Hyderabad"],
    applicationUrl: "https://arcsystems.com/careers/staff-engineer-hyderabad",
    contactInstructions: "Direct outreach to executive talent team at exec-recruiting@arcsystems.com with code [ARC-STAFF-7240].",
  },
  {
    id: "JOB-2026-6190",
    clientId: "CLT-3120",
    slug: "growth-engineer-fold-finance",
    title: "Growth Engineer",
    company: "Fold Finance",
    companySlug: "fold-finance",
    location: "Gurugram, Haryana, India",
    locationDetails: {
      city: "Gurugram",
      state: "Haryana",
      country: "India",
    },
    locationType: "remote",
    type: "full-time",
    salaryMin: 1200000,
    salaryMax: 1800000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 100000,
    monthlySalaryMax: 150000,
    category: "Technology",
    categorySlug: "technology",
    industry: "Finance",
    department: "Engineering",
    experienceLevel: "Mid Level",
    education: "Bachelor’s",
    companySize: "11–50",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-10-02T04:00:00Z",
    expiresAt: "2026-11-20T23:59:59Z",
    featured: false,
    description:
      "Fold Finance is looking for a data-driven Growth Engineer to optimize conversion funnels, build viral referral loops, and scale UPI-enabled modern payments.",
    responsibilities: [
      "Build, deploy, and analyze high-velocity A/B tests across web onboarding and payment checkout funnels.",
      "Integrate analytics, attribution tracking, and event pipelines with Segment and PostHog.",
      "Iterate on landing page performance, SEO structure, and dynamic personalization algorithms.",
    ],
    requiredQualifications: [
      "3+ years of full-stack software development experience.",
      "Strong proficiency with Next.js, Python, PostgreSQL, and modern analytics platforms.",
      "Deep understanding of growth metrics (CAC, LTV, conversion velocity, cohort retention).",
    ],
    preferredQualifications: [
      "Background in Indian FinTech, UPI payments, or payment gateways (Razorpay, Cashfree).",
      "Knowledge of SEO automation and programmatic landing page generation.",
    ],
    requirements: [
      "3+ years of full-stack software development experience.",
      "Strong proficiency with Next.js, Python, PostgreSQL, and modern analytics platforms.",
    ],
    skills: {
      technical: ["Next.js", "Python", "SQL", "PostHog", "A/B Testing"],
      soft: ["Analytical Mindset", "Experimentation Speed", "Curiosity"],
      industry: ["FinTech", "UPI Payments", "Growth Marketing"],
    },
    tags: ["Python", "Data", "A/B Testing", "Gurugram"],
    applicationUrl: "https://foldfinance.io/jobs/growth-engineer",
    contactInstructions: "Apply online or email your resume and recent experiment wins to jobs@foldfinance.io with Job ID JOB-2026-6190.",
  },
  {
    id: "JOB-2026-5501",
    clientId: "CLT-8842",
    slug: "head-of-marketing-nexus-ai",
    title: "Head of Marketing",
    company: "Nexus AI",
    companySlug: "nexus-ai",
    location: "Bengaluru, Karnataka, India",
    locationDetails: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
    },
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 2500000,
    salaryMax: 3800000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 208333,
    monthlySalaryMax: 316667,
    category: "Marketing",
    categorySlug: "marketing",
    industry: "Marketing",
    department: "Marketing",
    experienceLevel: "Executive",
    education: "Master’s",
    companySize: "201–500",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-09-30T09:00:00Z",
    expiresAt: "2026-12-01T23:59:59Z",
    featured: false,
    description:
      "Nexus AI is searching for an ambitious Head of Marketing to drive brand awareness, product marketing, demand generation, and developer relations for our enterprise AI portfolio across India and global markets.",
    responsibilities: [
      "Architect and scale multi-channel inbound and outbound acquisition funnels.",
      "Lead product marketing launches, positioning statements, and competitor analysis.",
      "Hire and manage a high-performing marketing team in Bengaluru.",
      "Collaborate with executive leadership to establish quarterly pipeline targets.",
    ],
    requiredQualifications: [
      "7+ years of marketing leadership experience in high-growth B2B SaaS or AI companies.",
      "Demonstrated success scaling marketing operations and lead generation.",
      "Deep understanding of tech storytelling, performance channels, and developer events.",
    ],
    preferredQualifications: [
      "MBA from a top-tier Indian or international business school (IIM, ISB, etc.).",
      "Established network in Indian tech media and developer conferences.",
    ],
    requirements: [
      "7+ years of marketing leadership experience in high-growth B2B SaaS or AI companies.",
      "Demonstrated success scaling marketing operations and lead generation.",
    ],
    skills: {
      technical: ["Demand Generation", "HubSpot", "Google Analytics", "SEO Strategy"],
      soft: ["Leadership", "Storytelling", "Budget Allocation", "Public Speaking"],
      industry: ["B2B SaaS", "Enterprise Software", "Artificial Intelligence"],
    },
    tags: ["B2B", "Demand Gen", "Brand", "Bengaluru"],
    applicationUrl: "https://nexusai.io/careers/head-of-marketing-india",
    contactInstructions: "Submit your executive bio, LinkedIn profile, and key metrics portfolio to exec-in@nexusai.io.",
  },
  {
    id: "JOB-2026-4432",
    clientId: "CLT-7301",
    slug: "senior-data-scientist-vela-health",
    title: "Senior Data Scientist",
    company: "Vela Health",
    companySlug: "vela-health",
    location: "Pune, Maharashtra, India",
    locationDetails: {
      city: "Pune",
      state: "Maharashtra",
      country: "India",
    },
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 2000000,
    salaryMax: 3000000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 166667,
    monthlySalaryMax: 250000,
    category: "Technology",
    categorySlug: "technology",
    industry: "Healthcare",
    department: "Engineering",
    experienceLevel: "Senior Level",
    education: "Doctorate",
    companySize: "51–200",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-09-27T11:00:00Z",
    expiresAt: "2026-11-10T23:59:59Z",
    featured: false,
    description:
      "Apply machine learning and statistical modeling to real-world healthcare datasets in our Pune innovation lab. You will build predictive models that assist doctors in identifying early clinical indicators.",
    responsibilities: [
      "Train, validate, and deploy clinical risk assessment models using Python, PyTorch, and scikit-learn.",
      "Ensure fairness, algorithmic bias mitigation, and strict health data compliance.",
      "Publish findings in peer-reviewed clinical research and collaborate with medical boards.",
    ],
    requiredQualifications: [
      "4+ years of professional data science experience, ideally in healthcare or life sciences.",
      "Ph.D. or Master's degree in Statistics, Data Science, or Computer Science.",
      "Advanced mastery of Python, SQL, predictive modeling, and model explainability.",
    ],
    preferredQualifications: [
      "Experience with Electronic Health Record (EHR) systems.",
      "Familiarity with AWS SageMaker and MLflow production deployment pipelines.",
    ],
    requirements: [
      "4+ years of professional data science experience, ideally in healthcare or life sciences.",
      "Ph.D. or Master's degree in Statistics, Data Science, or Computer Science.",
    ],
    skills: {
      technical: ["Python", "PyTorch", "SQL", "Scikit-Learn", "AWS SageMaker"],
      soft: ["Critical Thinking", "Research Communication", "Ethical Mindset"],
      industry: ["Bioinformatics", "Healthcare Analytics", "Clinical Trials"],
    },
    tags: ["Python", "ML", "Healthcare Data", "Pune"],
    applicationUrl: "https://velahealth.com/jobs/senior-data-scientist-pune",
    contactInstructions: "Email research-careers@velahealth.com with subject [JOB-2026-4432 Data Science Application].",
  },
  {
    id: "JOB-2026-3390",
    clientId: "CLT-2910",
    slug: "retail-operations-manager-horizon-retail",
    title: "Retail Operations Manager",
    company: "Horizon Retail",
    companySlug: "horizon-retail",
    location: "Delhi NCR, Delhi, India",
    locationDetails: {
      city: "Delhi NCR",
      state: "Delhi",
      country: "India",
    },
    locationType: "onsite",
    type: "full-time",
    salaryMin: 1000000,
    salaryMax: 1500000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 83333,
    monthlySalaryMax: 125000,
    category: "Sales",
    categorySlug: "sales",
    industry: "Retail",
    department: "Operations",
    experienceLevel: "Mid Level",
    education: "Bachelor’s",
    companySize: "1000+",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-10-01T15:30:00Z",
    expiresAt: "2026-11-25T23:59:59Z",
    featured: false,
    description:
      "Horizon Retail is seeking an experienced Retail Operations Manager to oversee nationwide supply logistics, fulfillment centers, and storefront inventory across northern India.",
    responsibilities: [
      "Manage daily supply chain logistics and fulfillment operations across 40+ regional stores.",
      "Lead team of store inventory supervisors and implement Lean inventory management systems.",
      "Analyze shrinkage data, labor cost ratios, and customer throughput to maximize margin.",
    ],
    requiredQualifications: [
      "4+ years in retail operations, logistics, or multi-unit store management in India.",
      "Strong experience with enterprise ERP (SAP, Oracle Retail) and supply chain software.",
      "Demonstrated ability to lead frontline teams and improve customer satisfaction index.",
    ],
    preferredQualifications: [
      "Bachelor's degree in Business Administration, Supply Chain, or equivalent.",
      "Lean Six Sigma Green Belt or similar process optimization certification.",
    ],
    requirements: [
      "4+ years in retail operations, logistics, or multi-unit store management in India.",
      "Strong experience with enterprise ERP (SAP, Oracle Retail) and supply chain software.",
    ],
    skills: {
      technical: ["ERP Systems", "Inventory Management", "Supply Chain", "Tableau"],
      soft: ["Team Leadership", "Crisis Management", "Vendor Negotiation"],
      industry: ["Retail Logistics", "E-Commerce Fulfillment", "Omnichannel"],
    },
    tags: ["Retail", "Operations", "Logistics", "Delhi NCR"],
    applicationUrl: "https://horizonretail.com/careers/ops-mgr-delhi",
    contactInstructions: "Submit resume and references through the Horizon Careers portal or send to ops-talent@horizonretail.com.",
  },
  {
    id: "JOB-2026-2210",
    clientId: "CLT-1405",
    slug: "curriculum-developer-eduspark",
    title: "Interactive Curriculum Developer",
    company: "EduSpark Labs",
    companySlug: "eduspark-labs",
    location: "Chennai, Tamil Nadu, India",
    locationDetails: {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
    },
    locationType: "remote",
    type: "contract",
    salaryMin: 650000,
    salaryMax: 950000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 54166,
    monthlySalaryMax: 79166,
    category: "Education",
    categorySlug: "education",
    industry: "Education",
    department: "Operations",
    experienceLevel: "Entry Level",
    education: "Diploma",
    companySize: "1–10",
    benefits: ["Flexible Hours", "Paid Time Off"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-10-02T08:00:00Z",
    expiresAt: "2026-12-15T23:59:59Z",
    featured: false,
    description:
      "EduSpark Labs is reinventing STEM education for modern students in India. We are hiring a Curriculum Developer to create gamified, interactive computer science and mathematics modules for high schools and engineering colleges.",
    responsibilities: [
      "Author engaging STEM lesson plans, coding challenges, and auto-graded assessments.",
      "Work closely with our engineering team to design interactive simulations in the browser.",
      "Incorporate CBSE/ICSE and university standards into modular units.",
    ],
    requiredQualifications: [
      "1–2 years experience in STEM curriculum creation, tutoring, or instructional design.",
      "Proficiency in basic coding concepts (Python or JavaScript) and educational pedagogy.",
      "Diploma or degree in Education, Math, Computer Science, or related field.",
    ],
    preferredQualifications: [
      "Experience teaching in secondary schools or colleges.",
      "Familiarity with LMS platforms (Canvas, Moodle, Google Classroom).",
    ],
    requirements: [
      "1–2 years experience in STEM curriculum creation, tutoring, or instructional design.",
      "Proficiency in basic coding concepts (Python or JavaScript) and educational pedagogy.",
    ],
    skills: {
      technical: ["Curriculum Design", "Python Basics", "LMS Platforms", "Markdown"],
      soft: ["Pedagogical Empathy", "Creative Writing", "Clear Explanation"],
      industry: ["EdTech", "K-12 Education", "Instructional Design"],
    },
    tags: ["Education", "Curriculum", "STEM", "Chennai"],
    applicationUrl: "https://edusparklabs.com/join/curriculum-dev",
    contactInstructions: "Please submit a sample lesson plan or module you have created along with your resume to contact@edusparklabs.com.",
  },
  {
    id: "JOB-2026-1945",
    clientId: "CLT-3120",
    slug: "financial-analyst-fold-finance",
    title: "Senior Financial Analyst",
    company: "Fold Finance",
    companySlug: "fold-finance",
    location: "Mumbai, Maharashtra, India",
    locationDetails: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
    },
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 1400000,
    salaryMax: 2000000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 116667,
    monthlySalaryMax: 166667,
    category: "Finance",
    categorySlug: "finance",
    industry: "Finance",
    department: "Finance",
    experienceLevel: "Senior Level",
    education: "Bachelor’s",
    companySize: "11–50",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-09-26T14:00:00Z",
    expiresAt: "2026-11-05T23:59:59Z",
    featured: false,
    description:
      "Fold Finance is looking for an experienced Senior Financial Analyst at our BKC, Mumbai office to model unit economics, forecast cash flows, support capital raises, and oversee treasury allocations.",
    responsibilities: [
      "Build financial models, FP&A variance reports, and 5-year budget projections.",
      "Collaborate with the CFO and leadership team to evaluate new product monetization strategies.",
      "Prepare investor presentations, board decks, and audit-ready reconciliations under Indian accounting standards.",
    ],
    requiredQualifications: [
      "4+ years in financial planning & analysis (FP&A), investment banking, or fintech.",
      "Advanced financial modeling in Excel and SQL data extraction skills.",
      "Bachelor's degree or CA / CFA charterholder.",
    ],
    preferredQualifications: [
      "Chartered Accountant (CA) or CFA candidate.",
      "Experience with SaaS metrics and Indian payment ecosystem.",
    ],
    requirements: [
      "4+ years in financial planning & analysis (FP&A), investment banking, or fintech.",
      "Advanced financial modeling in Excel and SQL data extraction skills.",
    ],
    skills: {
      technical: ["Financial Modeling", "Excel", "SQL", "PowerBI", "FP&A"],
      soft: ["Attention to Detail", "Executive Reporting", "Strategic Planning"],
      industry: ["FinTech", "Treasury Management", "Venture Capital"],
    },
    tags: ["Finance", "FP&A", "FinTech", "Mumbai"],
    applicationUrl: "https://foldfinance.io/jobs/senior-financial-analyst",
    contactInstructions: "Send your CV and a brief summary of a financial model you've built to finance-careers@foldfinance.io.",
  },
  {
    id: "JOB-2026-1188",
    clientId: "CLT-9921",
    slug: "hr-talent-partner-arc-systems",
    title: "HR & Talent Acquisition Partner",
    company: "Arc Systems",
    companySlug: "arc-systems",
    location: "Hyderabad, Telangana, India",
    locationDetails: {
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
    },
    locationType: "hybrid",
    type: "full-time",
    salaryMin: 800000,
    salaryMax: 1300000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 66667,
    monthlySalaryMax: 108333,
    category: "Technology",
    categorySlug: "technology",
    industry: "IT",
    department: "Human Resources",
    experienceLevel: "Mid Level",
    education: "Bachelor’s",
    companySize: "501–1000",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-09-25T11:00:00Z",
    expiresAt: "2026-11-18T23:59:59Z",
    featured: false,
    description:
      "Join Arc Systems Hyderabad as an HR & Talent Acquisition Partner to lead technical hiring for engineers, manage onboarding, conduct performance cycles, and drive employee engagement.",
    responsibilities: [
      "Full lifecycle recruiting for software engineers, cloud architects, and product managers in India.",
      "Facilitate employee onboarding, HR compliance, and career development pathways.",
      "Partner with engineering leaders to plan workforce headcount and compensation benchmarks in INR.",
    ],
    requiredQualifications: [
      "3+ years experience in corporate HR or technical recruiting for Indian tech enterprises.",
      "Familiarity with ATS tools (Greenhouse, Lever, Naukri, LinkedIn Recruiter).",
      "Knowledge of Indian labor laws, benefits administration, and DEI practices.",
    ],
    preferredQualifications: [
      "MBA in Human Resources from a recognized institute.",
      "Experience scaling engineering teams through rapid growth.",
    ],
    requirements: [
      "3+ years experience in corporate HR or technical recruiting for Indian tech enterprises.",
      "Familiarity with ATS tools (Greenhouse, Lever, Naukri, LinkedIn Recruiter).",
    ],
    skills: {
      technical: ["Greenhouse", "Naukri", "LinkedIn Recruiter", "HR Compliance"],
      soft: ["Active Listening", "Negotiation", "Interpersonal Communication"],
      industry: ["Tech Recruiting", "People Operations", "Talent Management"],
    },
    tags: ["Human Resources", "Recruiting", "Talent", "Hyderabad"],
    applicationUrl: "https://arcsystems.com/careers/hr-talent-partner-india",
    contactInstructions: "Submit your resume through the Arc Systems portal or reach out to people-india@arcsystems.com.",
  },
  {
    id: "JOB-2026-0850",
    clientId: "CLT-6012",
    slug: "sales-account-executive-nexus-ai",
    title: "Enterprise Sales Account Executive",
    company: "Nexus AI",
    companySlug: "nexus-ai",
    location: "Bengaluru, Karnataka, India",
    locationDetails: {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
    },
    locationType: "remote",
    type: "full-time",
    salaryMin: 1800000,
    salaryMax: 2800000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 150000,
    monthlySalaryMax: 233333,
    category: "Sales",
    categorySlug: "sales",
    industry: "IT",
    department: "Sales",
    experienceLevel: "Senior Level",
    education: "Bachelor’s",
    companySize: "201–500",
    benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Flexible Hours"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-10-01T07:00:00Z",
    expiresAt: "2026-11-28T23:59:59Z",
    featured: false,
    description:
      "Nexus AI is hiring an Enterprise Account Executive to close strategic contracts with enterprises across India and APAC adopting generative AI workflows and developer toolkits.",
    responsibilities: [
      "Manage an enterprise pipeline from qualified discovery to multi-year contract closure.",
      "Deliver tailored technical pitches to CTOs, Chief Data Officers, and VP of Engineering.",
      "Consistently exceed quarterly quotas in new annual contract value (ACV).",
    ],
    requiredQualifications: [
      "5+ years of B2B enterprise software sales experience in India/APAC markets.",
      "Proven track record of quota overachievement (120%+).",
      "Comfort with technical software sales and enterprise procurement cycles.",
    ],
    preferredQualifications: [
      "Experience selling enterprise AI, cloud developer platforms, or SaaS.",
      "Familiarity with Salesforce, MEDDPICC methodology, and Outreach.",
    ],
    requirements: [
      "5+ years of B2B enterprise software sales experience in India/APAC markets.",
      "Proven track record of quota overachievement (120%+).",
    ],
    skills: {
      technical: ["Salesforce", "MEDDPICC", "Pipeline Management", "Contract Negotiation"],
      soft: ["Persuasion", "Strategic Thinking", "Relationship Building"],
      industry: ["Enterprise Software", "AI Solutions", "B2B SaaS Sales"],
    },
    tags: ["Sales", "Enterprise", "B2B", "Bengaluru"],
    applicationUrl: "https://nexusai.io/careers/enterprise-sales-ae",
    contactInstructions: "Apply with your resume and a summary of your quota attainment to sales-careers@nexusai.io.",
  },
  {
    id: "JOB-2026-0422",
    clientId: "CLT-1405",
    slug: "frontend-engineering-intern-eduspark",
    title: "Frontend Engineering Intern",
    company: "EduSpark Labs",
    companySlug: "eduspark-labs",
    location: "Kolkata, West Bengal, India",
    locationDetails: {
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
    },
    locationType: "remote",
    type: "internship",
    salaryMin: 300000,
    salaryMax: 480000,
    salaryCurrency: "INR",
    salaryPeriod: "annual",
    monthlySalaryMin: 25000,
    monthlySalaryMax: 40000,
    category: "Technology",
    categorySlug: "technology",
    industry: "Education",
    department: "Engineering",
    experienceLevel: "Entry Level",
    education: "High School",
    companySize: "1–10",
    benefits: ["Flexible Hours", "Paid Time Off"],
    applicationStatus: "Not Applied",
    deadlineStatus: "Open",
    postedAt: "2026-10-02T11:00:00Z",
    expiresAt: "2026-12-05T23:59:59Z",
    featured: false,
    description:
      "Kickstart your engineering career with EduSpark Labs! As a Frontend Intern, you will work alongside experienced developers building dynamic learning tools for Indian students.",
    responsibilities: [
      "Build interactive educational widgets using React, Tailwind CSS, and HTML5 canvas.",
      "Write unit tests and ensure mobile responsiveness across devices and low-bandwidth connections.",
      "Participate in daily standups, code reviews, and pair programming sessions.",
    ],
    requiredQualifications: [
      "Current student or recent graduate of B.Tech/BCA/diploma or self-taught developer in India.",
      "Solid understanding of JavaScript, HTML, and CSS fundamentals.",
      "Eagerness to learn modern frameworks like React and Next.js.",
    ],
    preferredQualifications: [
      "Personal GitHub projects or web apps you have built.",
      "Passion for education and learning technology.",
    ],
    requirements: [
      "Current student or recent graduate of B.Tech/BCA/diploma or self-taught developer in India.",
      "Solid understanding of JavaScript, HTML, and CSS fundamentals.",
    ],
    skills: {
      technical: ["JavaScript", "HTML5", "CSS3", "React Basics", "Git"],
      soft: ["Eagerness to Learn", "Collaboration", "Punctuality"],
      industry: ["EdTech", "Web Development", "Frontend"],
    },
    tags: ["Internship", "React", "Frontend", "Kolkata"],
    applicationUrl: "https://edusparklabs.com/join/intern-frontend",
    contactInstructions: "Submit your GitHub profile link and resume to intern-talent@edusparklabs.com referencing CLT-1405.",
  },
];

// ── Helpers (Indian Rupee ₹ & Formatters) ──────────────────────
export function formatSalary(min?: number, max?: number, currency = "INR"): string {
  if (!min && !max) return "Salary not disclosed";
  const locale = currency === "INR" ? "en-IN" : "en-US";
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export function formatSalaryWithPeriod(
  min?: number,
  max?: number,
  currency = "INR",
  period: "annual" | "monthly" = "annual"
): string {
  if (!min && !max) return "Salary not disclosed";
  const periodLabel = period === "monthly" ? "/ month" : "/ year";
  return `${formatSalary(min, max, currency)} ${periodLabel}`;
}

export function formatMonthlySalary(
  annualMin?: number,
  annualMax?: number,
  currency = "INR"
): string {
  if (!annualMin && !annualMax) return "Not specified";
  const mMin = annualMin ? Math.round(annualMin / 12) : undefined;
  const mMax = annualMax ? Math.round(annualMax / 12) : undefined;
  return `${formatSalary(mMin, mMax, currency)} / month`;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDatePosted(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDeadline(dateStr: string): { label: string; isClosingSoon: boolean; isExpired: boolean } {
  const deadline = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: `Expired on ${deadline.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`, isClosingSoon: false, isExpired: true };
  }
  if (diffDays === 0) {
    return { label: "Closes today", isClosingSoon: true, isExpired: false };
  }
  if (diffDays <= 7) {
    return { label: `Closing soon (${diffDays}d left)`, isClosingSoon: true, isExpired: false };
  }
  return {
    label: `Valid through ${deadline.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}`,
    isClosingSoon: false,
    isExpired: false,
  };
}
