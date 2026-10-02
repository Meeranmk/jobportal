/**
 * Footer Pages & Container Information Registry
 * Contains all 10 specifications:
 * Page Name, Container Name, Container Description, and detailed content.
 */

export interface FooterInfoPage {
  slug: string;
  pageName: string;
  containerName: string;
  containerDescription: string;
  icon: string;
  sections: { title: string; content: string[] }[];
}

export const FOOTER_PAGES: Record<string, FooterInfoPage> = {
  about: {
    slug: "about",
    pageName: "About Us",
    containerName: "Company Information",
    containerDescription: "Introduces the company, mission, vision, and values.",
    icon: "Building2",
    sections: [
      {
        title: "Our Mission",
        content: [
          "Anikaay is India's next-generation career discovery platform, built to bridge the gap between ambitious professionals and visionary employers across India's fastest-growing tech and business hubs.",
          "We empower job seekers with transparent INR salary benchmarks, verified recruiters, and AI-driven match scoring.",
        ],
      },
      {
        title: "Our Vision",
        content: [
          "To become India's most trusted and empowering job ecosystem, democratizing opportunity across Tier 1, Tier 2, and Tier 3 cities.",
          "Fostering career mobility and building long-term talent infrastructure for the world's largest workforce.",
        ],
      },
      {
        title: "Core Values",
        content: [
          "Transparency First: Disclosing real compensation, work modes, and job expectations without hidden catches.",
          "Candidate Centricity: Prioritizing fair hiring, zero recruitment fees for seekers, and prompt feedback.",
          "Innovation & Trust: Protecting data privacy and eradicating fraudulent listings through automated verification.",
        ],
      },
    ],
  },
  sitemap: {
    slug: "sitemap",
    pageName: "Sitemap",
    containerName: "Site Navigation",
    containerDescription: "Provides a complete overview of website pages and sections.",
    icon: "Map",
    sections: [
      {
        title: "Main Exploration",
        content: [
          "Home Page (/) - Search, featured roles, latest listings, top companies.",
          "Browse Active Jobs (/jobs) - Comprehensive grid view with 15 leftside filters.",
          "Top Companies (/companies) - Directory of verified tech and enterprise employers.",
          "Career Resources (/career-resources) - Resume guides, interview prep, and salary guides.",
          "Employer Portal (/employers) - Post jobs, recruiter pricing, and enterprise solutions.",
        ],
      },
      {
        title: "Specialized Job Categories",
        content: [
          "IT & Software Jobs (/jobs?industry=IT)",
          "Sales & Business Development (/jobs?industry=Sales)",
          "Accounting & Finance (/jobs?industry=Finance)",
          "Digital Marketing Jobs (/jobs?industry=Marketing)",
          "HR & People Operations (/jobs?department=Human+Resources)",
          "Data Science & AI (/jobs?q=Data+Scientist)",
        ],
      },
      {
        title: "Candidate & Legal Hub",
        content: [
          "Candidate Sign In (/auth/sign-in)",
          "Recruiter Registration (/auth/register?role=recruiter)",
          "Grievance Redressal (/grievances)",
          "Report Technical or Listing Issues (/report-issue)",
          "Privacy Policy & Terms of Service (/privacy-policy, /terms-conditions)",
        ],
      },
    ],
  },
  "help-center": {
    slug: "help-center",
    pageName: "Help center",
    containerName: "Support Center",
    containerDescription: "Offers answers, FAQs, and guidance for common user questions.",
    icon: "HelpCircle",
    sections: [
      {
        title: "Frequently Asked Questions",
        content: [
          "Q: Is Anikaay completely free for job seekers?\nA: Yes! Searching, filtering, creating a profile, and applying for jobs is 100% free forever for candidates.",
          "Q: How do I verify a job listing's authenticity?\nA: Every job on Anikaay comes with a unique Job ID and verified employer checkmark. Anikaay never charges fees for interviews.",
          "Q: How can I change my application status?\nA: Visit any Single Job Page or your candidate dashboard to toggle between 'Not Applied', 'Applied', 'Interview', 'Rejected', or 'Hired'.",
        ],
      },
      {
        title: "Contact Support",
        content: [
          "Need further help? Reach our dedicated support team 24/7 at support@anikaay.online or call our helpline +91 (80) 4123-9876.",
        ],
      },
    ],
  },
  "summons-notices": {
    slug: "summons-notices",
    pageName: "Summons/Notices",
    containerName: "Legal Notices",
    containerDescription: "Displays official summons, notices, announcements, and legal communications.",
    icon: "Bell",
    sections: [
      {
        title: "Legal & Regulatory Communications",
        content: [
          "In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules and applicable Indian laws, all official legal notices, governmental directives, and judicial summons must be served to our designated Legal Counsel.",
          "Electronic Service: legal-notices@anikaay.online",
          "Physical Service: Legal Counsel, Anikaay Technologies India Pvt. Ltd., Level 8, Prestige Tech Park, Marathahalli-Sarjapur Outer Ring Road, Bengaluru, Karnataka 560103, India.",
        ],
      },
      {
        title: "Statutory Announcements",
        content: [
          "All intermediary disclosures and platform compliance audits are reviewed quarterly by our compliance committee.",
        ],
      },
    ],
  },
  grievances: {
    slug: "grievances",
    pageName: "Grievances",
    containerName: "Grievance Support",
    containerDescription: "Allows users to submit and track complaints or grievances.",
    icon: "FileWarning",
    sections: [
      {
        title: "Grievance Redressal Mechanism",
        content: [
          "Anikaay is committed to prompt resolution of any complaints regarding user data, employer misconduct, or recruiter impersonation.",
          "Under Rule 3(2) of the IT Intermediary Rules, our Grievance Officer acknowledges all complaints within 24 hours and resolves them within 15 days.",
        ],
      },
      {
        title: "Grievance Officer Details",
        content: [
          "Name: Rajeshwari Sundaram",
          "Designation: Chief Grievance & Compliance Officer",
          "Email: grievance-officer@anikaay.online",
          "Address: Anikaay Technologies India Pvt. Ltd., Bengaluru, Karnataka 560103.",
        ],
      },
    ],
  },
  "report-issue": {
    slug: "report-issue",
    pageName: "Report issue",
    containerName: "Issue Reporting",
    containerDescription: "Helps users report technical problems, inappropriate content, or platform issues.",
    icon: "Bug",
    sections: [
      {
        title: "What would you like to report?",
        content: [
          "1. Inappropriate or misleading job descriptions.",
          "2. Suspicious recruiter requesting money or sensitive personal information.",
          "3. Technical bugs, broken links, or visual glitches on the portal.",
        ],
      },
      {
        title: "How to File a Report",
        content: [
          "Send details including the Job ID, screenshot, and company name to report@anikaay.online. Our trust and security team investigates all reports within 4 hours.",
        ],
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    pageName: "Privacy policy",
    containerName: "Privacy Information",
    containerDescription: "Explains how personal data is collected, used, stored, and protected.",
    icon: "Shield",
    sections: [
      {
        title: "Information We Collect",
        content: [
          "Personal Identifiers: Name, email address, phone number, and location provided during registration.",
          "Professional Credentials: Work history, education degrees, uploaded resumes, and portfolio links.",
          "Platform Usage: Search preferences, applied job bookmarks, and device analytics.",
        ],
      },
      {
        title: "Data Protection & Security",
        content: [
          "We comply strictly with India's Digital Personal Data Protection (DPDP) Act and global privacy best practices.",
          "Your data is stored in ISO-certified data centers with AES-256 encryption at rest and TLS 1.3 in transit.",
          "We never sell your resume or personal contact details to third-party telemarketers.",
        ],
      },
    ],
  },
  "terms-conditions": {
    slug: "terms-conditions",
    pageName: "Terms & conditions",
    containerName: "Terms of Service",
    containerDescription: "Defines the rules, responsibilities, and conditions for using the platform.",
    icon: "FileText",
    sections: [
      {
        title: "Acceptance of Terms",
        content: [
          "By accessing or using Anikaay, you agree to abide by these Terms of Service and all applicable Indian laws and regulations.",
          "Employers warrant that all posted job descriptions represent genuine, paid employment opportunities with accurate compensation terms.",
        ],
      },
      {
        title: "Prohibited Conduct",
        content: [
          "Posting fraudulent vacancies, asking candidates for security deposits or processing fees.",
          "Scraping, unauthorized automated indexing, or reverse-engineering platform algorithms.",
        ],
      },
    ],
  },
  "fraud-alert": {
    slug: "fraud-alert",
    pageName: "Fraud alert",
    containerName: "Fraud Prevention",
    containerDescription: "Provides warnings and guidance to help users identify and report fraud.",
    icon: "AlertTriangle",
    sections: [
      {
        title: "Critical Job Scam Warnings",
        content: [
          "⚠️ NO GENUINE EMPLOYER CHARGES MONEY: Anikaay and verified employers will NEVER ask candidates to pay for interview appointments, aptitude tests, security deposits, or laptop kits.",
          "⚠️ VERIFY EMAIL DOMAINS: Legitimate recruiters use official corporate email domains (e.g., name@nexusai.io) rather than generic free webmail (gmail/yahoo/outlook).",
          "⚠️ BEWARE OF UNREALISTIC TELEGRAM/WHATSAPP OFFERS: Unsolicited messages promising high daily wages for YouTube liking or crypto tasks are scams.",
        ],
      },
      {
        title: "Report Fraud Immediately",
        content: [
          "If an employer asks for payment or seems suspicious, report them immediately with the Job ID to fraud-prevention@anikaay.online or call National Cyber Crime helpline 1930.",
        ],
      },
    ],
  },
  "trust-safety": {
    slug: "trust-safety",
    pageName: "Trust & safety",
    containerName: "Safety Center",
    containerDescription: "Shares trust, safety, security, and responsible-use information.",
    icon: "ShieldCheck",
    sections: [
      {
        title: "Our Safety Commitment",
        content: [
          "Employer Verification: Every company account must complete GSTIN/PAN verification before publishing job listings.",
          "Automated Content Screening: AI algorithms scan every posting for deceptive claims, discriminatory language, or suspicious links.",
          "Candidate Privacy Controls: You control who can view your resume and contact information.",
        ],
      },
      {
        title: "Safe Job Hunting Tips",
        content: [
          "Never share bank credentials, OTPs, or passwords with anyone claiming to represent a recruiter.",
          "Conduct interviews through official company video platforms or at verified office locations.",
        ],
      },
    ],
  },
};
