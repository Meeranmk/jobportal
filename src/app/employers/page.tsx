import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  CheckCircle,
  BarChart2,
  Users,
  Star,
  ArrowRight,
  Shield,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Post a Job – Hire Top Talent",
  description:
    "Reach thousands of qualified candidates on Anikaay. Post your job listing, get AI-matched applicants, and hire faster.",
  alternates: { canonical: "https://anikaay.online/employers" },
};

const FEATURES = [
  {
    icon: Target,
    title: "AI-Powered Matching",
    desc: "Our AI surfaces the most relevant candidates for your role automatically.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    desc: "Track views, applies, and pipeline metrics with live dashboards.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Verified Candidates",
    desc: "Every applicant's profile is verified for authenticity and accuracy.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Invite teammates, assign reviewers, and manage hiring together.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for small teams posting occasionally.",
    features: ["1 active job post", "Basic candidate analytics", "Email applications", "30-day listing"],
    cta: "Get Started Free",
    href: "/auth/register?role=recruiter&plan=free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$99",
    period: "/ mo",
    desc: "Ideal for growing companies with ongoing hiring needs.",
    features: [
      "10 active job posts",
      "AI candidate matching",
      "Advanced analytics dashboard",
      "Applicant Tracking System",
      "Team collaboration (5 seats)",
      "60-day listing",
    ],
    cta: "Start 14-Day Trial",
    href: "/auth/register?role=recruiter&plan=growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations with complex hiring workflows.",
    features: [
      "Unlimited job posts",
      "Priority AI matching",
      "Dedicated account manager",
      "Custom ATS integrations",
      "Unlimited team seats",
      "SAML SSO & RBAC",
    ],
    cta: "Contact Sales",
    href: "mailto:enterprise@anikaay.online",
    highlight: false,
  },
];

export default function EmployersPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="employers-hero-heading">
        <div className="absolute inset-0 section-dots" />
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-brand-violet/8 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium text-primary mb-8">
            <Zap className="w-3.5 h-3.5" />
            For Recruiters & Employers
          </div>

          <h1
            id="employers-hero-heading"
            className="font-heading text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Hire the talent your
            <br />
            <span className="text-gradient">company deserves</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Post a job in minutes. AI-matched candidates. Real-time applicant tracking.
            Everything you need to build a world-class team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register?role=recruiter">
              <Button
                id="employers-cta-primary"
                size="lg"
                className="gap-2 bg-gradient-hero text-white font-bold px-8 hover:opacity-90 shadow-xl shadow-primary/25"
              >
                Post a Job Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button
                id="employers-see-pricing"
                size="lg"
                variant="outline"
                className="px-8 font-semibold"
              >
                See Pricing
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {["Nexus AI", "Vela Health", "Arc Systems", "Fold Finance"].map((co) => (
              <div key={co} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-muted border border-border flex items-center justify-center text-xs font-bold">
                  {co[0]}
                </div>
                <span className="text-sm text-muted-foreground font-medium">{co}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background-subtle" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Why Anikaay</p>
            <h2
              id="features-heading"
              className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
            >
              Everything you need to hire smarter
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="pricing-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Pricing</p>
            <h2
              id="pricing-heading"
              className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4"
            >
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(({ name, price, period, desc, features, cta, href, highlight }) => (
              <div
                key={name}
                className={`relative rounded-3xl border p-8 transition-all duration-200 ${
                  highlight
                    ? "border-primary/60 bg-primary/3 shadow-2xl shadow-primary/10 scale-[1.02]"
                    : "border-border bg-card"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-hero text-white shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="font-heading font-semibold text-muted-foreground text-sm mb-1">{name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-extrabold text-foreground">{price}</span>
                    {period && <span className="text-muted-foreground text-sm">{period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={href}>
                  <Button
                    id={`pricing-cta-${name.toLowerCase()}`}
                    size="lg"
                    className={`w-full font-bold ${
                      highlight
                        ? "bg-gradient-hero text-white hover:opacity-90 shadow-lg shadow-primary/25"
                        : ""
                    }`}
                    variant={highlight ? "default" : "outline"}
                  >
                    {cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
