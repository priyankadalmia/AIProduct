"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { JournalEntry } from "@/lib/types";

const moodOptions = ["🥰", "😊", "😌", "😋", "😴", "😰", "😢", "🤢"];

const emptyEntry: Omit<JournalEntry, "id" | "created_at" | "updated_at"> = {
  title: "",
  body: "",
  mood: "😊",
  week: 24,
  symptoms: [],
  tags: [],
  has_photo: false,
};

export default function AdminJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyEntry);
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setEntries(data);
    setLoading(false);
  }

  function startEdit(entry: JournalEntry) {
    setEditing(entry);
    setCreating(false);
    setForm({
      title: entry.title,
      body: entry.body,
      mood: entry.mood,
      week: entry.week,
      symptoms: entry.symptoms,
      tags: entry.tags,
      has_photo: entry.has_photo,
    });
    setTagsInput(entry.tags.join(", "));
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyEntry);
    setTagsInput("");
  }

  function cancelForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyEntry);
    setTagsInput("");
  }

  async function saveEntry() {
    setSaving(true);
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = { ...form, tags };

    if (editing) {
      await supabase
        .from("journal_entries")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", editing.id);
    } else {
      await supabase.from("journal_entries").insert(payload);
    }
    setSaving(false);
    cancelForm();
    fetchEntries();
  }

  async function deleteEntry(id: string) {
    await supabase.from("journal_entries").delete().eq("id", id);
    fetchEntries();
  }

  if (loading) {
    return <div className="py-12 text-center text-text-secondary">Loading entries...</div>;
  }

  const showForm = editing || creating;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Journal Entries</h2>
          <p className="mt-1 text-sm text-text-secondary">{entries.length} entries</p>
        </div>
        {!showForm && (
          <button
            onClick={startCreate}
            className="rounded-full bg-primary-dark px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
          >
            + Add Entry
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-card p-5">
          <h3 className="font-semibold">{editing ? "Edit Entry" : "New Entry"}</h3>
          <div className="mt-4 flex flex-col gap-4">
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
              <label className="block text-sm font-medium">Body</label>
              <textarea
                rows={4}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Mood</label>
                <div className="mt-1 flex gap-1.5">
                  {moodOptions.map((m) => (
                    <button
                      key={m}
                      onClick={() => setForm({ ...form, mood: m })}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-colors ${
                        form.mood === m ? "bg-primary/20 ring-2 ring-primary-dark" : "bg-muted hover:bg-border"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
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
            </div>
            <div>
              <label className="block text-sm font-medium">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="kicks, work, gratitude"
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="has_photo"
                checked={form.has_photo}
                onChange={(e) => setForm({ ...form, has_photo: e.target.checked })}
                className="h-4 w-4 rounded border-border"
              />
              <label htmlFor="has_photo" className="text-sm">Has photo</label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveEntry}
                disabled={saving || !form.title || !form.body}
                className="rounded-full bg-primary-dark px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90 disabled:opacity-50"
              >
                {saving ? "Saving..." : editing ? "Update Entry" : "Create Entry"}
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

      <div className="mt-6 flex flex-col gap-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{entry.mood}</span>
                  <span className="font-semibold">{entry.title}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-text-secondary">
                    Week {entry.week}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary line-clamp-2">{entry.body}</p>
                {entry.tags.length > 0 && (
                  <div className="mt-2 flex gap-1.5">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-text-secondary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(entry)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-muted"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
