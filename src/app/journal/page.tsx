"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { JournalEntry } from "@/lib/types";

const trimesters = ["All", "Trimester 1", "Trimester 2", "Trimester 3"];
const moods = ["All", "😊", "🥰", "😴", "😋", "😰", "😢"];

function weekToTrimester(week: number): string {
  if (week <= 13) return "Trimester 1";
  if (week <= 26) return "Trimester 2";
  return "Trimester 3";
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrimester, setSelectedTrimester] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setEntries(data);
        setLoading(false);
      });
  }, []);

  const filteredEntries = entries.filter((entry) => {
    if (selectedTrimester !== "All" && weekToTrimester(entry.week) !== selectedTrimester) return false;
    if (selectedMood !== "All" && entry.mood !== selectedMood) return false;
    if (searchQuery && !entry.title.toLowerCase().includes(searchQuery.toLowerCase()) && !entry.body.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">My Journal</h1>
          <p className="mt-1 text-text-secondary">
            {loading ? "Loading..." : `${entries.length} entries so far`}
          </p>
        </div>
        <Link
          href="/journal/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
        >
          <span className="text-lg">+</span> New Entry
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {trimesters.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTrimester(t)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTrimester === t
                  ? "bg-primary-dark text-white"
                  : "bg-muted text-text-secondary hover:bg-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMood(m)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                selectedMood === m
                  ? "bg-primary/20 ring-2 ring-primary-dark"
                  : "bg-muted hover:bg-border"
              }`}
            >
              {m === "All" ? "✦" : m}
            </button>
          ))}
        </div>
      </div>

      {/* Entries */}
      <div className="mt-8">
        {loading ? (
          <div className="py-16 text-center text-text-secondary">Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl">📝</p>
            <p className="mt-4 font-semibold">No entries found</p>
            <p className="mt-1 text-sm text-text-secondary">Try adjusting your filters or create a new entry</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredEntries.map((entry) => (
              <article
                key={entry.id}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xl">{entry.mood}</span>
                      <h3 className="text-base font-semibold">{entry.title}</h3>
                      {entry.has_photo && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs">📸 Photo</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{entry.body}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-text-secondary">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-text-secondary">{formatDate(entry.created_at)}</p>
                    <p className="mt-1 text-xs font-medium text-primary-dark">Week {entry.week}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
