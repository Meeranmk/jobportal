"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, X, ArrowRight, Loader2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterChip {
  type: "role" | "skill" | "location" | "experience" | "workMode" | "salary";
  label: string;
  value: string;
}

const EXAMPLE_PROMPTS = [
  "Senior React engineer, remote, 150k+",
  "Entry-level data analyst in New York",
  "Product designer at a startup, 3–5 years exp",
  "DevOps engineer with Kubernetes, contract",
  "Marketing manager in healthcare, hybrid",
];

const CHIP_COLORS: Record<FilterChip["type"], string> = {
  role: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  skill: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  location: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  experience: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  workMode: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  salary: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

interface AiSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AiSearchModal({ open, onOpenChange }: AiSearchModalProps) {
  const router = useRouter();
  const [prompt, setPrompt] = React.useState("");
  const [chips, setChips] = React.useState<FilterChip[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [feedbackGiven, setFeedbackGiven] = React.useState<"up" | "down" | null>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // Focus textarea when modal opens
  React.useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
    // Reset on close
    setPrompt("");
    setChips([]);
    setFeedbackGiven(null);
  }, [open]);

  // Mock AI parser — replace with real LLM call
  function parsePrompt(text: string): FilterChip[] {
    const lower = text.toLowerCase();
    const chips: FilterChip[] = [];

    // Role detection
    const roleMatches = [
      "engineer", "designer", "manager", "analyst", "developer",
      "scientist", "marketer", "director", "lead",
    ];
    for (const r of roleMatches) {
      if (lower.includes(r)) {
        const words = text.split(/\s+/);
        const idx = words.findIndex((w) => w.toLowerCase().includes(r));
        const role = words.slice(Math.max(0, idx - 2), idx + 1).join(" ");
        chips.push({ type: "role", label: "Role", value: role });
        break;
      }
    }

    // Work mode
    if (lower.includes("remote")) chips.push({ type: "workMode", label: "Work Mode", value: "Remote" });
    else if (lower.includes("hybrid")) chips.push({ type: "workMode", label: "Work Mode", value: "Hybrid" });
    else if (lower.includes("on-site") || lower.includes("onsite")) chips.push({ type: "workMode", label: "Work Mode", value: "On-site" });

    // Experience
    const expMatch = lower.match(/(\d[\d–\-]+)\s*(years?|yrs?)/);
    if (expMatch) chips.push({ type: "experience", label: "Experience", value: `${expMatch[1]} yrs` });
    const levelMatch = lower.match(/\b(entry[- ]level|junior|mid[- ]level|senior|staff|principal)\b/);
    if (levelMatch) chips.push({ type: "experience", label: "Level", value: levelMatch[1] });

    // Salary
    const salaryMatch = lower.match(/(\d{2,3})k\+?/);
    if (salaryMatch) chips.push({ type: "salary", label: "Salary", value: `$${salaryMatch[1]}k+` });

    // Skills (common keywords)
    const skillKeywords = ["react", "python", "kubernetes", "figma", "go", "typescript", "sql", "ml", "rust", "java"];
    for (const skill of skillKeywords) {
      if (lower.includes(skill)) {
        chips.push({ type: "skill", label: "Skill", value: skill.charAt(0).toUpperCase() + skill.slice(1) });
      }
    }

    // Location
    const cities = ["new york", "san francisco", "austin", "london", "berlin", "toronto", "seattle", "chicago"];
    for (const city of cities) {
      if (lower.includes(city)) {
        chips.push({ type: "location", label: "Location", value: city.replace(/\b\w/g, (c) => c.toUpperCase()) });
        break;
      }
    }

    return chips;
  }

  async function handleAnalyze() {
    if (!prompt.trim()) return;
    setLoading(true);
    setChips([]);
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 900));
    const parsed = parsePrompt(prompt);
    setChips(parsed);
    setLoading(false);
  }

  function removeChip(idx: number) {
    setChips((c) => c.filter((_, i) => i !== idx));
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (prompt) params.set("q", prompt);
    chips.forEach((c) => {
      if (c.type === "location") params.set("location", c.value);
      if (c.type === "workMode") params.set("mode", c.value.toLowerCase());
      if (c.type === "experience") params.set("experience", c.value);
      if (c.type === "salary") params.set("salary", c.value);
    });
    router.push(`/jobs?${params.toString()}`);
    onOpenChange(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleAnalyze();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl p-0 gap-0 overflow-hidden border-border"
        aria-describedby="ai-search-description"
      >
        {/* Header */}
        <div className="relative bg-gradient-hero p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-heading font-bold text-white">
                Ask AI to find a job
              </DialogTitle>
              <p id="ai-search-description" className="text-white/70 text-sm mt-0.5">
                Describe what you're looking for in plain language
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Prompt input */}
          <div className="relative">
            <textarea
              ref={inputRef}
              id="ai-prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Senior React engineer, fully remote, at least $150k, startup environment..."
              className={cn(
                "w-full min-h-[100px] rounded-xl border border-border bg-muted/40 px-4 py-3",
                "text-sm text-foreground placeholder:text-muted-foreground/60 resize-none",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                "transition-all duration-200"
              )}
            />
            <p className="absolute bottom-3 right-3 text-[10px] text-muted-foreground/50">
              ⌘↵ to analyze
            </p>
          </div>

          {/* Example prompts */}
          {chips.length === 0 && !loading && (
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-150"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-3 py-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Interpreting your search…</span>
            </div>
          )}

          {/* Chips */}
          {chips.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Extracted filters
              </p>
              <div className="flex flex-wrap gap-2">
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                      CHIP_COLORS[chip.type]
                    )}
                  >
                    <span className="text-[10px] opacity-60 uppercase">{chip.label}</span>
                    <span className="font-semibold">{chip.value}</span>
                    <button
                      onClick={() => removeChip(i)}
                      className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
                      aria-label={`Remove ${chip.value} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Feedback */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">Was this helpful?</span>
                <button
                  onClick={() => setFeedbackGiven("up")}
                  className={cn(
                    "p-1.5 rounded-lg transition-all duration-200",
                    feedbackGiven === "up"
                      ? "bg-emerald-500/15 text-emerald-500"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-label="Helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFeedbackGiven("down")}
                  className={cn(
                    "p-1.5 rounded-lg transition-all duration-200",
                    feedbackGiven === "down"
                      ? "bg-rose-500/15 text-rose-500"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-label="Not helpful"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/20">
          {chips.length === 0 ? (
            <Button
              id="ai-analyze-btn"
              onClick={handleAnalyze}
              disabled={!prompt.trim() || loading}
              className="ml-auto gap-2 bg-gradient-hero text-white font-semibold hover:opacity-90"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Analyze Prompt
            </Button>
          ) : (
            <>
              <Button
                id="ai-retry-btn"
                variant="outline"
                onClick={() => { setChips([]); setFeedbackGiven(null); }}
                size="sm"
              >
                Try again
              </Button>
              <Button
                id="ai-search-btn"
                onClick={handleSearch}
                className="gap-2 bg-gradient-hero text-white font-semibold hover:opacity-90"
              >
                Search Jobs
                <ArrowRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
