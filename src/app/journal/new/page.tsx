"use client";

import { useState } from "react";
import Link from "next/link";

const moodOptions = [
  { emoji: "🥰", label: "Loving" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😋", label: "Craving" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😢", label: "Emotional" },
  { emoji: "🤢", label: "Nauseous" },
];

const symptomOptions = [
  "Back pain", "Fatigue", "Nausea", "Cravings", "Heartburn",
  "Swelling", "Headache", "Insomnia", "Mood swings", "Round ligament pain",
  "Braxton Hicks", "Frequent urination",
];

export default function NewEntry() {
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/journal"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-muted"
        >
          ←
        </Link>
        <div>
          <h1 className="text-2xl font-bold">New Journal Entry</h1>
          <p className="text-sm text-text-secondary">Week 24 &middot; July 11, 2026</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Mood picker */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">How are you feeling?</h2>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {moodOptions.map((m) => (
              <button
                key={m.emoji}
                onClick={() => setMood(m.emoji)}
                className={`flex flex-col items-center gap-1 rounded-xl p-2.5 text-center transition-all ${
                  mood === m.emoji
                    ? "bg-primary/20 ring-2 ring-primary-dark scale-105"
                    : "bg-muted hover:bg-border"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] text-text-secondary">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <label htmlFor="title" className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Give your entry a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
          />
        </div>

        {/* Body */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <label htmlFor="body" className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            What&apos;s on your mind?
          </label>
          <textarea
            id="body"
            rows={8}
            placeholder="Write about your day, how you're feeling, what you're excited about..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-base leading-relaxed outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
          />
        </div>

        {/* Symptoms */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Symptoms today</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {symptomOptions.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  selectedSymptoms.includes(symptom)
                    ? "bg-primary-dark text-white"
                    : "bg-muted text-text-secondary hover:bg-border"
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Photo upload placeholder */}
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center transition-colors hover:border-primary/40">
          <div className="text-3xl">📸</div>
          <p className="mt-2 text-sm font-medium">Add a photo</p>
          <p className="mt-1 text-xs text-text-secondary">
            Bump photo, ultrasound, or any special moment
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/journal"
            className="rounded-lg border border-border px-6 py-2.5 text-center text-sm font-medium text-text-secondary transition-colors hover:bg-muted"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            className="rounded-full bg-primary-dark px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90"
          >
            {saved ? "✓ Saved!" : "Save Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}
