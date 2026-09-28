"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Briefcase,
  Building2,
  BookOpen,
  Users,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  LogIn,
  PenSquare,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AiSearchModal } from "@/components/ai-search-modal";

gsap.registerPlugin();

const NAV_LINKS = [
  { href: "/jobs", label: "Find Jobs", icon: Briefcase },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/career-resources", label: "Career Resources", icon: BookOpen },
  { href: "/employers", label: "For Employers", icon: Users },
];

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [aiOpen, setAiOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const logoRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLDivElement>(null);
  const actionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMounted(true), []);

  // Scroll detection
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance — Y-only animation. No opacity tweens = items never invisible.
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(logoRef.current, {
        y: -24,
        duration: 0.6,
        clearProps: "transform",
      })
      const navLinks = navRef.current?.querySelectorAll("a");
      if (navLinks && navLinks.length) {
        tl.from(
          navLinks,
          { y: -16, stagger: 0.07, duration: 0.5, clearProps: "transform" },
          "-=0.3"
        );
      }

      const actionButtons = actionsRef.current?.querySelectorAll("button, a");
      if (actionButtons && actionButtons.length) {
        tl.from(
          actionButtons,
          { y: -16, stagger: 0.06, duration: 0.5, clearProps: "transform" },
          "-=0.3"
        );
      }
    },
    { scope: headerRef }
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-border/60 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div ref={logoRef} data-logo className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-lg bg-gradient-hero opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-heading font-bold text-lg tracking-tight text-gradient">
                    Anikaay
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase leading-none">
                    Jobs & Careers
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav
              ref={navRef}
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive(href)
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div ref={actionsRef} data-actions className="hidden lg:flex items-center gap-2">
              {/* Ask AI Button */}
              <Button
                id="ask-ai-btn"
                onClick={() => setAiOpen(true)}
                variant="outline"
                size="sm"
                className="gap-2 border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/60 font-medium transition-all duration-200 group"
              >
                <Sparkles className="w-3.5 h-3.5 group-hover:animate-pulse" />
                Ask AI
              </Button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  id="theme-toggle"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Sign in */}
              <Link href="/auth/sign-in">
                <Button
                  id="sign-in-btn"
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 font-medium text-muted-foreground hover:text-foreground"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign in
                </Button>
              </Link>

              {/* Post a Job */}
              <Link href="/auth/register?role=recruiter">
                <Button
                  id="post-job-btn"
                  size="sm"
                  className="gap-1.5 bg-gradient-hero text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:opacity-90 transition-all duration-200"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  Post a Job
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAiOpen(true)}
                className="text-primary p-2"
                aria-label="Ask AI"
              >
                <Sparkles className="w-4 h-4" />
              </Button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  id="mobile-menu-btn"
                  className="p-2 rounded-md text-foreground hover:bg-accent transition-colors"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0" showCloseButton={false}>
                  <MobileNav
                    links={NAV_LINKS}
                    isActive={isActive}
                    onClose={() => setMobileOpen(false)}
                    theme={resolvedTheme}
                    setTheme={setTheme}
                    mounted={mounted}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* AI Search Modal */}
      <AiSearchModal open={aiOpen} onOpenChange={setAiOpen} />
    </>
  );
}

// ── Mobile Nav ────────────────────────────────────────────────
interface MobileNavProps {
  links: typeof NAV_LINKS;
  isActive: (href: string) => boolean;
  onClose: () => void;
  theme?: string;
  setTheme: (t: string) => void;
  mounted: boolean;
}

function MobileNav({ links, isActive, onClose, theme, setTheme, mounted }: MobileNavProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-heading font-bold text-gradient">Anikaay</span>
        </Link>
        <SheetClose
          onClick={onClose}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </SheetClose>
      </div>

      {/* Links */}
      <nav className="flex-1 p-4 space-y-1" aria-label="Mobile navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              isActive(href)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        )}
        <Link href="/auth/sign-in" onClick={onClose}>
          <Button id="mobile-signin-btn" variant="outline" className="w-full gap-2">
            <LogIn className="w-4 h-4" />
            Sign in
          </Button>
        </Link>
        <Link href="/auth/register?role=recruiter" onClick={onClose}>
          <Button
            id="mobile-postjob-btn"
            className="w-full gap-2 bg-gradient-hero text-white font-semibold"
          >
            <PenSquare className="w-4 h-4" />
            Post a Job
          </Button>
        </Link>
      </div>
    </div>
  );
}
