"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Milestone } from "@/lib/types";

const currentWeek = 24;

export default function Milestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("milestones")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setMilestones(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="py-16 text-center text-text-secondary">Loading milestones...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Milestones</h1>
        <p className="mt-1 text-text-secondary">Your pregnancy journey, one milestone at a time</p>
      </div>

      {/* Progress summary */}
      <div className="mb-8 flex gap-4 overflow-x-auto">
        {[
          { label: "Completed", value: milestones.filter((m) => m.completed).length, color: "bg-primary-dark text-white" },
          { label: "Upcoming", value: milestones.filter((m) => !m.completed).length, color: "bg-accent text-foreground" },
          { label: "Current Week", value: `W${currentWeek}`, color: "bg-secondary text-foreground" },
        ].map((stat) => (
          <div key={stat.label} className={`flex-1 rounded-xl ${stat.color} p-4 text-center`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border md:left-6" />
        <div className="flex flex-col gap-1">
          {milestones.map((milestone) => {
            const isCurrent = milestone.week === currentWeek;
            return (
              <div key={milestone.id} className="relative flex gap-4 pl-0 md:gap-5">
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg md:h-12 md:w-12 ${
                      isCurrent
                        ? "border-primary-dark bg-primary-dark text-white shadow-lg shadow-primary/30"
                        : milestone.completed
                        ? "border-primary bg-primary/20"
                        : "border-border bg-card"
                    }`}
                  >
                    {milestone.icon}
                  </div>
                </div>
                <div
                  className={`mb-4 flex-1 rounded-xl border p-4 transition-all ${
                    isCurrent
                      ? "border-primary-dark bg-primary/5 shadow-md"
                      : milestone.completed
                      ? "border-border bg-card"
                      : "border-border bg-card opacity-70"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-text-secondary">
                      Week {milestone.week}
                    </span>
                    {isCurrent && (
                      <span className="rounded-full bg-primary-dark px-2 py-0.5 text-xs font-semibold text-white">This week</span>
                    )}
                    {milestone.completed && !isCurrent && <span className="text-xs text-primary-dark">✓</span>}
                  </div>
                  <h3 className="mt-1.5 font-semibold">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{milestone.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
