import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import { featuredCompanies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Companies Hiring",
  description:
    "Browse verified company profiles and discover who's actively hiring. Explore teams, culture, and open roles.",
  alternates: { canonical: "https://anikaay.online/companies" },
};

export default function CompaniesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-background-subtle border-b border-border py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Companies</span>
          </nav>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground mb-2">
            Companies Hiring Now
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Discover verified employers across every industry. Explore teams, culture, and open roles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredCompanies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.slug}`}
              id={`company-list-${company.id}`}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 card-lift"
            >
              {company.verified && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
              )}

              <div className="w-12 h-12 rounded-xl bg-gradient-subtle border border-border flex items-center justify-center text-xl font-bold mb-4">
                {company.name[0]}
              </div>

              <h2 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {company.name}
              </h2>
              <p className="text-xs text-muted-foreground mb-1">{company.industry}</p>
              <p className="text-xs text-muted-foreground mb-4">{company.size} employees · {company.location}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-5">{company.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs font-semibold text-primary">
                  {company.openRoles} open roles
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
