"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CategoryCard({ category, size = "md", className }: CategoryCardProps) {
  return (
    <Link
      href={`/jobs/${category.slug}`}
      id={`category-${category.slug}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden",
        "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300",
        size === "sm" && "p-4",
        size === "md" && "p-5",
        size === "lg" && "p-7",
        className
      )}
    >
      {/* Gradient backdrop on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br",
          category.color
        )}
      />

      {/* Animated corner accent */}
      <div
        className={cn(
          "absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10",
          "transition-all duration-500 group-hover:scale-150 blur-xl bg-gradient-to-br",
          category.color
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center rounded-xl mb-3",
          "bg-gradient-to-br from-muted to-background border border-border",
          "group-hover:scale-110 transition-transform duration-300",
          size === "sm" && "w-9 h-9 text-xl",
          size === "md" && "w-11 h-11 text-2xl",
          size === "lg" && "w-14 h-14 text-3xl"
        )}
      >
        {category.icon}
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h3
          className={cn(
            "font-heading font-semibold text-foreground group-hover:text-primary transition-colors",
            size === "sm" && "text-sm",
            size === "md" && "text-sm",
            size === "lg" && "text-base"
          )}
        >
          {category.label}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {category.count.toLocaleString()} open roles
        </p>
      </div>

      {/* Arrow */}
      <div
        className={cn(
          "absolute bottom-4 right-4 opacity-0 group-hover:opacity-100",
          "transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
        )}
      >
        <ArrowRight className="w-4 h-4 text-primary" />
      </div>
    </Link>
  );
}
