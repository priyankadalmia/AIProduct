"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Milestone } from "@/lib/types";

const emptyMilestone = {
  title: "",
  description: "",
  icon: "🎉",
  week: 1,
  completed: false,
  sort_order: 1,
};

export default function AdminMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Milestone | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyMilestone);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMilestones();
  }, []);

  async function fetchMilestones() {
    const { data } = await supabase
      .from("milestones")
      .select("*")
      .order("sort_order");
    if (data) setMilestones(data);
    setLoading(false);
  }

  function startEdit(m: Milestone) {
    setEditing(m);
    setCreating(false);
    setForm({
      title: m.title,
      description: m.description,
      icon: m.icon,
      week: m.week,
      completed: m.completed,
      sort_order: m.sort_order,
    });
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    const nextOrder = milestones.length > 0 ? Math.max(...milestones.map((m) => m.sort_order)) + 1 : 1;
    setForm({ ...emptyMilestone, sort_order: nextOrder });
  }

  function cancelForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyMilestone);
  }

  async function saveMilestone() {
    setSaving(true);
    if (editing) {
      await supabase.from("milestones").update(form).eq("id", editing.id);
    } else {
      await supabase.from("milestones").insert(form);
    }
    setSaving(false);
    cancelForm();
    fetchMilestones();
  }

  async function deleteMilestone(id: string) {
    await supabase.from("milestones").delete().eq("id", id);
    fetchMilestones();
  }

  async function toggleCompleted(m: Milestone) {
    await supabase.from("milestones").update({ completed: !m.completed }).eq("id", m.id);
    fetchMilestones();
  }

  if (loading) {
    return <div className="py-12 text-center text-text-secondary">Loading milestones...</div>;
  }

  const showForm = editing || creating;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Milestones</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {milestones.filter((m) => m.completed).length} completed, {milestones.filter((m) => !m.completed).length} upcoming
          </p>
        </div>
        {!showForm && (
          <button
            onClick={startCreate}
            className="rounded-full bg-primary-dark px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
          >
            + Add Milestone
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-card p-5">
          <h3 className="font-semibold">{editing ? "Edit Milestone" : "New Milestone"}</h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Icon (emoji)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">Week</label>
                <input
                  type="number"
                  min={1}
                  max={42}
                  value={form.week}
                  onChange={(e) => setForm({ ...form, week: parseInt(e.target.value) || 1 })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Sort Order</label>
                <input
                  type="number"
                  min={1}
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 1 })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.completed}
                    onChange={(e) => setForm({ ...form, completed: e.target.checked })}
                    className="h-4 w-4 rounded border-border"
                  />
                  Completed
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveMilestone}
                disabled={saving || !form.title || !form.description}
                className="rounded-full bg-primary-dark px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90 disabled:opacity-50"
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
              <button
                onClick={cancelForm}
                className="rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={`flex items-center gap-4 rounded-xl border border-border bg-card p-4 ${
              !m.completed ? "opacity-60" : ""
            }`}
          >
            <button
              onClick={() => toggleCompleted(m)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-lg transition-colors ${
                m.completed ? "border-primary bg-primary/20" : "border-border bg-card"
              }`}
              title={m.completed ? "Mark as incomplete" : "Mark as completed"}
            >
              {m.icon}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{m.title}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-text-secondary">
                  Week {m.week}
                </span>
                {m.completed && <span className="text-xs text-primary-dark">✓</span>}
              </div>
              <p className="mt-0.5 text-sm text-text-secondary truncate">{m.description}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => startEdit(m)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-muted"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMilestone(m.id)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
