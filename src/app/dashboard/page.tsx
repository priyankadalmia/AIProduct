"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { JournalEntry, Milestone } from "@/lib/types";

const currentWeek = 24;
const dueDate = "March 15, 2027";
const daysLeft = 112;
const babySize = "An ear of corn";

const symptoms = [
  { name: "Back pain", level: 2 },
  { name: "Fatigue", level: 3 },
  { name: "Cravings", level: 2 },
  { name: "Nausea", level: 0 },
];

export default function Dashboard() {
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const [upcomingMilestones, setUpcomingMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const progress = (currentWeek / 40) * 100;

  useEffect(() => {
    Promise.all([
      supabase
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("milestones")
        .select("*")
        .eq("completed", false)
        .order("sort_order")
        .limit(3),
    ]).then(([entriesRes, milestonesRes]) => {
      if (entriesRes.data) setRecentEntries(entriesRes.data);
      if (milestonesRes.data) setUpcomingMilestones(milestonesRes.data);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Welcome back! 👋</h1>
          <p className="mt-1 text-text-secondary">Here&apos;s your pregnancy at a glance</p>
        </div>
        <Link
          href="/journal/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
        >
          <span className="text-lg">+</span> New Entry
        </Link>
      </div>

      {/* Week tracker card */}
      <div className="mb-8 rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-accent/15 to-secondary/10 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-text-secondary">You are in</p>
            <p className="mt-1 text-4xl font-bold text-primary-dark md:text-5xl">Week {currentWeek}</p>
            <p className="mt-2 text-sm text-text-secondary">
              Due date: {dueDate} &middot; {daysLeft} days to go
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl">🌽</div>
            <p className="mt-2 text-sm text-text-secondary">Baby is the size of</p>
            <p className="font-semibold">{babySize}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>Trimester 1</span>
            <span>Trimester 2</span>
            <span>Trimester 3</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-text-secondary">{Math.round(progress)}% complete</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent entries */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Journal Entries</h2>
            <Link href="/journal" className="text-sm font-medium text-primary-dark hover:underline">View all</Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {loading ? (
              <div className="py-8 text-center text-text-secondary">Loading...</div>
            ) : recentEntries.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-text-secondary">No entries yet. Start journaling!</p>
              </div>
            ) : (
              recentEntries.map((entry) => (
                <div key={entry.id} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{entry.mood}</span>
                        <h3 className="font-semibold">{entry.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary line-clamp-1">{entry.body}</p>
                    </div>
                    <span className="ml-4 shrink-0 text-xs text-text-secondary">{formatDate(entry.created_at)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">Today&apos;s Symptoms</h2>
            <div className="mt-4 flex flex-col gap-3">
              {symptoms.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-sm">{s.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div key={level} className={`h-2.5 w-6 rounded-full ${level <= s.level ? "bg-primary-dark" : "bg-border"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">Upcoming Milestones</h2>
            <div className="mt-4 flex flex-col gap-3">
              {loading ? (
                <div className="text-sm text-text-secondary">Loading...</div>
              ) : (
                upcomingMilestones.map((m) => (
                  <div key={m.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-foreground">
                      W{m.week}
                    </div>
                    <p className="text-sm">{m.title}</p>
                  </div>
                ))
              )}
            </div>
            <Link href="/milestones" className="mt-4 block text-sm font-medium text-primary-dark hover:underline">
              View all milestones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
